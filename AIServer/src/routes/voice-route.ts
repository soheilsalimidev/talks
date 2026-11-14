import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import OpenAI from "openai";
import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { AudioBufferManager } from "../services/voice-recoder.js";
import { logger as log } from "../logger.js";

const client = new OpenAI({
  apiKey: process.env.AVALAI_API_KEY,
  baseURL: "https://api.avalai.ir/v1",
});

const CHAT_MODEL = "deepseek-v4.1-flash";
const USE_STT = (process.env.USE_STT ?? "false").toLowerCase() === "true";

const TTS_MODEL = "gemini-3.8-flash-lite-tts";
const TTS_VOICE = process.env.TTS_VOICE ?? "Puck";
const TTS_STYLE =
  process.env.TTS_STYLE ??
  "Speak with a high-pitched, enthusiastic, and slightly timid synthetic voice.";
const TTS_URL = `https://api.avalai.ir/v1beta/models/${TTS_MODEL}:generateContent`;

// NEW: scribe_v2 for word-level timestamps on the TTS output
const STT_MODEL = "scribe_v2";
const STT_URL = "https://api.avalai.ir/v1/audio/transcriptions";

// ---------- Audio cache ----------
const CACHE_DIR =
  process.env.AUDIO_CACHE_DIR ?? path.join(process.cwd(), ".audio-cachee");

const KNOWN_EXTS = ["wav", "mp3", "ogg", "bin"] as const;
type Ext = (typeof KNOWN_EXTS)[number];

type Audio = { buf: Buffer; mime: string };

export interface WordTimestamp {
  word: string;
  start: number;
  end: number;
}

function hashPrompt(prompt: string, transcript?: string): string {
  const h = createHash("sha256");
  h.update(prompt);
  if (transcript) {
    h.update("\0");
    h.update(transcript);
  }
  return h.digest("hex").slice(0, 32);
}

function extForMime(mime: string): Ext {
  const m = mime.toLowerCase();
  if (m.includes("wav")) return "wav";
  if (m.includes("mpeg") || m.includes("mp3")) return "mp3";
  if (m.includes("ogg")) return "ogg";
  return "bin";
}

function findCached(
  hash: string
): { audioPath: string; mimePath: string; ext: Ext } | null {
  for (const ext of KNOWN_EXTS) {
    const audioPath = path.join(CACHE_DIR, `${hash}.${ext}`);
    if (fs.existsSync(audioPath)) {
      return { audioPath, mimePath: path.join(CACHE_DIR, `${hash}.mime`), ext };
    }
  }
  return null;
}

function readCached(hash: string): Audio | null {
  const f = findCached(hash);
  if (!f) return null;
  try {
    const buf = fs.readFileSync(f.audioPath);
    if (buf.length === 0) return null;
    const mime = fs.existsSync(f.mimePath)
      ? fs.readFileSync(f.mimePath, "utf8").trim()
      : "audio/wav";
    return { buf, mime: mime || "audio/wav" };
  } catch {
    return null;
  }
}

function writeCache(hash: string, buf: Buffer, mime: string): string | null {
  const existing = findCached(hash);
  if (existing) return existing.audioPath;
  try {
    const ext = extForMime(mime);
    const audioPath = path.join(CACHE_DIR, `${hash}.${ext}`);
    const mimePath = path.join(CACHE_DIR, `${hash}.mime`);
    const tmp = `${audioPath}.tmp-${process.pid}-${Date.now()}`;
    fs.writeFileSync(tmp, buf);
    fs.renameSync(tmp, audioPath);
    fs.writeFileSync(mimePath, mime);
    return audioPath;
  } catch {
    return null;
  }
}

// ---------- Word-timestamp sidecar cache ----------
function wordsPath(hash: string): string {
  return path.join(CACHE_DIR, `${hash}.words.json`);
}

function readCachedWords(hash: string): WordTimestamp[] | null {
  try {
    const p = wordsPath(hash);
    if (!fs.existsSync(p)) return null;
    const data = JSON.parse(fs.readFileSync(p, "utf8"));
    return Array.isArray(data) ? data : null;
  } catch {
    return null;
  }
}

function writeCachedWords(hash: string, words: WordTimestamp[]): void {
  try {
    fs.writeFileSync(wordsPath(hash), JSON.stringify(words));
  } catch {
    /* ignore */
  }
}

function loadLastFromDisk(): { audio: Audio; hash: string } | null {
  if (!fs.existsSync(CACHE_DIR)) return null;
  const files = fs
    .readdirSync(CACHE_DIR)
    .filter((f) =>
      (KNOWN_EXTS as readonly string[]).includes(path.extname(f).slice(1))
    );
  if (files.length === 0) return null;

  let best = files[0];
  let bestTime = 0;
  for (const f of files) {
    try {
      const t = fs.statSync(path.join(CACHE_DIR, f)).mtimeMs;
      if (t > bestTime) {
        bestTime = t;
        best = f;
      }
    } catch {
      /* skip */
    }
  }
  const hash = best.replace(/\.[^.]+$/, "");
  const audio = readCached(hash);
  if (!audio) return null;
  return { audio, hash };
}

function tag(id: string, stage: string) {
  return `[voice][${id}][${stage}]`;
}

// ---------- scribe_v2 ----------
async function transcribeWithTimestamps(
  buf: Buffer,
  mime: string,
  logCtx: { error: (o: object, m: string) => void },
  id: string
): Promise<WordTimestamp[]> {
  try {
    const ext = extForMime(mime);
    const form = new FormData();
    form.append("file", new Blob([buf], { type: mime }), `audio.${ext}`);
    form.append("model", STT_MODEL);
    form.append("response_format", "json");

    const res = await fetch(STT_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.AVALAI_API_KEY}` },
      body: form,
    });

    if (!res.ok) {
      const errText = await res.text();
      logCtx.error(
        { status: res.status, errText },
        tag(id, "stt-ts") + " transcription non-OK"
      );
      return [];
    }

    const data: any = await res.json();
    const words = Array.isArray(data.words) ? data.words : [];
    return words
      .filter(
        (w: any) =>
          typeof w.word === "string" &&
          Number.isFinite(w.start) &&
          Number.isFinite(w.end)
      )
      .map((w: any) => ({
        word: w.word as string,
        start: w.start as number,
        end: w.end as number,
      }));
  } catch (err) {
    logCtx.error({ err }, tag(id, "stt-ts") + " transcription threw");
    return [];
  }
}

// ---------- messages ----------
function buildMessages(
  userPrompt: string,
  userText?: string
): OpenAI.Chat.Completions.ChatCompletionMessageParam[] {
  if (userText) {
    return [
      { role: "system", content: userPrompt },
      {
        role: "user",
        content: `The presenter said these for the last few slides: ${userText}`,
      },
    ];
  }
  return [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: userPrompt },
  ];
}

// ---------- Routes ----------
export async function voiceRoutes(app: FastifyInstance) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });

  const loaded = loadLastFromDisk();
  let lastAudio: Audio | null = loaded?.audio ?? null;
  let lastWords: WordTimestamp[] = loaded
    ? readCachedWords(loaded.hash) ?? []
    : [];

  if (lastAudio) {
    app.log.info(
      {
        bytes: lastAudio.buf.length,
        mime: lastAudio.mime,
        words: lastWords.length,
      },
      "[voice][boot] seeded last-audio fallback from disk"
    );
  } else {
    app.log.info("[voice][boot] no fallback audio available yet");
  }

  // Fallback: last audio we successfully returned (+ its word track).
  async function sendFallback(
    req: FastifyRequest,
    reply: FastifyReply,
    reason: string
  ) {
    const rlog = req.log;
    const id = req.id;
    const audio = lastAudio;

    if (!audio) {
      rlog.error(
        { reason },
        tag(id, "fallback") + " no fallback audio available"
      );
      return reply.status(502).send({
        error: "Request failed and no fallback audio available.",
        reason,
      });
    }

    rlog.warn(
      { reason, bytes: audio.buf.length, mime: audio.mime, words: lastWords.length },
      tag(id, "fallback") + " serving last audio"
    );

    return reply
      .header("Cache-Control", "no-store")
      .header("X-Audio-Source", "fallback")
      .header("X-Audio-Fallback", "true")
      .header("X-Fallback-Reason", encodeURIComponent(reason))
      .send({
        audio: audio.buf.toString("base64"),
        mime: audio.mime,
        words: lastWords,
        reply: "",
        heard: "",
        fallback: true,
        reason,
      });
  }

  async function sendAudio(
    req: FastifyRequest,
    reply: FastifyReply,
    audio: Audio,
    words: WordTimestamp[],
    headers: Record<string, string>,
    source: "cache" | "generated",
    meta: { reply?: string; heard?: string }
  ) {
    lastAudio = audio;
    lastWords = words;
    req.log.info(
      { source, mime: audio.mime, bytes: audio.buf.length, words: words.length },
      tag(req.id, "done") + " sending audio"
    );
    reply
      .header("Cache-Control", "no-store")
      .header("X-Audio-Source", source);
    for (const [k, v] of Object.entries(headers)) reply.header(k, v);
    return reply.send({
      audio: audio.buf.toString("base64"),
      mime: audio.mime,
      words,
      reply: meta.reply ?? "",
      heard: meta.heard ?? "",
      fallback: false,
    });
  }

  const buffer = new AudioBufferManager();
  buffer.start();
  app.log.info(
    { recorder: buffer.peek() },
    "[voice][boot] AudioBufferManager started"
  );
  app.addHook("onClose", async () => {
    app.log.info("[voice][shutdown] stopping AudioBufferManager");
    await buffer.stop();
  });

  app.get("/api/voice/status", async (req) => {
    req.log.info("[voice][status] status requested");
    return {
      ...buffer.peek(),
      cache: {
        dir: CACHE_DIR,
        hasFallback: lastAudio !== null,
        fallbackBytes: lastAudio?.buf.length ?? 0,
        fallbackMime: lastAudio?.mime ?? null,
        fallbackWords: lastWords.length,
      },
    };
  });

  app.post<{ Body: { keepRecording?: boolean } }>(
    "/api/voice/reset",
    {
      schema: {
        body: {
          type: "object",
          properties: {
            keepRecording: { type: "boolean", default: false },
          },
        },
      },
    },
    async (req) => {
      const id = req.id;
      const keepRecording = req.body?.keepRecording ?? false;
      req.log.info(
        { keepRecording },
        tag(id, "reset") + " resetting audio buffer"
      );
      await buffer.reset({ keepRecording });
      const status = buffer.peek();
      req.log.info({ status }, tag(id, "reset") + " reset complete");
      return { ok: true, keepRecording, status };
    }
  );

  app.post<{ Body: { prompt?: string } }>(
    "/api/voice",
    {
      schema: {
        body: {
          type: "object",
          properties: { prompt: { type: "string" } },
        },
      },
    },
    async (req, reply) => {
      const id = req.id;
      const t0 = Date.now();

      const userPrompt =
        req.body?.prompt ?? "Respond to what the user just said.";

      log.info(
        { prompt: userPrompt, promptLen: userPrompt.length, useStt: USE_STT },
        tag(id, "start") + " /api/voice request received"
      );

      // --- STT (optional) --------------------------------------------
      let userText: string | undefined;
      if (USE_STT) {
        log.info(tag(id, "stt") + " draining buffered transcript…");
        try {
          userText = await buffer.drainTranscript();
        } catch (err) {
          log.error({ err }, tag(id, "stt") + " drainTranscript threw");
          return sendFallback(req, reply, "stt-error");
        }
        log.info(
          { userText, chars: userText.length },
          tag(id, "stt") + " transcript drained"
        );
        if (!userText) {
          log.warn(tag(id, "stt") + " empty transcript");
          return sendFallback(req, reply, "no-transcript");
        }
      }

      // --- Cache lookup ----------------------------------------------
      const hash = hashPrompt(userPrompt, userText);
      log.info({ hash }, tag(id, "cache") + " prompt hash computed");

      const cached = readCached(hash);
      if (cached) {
        let words = readCachedWords(hash);
        if (!words) {
          // Older cache entries may not have a word track yet — fill it in.
          log.info(
            tag(id, "stt-ts") +
            " cache hit but no words — transcribing for timestamps"
          );
          words = await transcribeWithTimestamps(cached.buf, cached.mime, log, id);
          if (words.length > 0) writeCachedWords(hash, words);
        }
        log.info(
          { hash, bytes: cached.buf.length, words: words.length },
          tag(id, "cache") + " hit — returning cached audio"
        );
        return sendAudio(
          req,
          reply,
          cached,
          words,
          { "X-Audio-Hash": hash },
          "cache",
          { reply: "", heard: userText ?? "" }
        );
      }
      log.info({ hash }, tag(id, "cache") + " miss — generating");

      // --- LLM -------------------------------------------------------
      const messages = buildMessages(userPrompt, userText);
      log.info(
        {
          model: CHAT_MODEL,
          messageCount: messages.length,
          roles: messages.map((m) => m.role),
        },
        tag(id, "llm") + " calling chat completions…"
      );

      const llmStart = Date.now();
      let completion: OpenAI.Chat.Completions.ChatCompletion;
      try {
        completion = await client.chat.completions.create({
          model: CHAT_MODEL,
          messages: messages,
          max_tokens: 5000,
          temperature: 0.7,
          extra_body: {
            "reasoning_effort": "low"
          }
        })
      } catch (err) {
        log.error(
          { err, elapsedMs: Date.now() - llmStart },
          tag(id, "llm") + " LLM request failed"
        );
        return sendFallback(req, reply, "llm-error");
      }

      const elapsed = Date.now() - llmStart;
      const choice = completion.choices[0];
      const rawContent = choice?.message?.content ?? "";
      const reasoning =
        (choice?.message as { reasoning_content?: string } | undefined)
          ?.reasoning_content ?? "";

      log.info(
        {
          elapsedMs: elapsed,
          finishReason: choice?.finish_reason,
          contentChars: rawContent.length,
          reasoningChars: reasoning.length,
        },
        tag(id, "llm") + " LLM responded"
      );

      let textToSpeak = rawContent.trim();
      if (!textToSpeak && reasoning.trim()) {
        log.warn(
          tag(id, "llm") +
          " content empty — using reasoning_content as the reply"
        );
        textToSpeak = reasoning.trim();
      }

      if (!textToSpeak) {
        log.error(
          {
            finishReason: choice?.finish_reason,
            refusal: (choice?.message as { refusal?: string })?.refusal,
            usage: completion.usage,
            completion,
          },
          tag(id, "llm") + " empty LLM response — see completion dump"
        );
        return sendFallback(req, reply, "llm-empty");
      }

      log.info(
        { replyText: textToSpeak, chars: textToSpeak.length },
        tag(id, "llm") + " reply ready"
      );

      // --- TTS -------------------------------------------------------
      const body = {
        contents: [
          {
            role: "user",
            parts: [
              {
                text: textToSpeak,
                speechMetadata: { speaker: "Sponge", style: TTS_STYLE },
              },
            ],
          },
        ],
        generationConfig: {
          responseModalities: ["AUDIO"],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: TTS_VOICE },
            },
          },
        },
      };

      log.info(
        { model: TTS_MODEL, voice: TTS_VOICE },
        tag(id, "tts") + " calling Gemini TTS…"
      );
      const ttsStart = Date.now();
      let ttsRes: Response;
      try {
        ttsRes = await fetch(TTS_URL, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.AVALAI_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
      } catch (err) {
        log.error(
          { err, elapsedMs: Date.now() - ttsStart },
          tag(id, "tts") + " TTS fetch threw"
        );
        return sendFallback(req, reply, "tts-network");
      }
      log.info(
        { status: ttsRes.status, elapsedMs: Date.now() - ttsStart },
        tag(id, "tts") + " TTS responded"
      );

      if (!ttsRes.ok) {
        const errText = await ttsRes.text();
        log.error(
          { status: ttsRes.status, errText },
          tag(id, "tts") + " TTS non-OK response"
        );
        return sendFallback(req, reply, `tts-http-${ttsRes.status}`);
      }

      const data: any = await ttsRes.json();
      const parts = data.candidates?.[0]?.content?.parts ?? [];
      const audioPart = parts.find((p: any) => p.inlineData)?.inlineData;
      if (!audioPart) {
        log.error(
          { data },
          tag(id, "tts") + " no audio part in TTS response"
        );
        return sendFallback(req, reply, "tts-no-audio");
      }

      const mime = (audioPart.mimeType ?? "audio/wav")
        .split(";")[0]
        .trim()
        .toLowerCase();
      const audioBuf = Buffer.from(audioPart.data, "base64");
      log.info(
        { mime, bytes: audioBuf.length },
        tag(id, "tts") + " audio decoded"
      );

      // --- Persist audio (never overwrite existing) ------------------
      const writtenPath = writeCache(hash, audioBuf, mime);
      if (writtenPath) {
        log.info(
          { hash, path: writtenPath, bytes: audioBuf.length, mime },
          tag(id, "cache") + " wrote audio to cache"
        );
      } else {
        log.error(
          { hash },
          tag(id, "cache") + " failed to write cache (continuing anyway)"
        );
      }

      // --- NEW: scribe_v2 timestamps --------------------------------
      log.info(
        { model: STT_MODEL, bytes: audioBuf.length, mime },
        tag(id, "stt-ts") + " transcribing TTS output for word timestamps…"
      );
      const tstStart = Date.now();
      const words = await transcribeWithTimestamps(audioBuf, mime, log, id);
      log.info(
        { count: words.length, elapsedMs: Date.now() - tstStart },
        tag(id, "stt-ts") + " transcription complete"
      );
      if (words.length > 0) writeCachedWords(hash, words);

      log.info(
        { totalMs: Date.now() - t0 },
        tag(id, "done") + " /api/voice completed"
      );

      return sendAudio(
        req,
        reply,
        { buf: audioBuf, mime },
        words,
        {
          "X-Audio-Hash": hash,
          "X-User-Transcript": userText ? encodeURIComponent(userText) : "",
          "X-Assistant-Reply": encodeURIComponent(textToSpeak),
        },
        "generated",
        { reply: textToSpeak, heard: userText ?? "" }
      );
    }
  );
}
