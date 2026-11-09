import type { FastifyBaseLogger } from "fastify";

const LLM_URL = "https://api.avalai.ir/v1/chat/completions";
const MODEL = "deepseek-v4.1-flash";

interface LLMResponse {
  choices: { message: { content: string } }[];
}

export async function generateSlideContent(
  systemPrompt: string,
  log: FastifyBaseLogger
): Promise<string> {
  log.info(`Calling LLM API (${MODEL})...`);

  const response = await fetch(LLM_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [{ role: "system", content: systemPrompt }],
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    log.error({ status: response.status, body: errText }, "LLM API request failed");
    const err = new Error(`LLM API failed (${response.status}): ${errText}`);
    (err as Error & { statusCode: number }).statusCode = response.status;
    throw err;
  }

  const data = (await response.json()) as LLMResponse;
  const content = (data.choices[0]?.message?.content ?? "")
    .replace(/^```(?:markdown|html)?\s*/i, "")
    .replace(/```$/i, "")
    .trim();

  log.info({ contentLength: content.length }, "LLM responded");
  return content;
}
