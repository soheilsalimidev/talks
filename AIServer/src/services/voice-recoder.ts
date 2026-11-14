import os from "node:os";
import { execFileSync } from "node:child_process";
import recorder from "node-record-lpcm16";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.AVALAI_API_KEY,
  baseURL: "https://api.avalai.ir/v1",
});

const TRANSCRIPTION_MODEL = "scribe_v2";
const TRANSCRIBE_INTERVAL_MS = 15_000; // flush a transcript chunk every 15 s

// PCM format assumptions. Keep these in sync with the recorder config.
const SAMPLE_RATE = 16_000;
const CHANNELS = 1;
const BITS_PER_SAMPLE = 16;
const BYTES_PER_SAMPLE = BITS_PER_SAMPLE / 8;
const BLOCK_ALIGN = CHANNELS * BYTES_PER_SAMPLE;
const BYTE_RATE = SAMPLE_RATE * BLOCK_ALIGN;

// ---------- Cross-platform recorder detection ----------
type RecorderKind = "sox" | "arecord" | "rec";

function which(cmd: string): boolean {
  try {
    const lookup = os.platform() === "win32" ? "where" : "which";
    execFileSync(lookup, [cmd], { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

/**
 * Returns the best available recorder for this platform,
 * or `null` if none is available / the platform is unsupported.
 */
function detectRecorder(): RecorderKind | null {
  const platform = os.platform();

  if (platform === "linux") {
    if (which("arecord")) return "arecord";
    if (which("sox")) return "sox";
    if (which("rec")) return "rec";
    console.warn(
      "[audio] No recorder found on Linux. Install `alsa-utils` (arecord) or `sox`. Voice capture disabled."
    );
    return null;
  }

  if (platform === "win32") {
    if (which("sox")) return "sox";
    console.warn(
      "[audio] `sox` not found on Windows. Install from https://sox.sourceforge.net/ and add to PATH. Voice capture disabled."
    );
    return null;
  }

  if (platform === "darwin") {
    if (which("sox")) return "sox";
    if (which("rec")) return "rec";
    console.warn(
      "[audio] Install `sox` via `brew install sox` on macOS. Voice capture disabled."
    );
    return null;
  }

  if (which("sox")) return "sox";

  console.warn(
    `[audio] Unsupported platform for audio capture (${platform}). Voice capture disabled.`
  );
  return null;
}

// ---------- WAV header helper ----------
function createWavHeader(dataLength: number): Buffer {
  const header = Buffer.alloc(44);

  header.write("RIFF", 0, "ascii");
  header.writeUInt32LE(36 + dataLength, 4); // RIFF chunk size
  header.write("WAVE", 8, "ascii");

  header.write("fmt ", 12, "ascii");
  header.writeUInt32LE(16, 16); // fmt chunk size
  header.writeUInt16LE(1, 20); // PCM format
  header.writeUInt16LE(CHANNELS, 22);
  header.writeUInt32LE(SAMPLE_RATE, 24);
  header.writeUInt32LE(BYTE_RATE, 28);
  header.writeUInt16LE(BLOCK_ALIGN, 32);
  header.writeUInt16LE(BITS_PER_SAMPLE, 34);

  header.write("data", 36, "ascii");
  header.writeUInt32LE(dataLength, 40);

  return header;
}

// ---------- Buffer manager ----------
export class AudioBufferManager {
  private audioChunks: Buffer[] = [];
  private transcriptParts: string[] = [];
  private recorderHandle: recorder.Recording | null = null;
  private timer: NodeJS.Timeout | null = null;
  private transcribing = false;
  private stopping = false;
  private recorderKind: RecorderKind | null;
  private disabled = false;

  constructor() {
    this.recorderKind = detectRecorder();
    if (!this.recorderKind) this.disabled = true;
  }

  /** True when no recorder could be found; all methods become no-ops. */
  isDisabled(): boolean {
    return this.disabled;
  }

  start() {
    if (this.disabled || !this.recorderKind) {
      console.warn(
        "[audio] AudioBufferManager.start() called while disabled — skipping."
      );
      return;
    }

    console.log(
      `[audio] starting ${this.recorderKind} on ${os.platform()} (${os.arch()})`
    );

    try {
      this.recorderHandle = recorder.record({
        sampleRate: SAMPLE_RATE,
        channels: CHANNELS,
        audioType: "raw", // capture raw PCM; we add the WAV header ourselves
        recorder: this.recorderKind,
      });

      this.recorderHandle.stream().on("data", (chunk: Buffer) => {
        this.audioChunks.push(chunk);
      });
      this.recorderHandle.stream().on("error", (err: Error) => {
        console.error("[audio] recorder error:", err);
      });
    } catch (err) {
      // e.g. the binary is present but the process fails to spawn
      console.error("[audio] failed to start recorder, disabling:", err);
      this.disabled = true;
      this.recorderHandle = null;
      return;
    }

    // Background: transcribe every N seconds → buffer TEXT
    this.timer = setInterval(() => void this.flushToText(), TRANSCRIBE_INTERVAL_MS);
  }

  async stop() {
    this.stopping = true;
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    try {
      this.recorderHandle?.stop();
    } catch (err) {
      console.error("[audio] recorder stop failed:", err);
    }
    this.recorderHandle = null;
  }

  private resetting = false;

  private async flushToText(): Promise<void> {
    if (this.disabled) return;
    if (this.transcribing || this.stopping || this.resetting) return;
    if (this.audioChunks.length === 0) return;
    this.transcribing = true;

    const chunks = this.audioChunks;
    this.audioChunks = [];

    try {
      const rawPcm = Buffer.concat(chunks);
      if (rawPcm.length === 0) return;

      // Wrap the raw PCM in a valid WAV container for this exact chunk.
      const wavBuffer = Buffer.concat([
        createWavHeader(rawPcm.length),
        rawPcm,
      ]);

      const file = new File(
        [new Blob([wavBuffer], { type: "audio/wav" })],
        "chunk.wav",
        { type: "audio/wav" }
      );

      const t = await client.audio.transcriptions.create({
        file,
        model: TRANSCRIPTION_MODEL,
      });
      const text = t.text.trim();
      if (text && !this.resetting) this.transcriptParts.push(text);
    } catch (e) {
      console.error("[audio] transcription failed:", e);
    } finally {
      this.transcribing = false;
    }
  }

  /**
   * Called from the route: drains everything captured up to now,
   * returns the accumulated text, and resets the text buffer.
   * Returns "" when the recorder is disabled.
   */
  async drainTranscript(): Promise<string> {
    if (this.disabled) return "";

    const buffered = this.transcriptParts.join(" ").trim();

    if (buffered) {
      this.transcriptParts = [];
      return buffered;
    }

    // Slow path: nothing buffered yet. Wait for any in-flight transcription
    // to settle, then flush whatever audio has accumulated so far so the
    // request doesn't return empty on a fresh start.
    while (this.transcribing) {
      await new Promise((r) => setTimeout(r, 40));
    }
    await this.flushToText();

    const text = this.transcriptParts.join(" ").trim();
    this.transcriptParts = [];
    return text;
  }

  /** Reset the buffer. By default also stops + restarts the recorder so any
   *  in-flight audio (which is not yet transcribed) is discarded too. */
  async reset(opts: { keepRecording?: boolean } = {}): Promise<void> {
    const { keepRecording = false } = opts;

    // 1. Drop in-flight transcribed text
    this.transcriptParts = [];

    // 2. Wait for any transcription currently in flight, then discard its result.
    this.resetting = true;
    while (this.transcribing) {
      await new Promise((r) => setTimeout(r, 40));
    }

    // 3. Drop raw audio chunks not yet sent to STT
    this.audioChunks = [];

    this.resetting = false;

    if (this.disabled) return;

    if (!keepRecording) {
      // 4. Restart the recorder to guarantee the OS capture buffer is empty.
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
      try {
        this.recorderHandle?.stop();
      } catch (err) {
        console.error("[audio] recorder stop failed during reset:", err);
      }
      this.recorderHandle = null;
      this.audioChunks = [];
      this.start();
    }
  }

  /** Debug / status helper */
  peek(): {
    chars: number;
    chunks: number;
    recorder: RecorderKind | null;
    disabled: boolean;
  } {
    return {
      chars: this.transcriptParts.join(" ").length,
      chunks: this.audioChunks.length,
      recorder: this.recorderKind,
      disabled: this.disabled,
    };
  }
}
