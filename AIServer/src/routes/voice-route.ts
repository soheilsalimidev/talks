import { Readable } from "node:stream";
import OpenAI from "openai";
import type { FastifyInstance } from "fastify";
import { AudioBufferManager } from "../services/voice-recoder.js";


const client = new OpenAI({
  apiKey: process.env.AVALAI_API_KEY,
  baseURL: "https://api.avalai.ir/v1",
});

const CHAT_MODEL = "deepseek-v4.1-flash";
const TTS_MODEL = "eleven_v4_turbo";
const TTS_VOICE = process.env.TTS_VOICE ?? "alloy";

export async function voiceRoutes(app: FastifyInstance) {



  // One background recorder per server instance
  const buffer = new AudioBufferManager();
  buffer.start();
  app.addHook("onClose", async () => {
    await buffer.stop();
  });

  // Simple status endpoint for debugging
  app.get("/api/voice/status", async () => buffer.peek());

  app.post<{
    Body: { keepRecording?: boolean };
  }>(
    "/api/voice/reset",
    {
      schema: {
        body: {
          type: "object",
          properties: {
            // true → clear text + raw chunks, but keep the mic recording
            // false / omitted → full reset (restart the recorder)
            keepRecording: { type: "boolean", default: false },
          },
        },
      },
    },
    async (req, reply) => {
      const keepRecording = req.body?.keepRecording ?? false;
      req.log.info({ keepRecording }, "Resetting audio buffer");
      await buffer.reset({ keepRecording });
      return {
        ok: true,
        keepRecording,
        status: buffer.peek(),
      };
    }
  );

  app.post<{
    Body: { prompt?: string };
  }>(
    "/api/voice",
    {
      schema: {
        body: {
          type: "object",
          properties: {
            prompt: { type: "string" },
          },
        },
      },
    },
    async (req, reply) => {
      const log = req.log;
      const userPrompt =
        req.body?.prompt ?? "Respond to what the user just said.";

      // 1. Flush the buffered transcript → this is the "before that, just buffer
      //    the text" step; only now do we hit the LLM.
      const userText = await buffer.drainTranscript();
      if (!userText) {
        return reply
          .status(409)
          .send({ error: "No buffered transcript available yet." });
      }
      log.info({ userText }, "Buffered transcript drained");

      // 2. LLM
      const completion = await client.chat.completions.create({
        model: CHAT_MODEL,
        messages: [
          {
            role: "system",
            content:
              userPrompt,
          },
          {
            role: "user",
            content: `The presenter said these for the last few slides: ${userText}`,
          },
        ],
      });

      const replyText =
        completion.choices[0]?.message?.content?.trim() ?? "";
      if (!replyText) {
        return reply.status(502).send({ error: "LLM returned empty response." });
      }
      log.info({ replyText }, "LLM reply generated");

      // 3. TTS – streamed MP3 back to the caller
      const tts = await client.audio.speech.create({
        model: TTS_MODEL,
        voice: TTS_VOICE,
        input: replyText,
        response_format: "mp3",
      });

      reply
        .header("Content-Type", "audio/mpeg")
        .header("X-User-Transcript", encodeURIComponent(userText))
        .header("X-Assistant-Reply", encodeURIComponent(replyText))
        .header("Cache-Control", "no-store");

      // openai-node returns a web ReadableStream; Fastify needs a Node stream
      const nodeStream =
        tts.body instanceof Readable
          ? tts.body
          : Readable.fromWeb(tts.body as unknown as ReadableStream<Uint8Array>);

      return reply.send(nodeStream);
    }
  );
}
