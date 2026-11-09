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

function detectRecorder(): RecorderKind {
  const platform = os.platform();

  if (platform === "linux") {
    if (which("arecord")) return "arecord";
    if (which("sox")) return "sox";
    if (which("rec")) return "rec";
    throw new Error(
      "No audio recorder found on Linux. Install `alsa-utils` (arecord) or `sox`."
    );
  }

  if (platform === "win32") {
    if (which("sox")) return "sox";
    throw new Error(
      "`sox` is required on Windows for audio capture. " +
      "Install from https://sox.sourceforge.net/ and add to PATH."
    );
  }

  if (platform === "darwin") {
    if (which("sox")) return "sox";
    if (which("rec")) return "rec";
    throw new Error("Install `sox` via `brew install sox` on macOS.");
  }

  if (which("sox")) return "sox";
  throw new Error(`Unsupported platform for audio capture: ${platform}`);
}

// ---------- WAV header helper ----------
/**
 * Builds a 44-byte canonical PCM WAV header for signed 16-bit little-endian
 * mono audio at SAMPLE_RATE.
 */
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
  private recorderKind: RecorderKind;

  constructor() {
    this.recorderKind = detectRecorder();
  }

  start() {
    console.log(
      `[audio] starting ${this.recorderKind} on ${os.platform()} (${os.arch()})`
    );

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

    // Background: transcribe every N seconds → buffer TEXT
    this.timer = setInterval(() => void this.flushToText(), TRANSCRIBE_INTERVAL_MS);
  }

  async stop() {
    this.stopping = true;
    if (this.timer) clearInterval(this.timer);
    this.recorderHandle?.stop();
  }

  private resetting = false;

  private async flushToText(): Promise<void> {
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
   */
  async drainTranscript(): Promise<string> {
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
    //    We set a flag so `flushToText` doesn't re-append after we clear.
    this.resetting = true;
    while (this.transcribing) {
      await new Promise((r) => setTimeout(r, 40));
    }

    // 3. Drop raw audio chunks not yet sent to STT
    this.audioChunks = [];

    this.resetting = false;
    if (!keepRecording) {
      // 4. Restart the recorder to guarantee the OS capture buffer is empty.
      if (this.timer) clearInterval(this.timer);
      this.recorderHandle?.stop();
      this.recorderHandle = null;
      this.audioChunks = [];
      this.start();
    }
  }

  /** Debug / status helper */
  peek(): { chars: number; chunks: number; recorder: RecorderKind } {
    return {
      chars: this.transcriptParts.join(" ").length,
      chunks: this.audioChunks.length,
      recorder: this.recorderKind,
    };
  }
}
