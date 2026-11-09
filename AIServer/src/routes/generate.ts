import type { FastifyPluginAsync } from "fastify";
import { buildSystemPrompt } from "../prompts/systemPrompt.js";
import { generateSlideContent } from "../services/llm.js";
import { readSlides, type ParsedSlide } from "../services/slides.js";
import { insertSlideInFile } from "../services/slides-edit.js";
import { minifyHTML } from "../utils/minifier.js";
import type { GenerateRequest, GenerateResponse } from "../types.js";

export interface GenerateRouteOptions {
  slidesFile: string;
}

export const generateRoute: FastifyPluginAsync<GenerateRouteOptions> = async (
  app,
  options
) => {
  const { slidesFile } = options;

  if (!slidesFile) {
    throw new Error(
      "generateRoute plugin requires a `slidesFile` option, e.g. app.register(generateRoute, { slidesFile })"
    );
  }

  app.post<{ Body: GenerateRequest; Reply: GenerateResponse }>(
    "/api/generate",
    {
      schema: {
        body: {
          type: "object",
          required: ["question", "slideNum"],
          properties: {
            question: { type: "string", minLength: 1 },
            slideNum: { type: "number", minimum: 0 },
          },
        },
      },
    },
    async (req, reply) => {
      const { question, slideNum } = req.body;
      const log = req.log;

      log.info(
        { slideNum, slidesFile, questionPreview: question.slice(0, 50) },
        "Received generate request"
      );

      // `readSlides` returns the resolved view (src: files expanded), which
      // is exactly what `insertSlideInFile` expects for its `index` arg —
      // so `slideNum` is meaningful for both the bounds check and the insert.
      const slides = await readSlides(slidesFile);

      // slideNum === slides.length is allowed → append to the end of the deck.
      if (slideNum > slides.length) {
        log.warn(
          { slideNum, max: slides.length },
          "slideNum out of range"
        );
        return reply.status(400).send({
          error: `slideNum ${slideNum} out of range (max ${slides.length})`,
        } as unknown as GenerateResponse);
      }

      // Context slide for the LLM: the slide currently at `slideNum`
      // (for an append, fall back to the last existing slide). `null` on an
      // empty deck so `buildSystemPrompt` can handle the no-context case.
      const contextSlide =
        slides[slideNum] ?? slides[slides.length - 1] ?? null;
      const contextText = contextSlide?.content ?? "";
      const systemPrompt = buildSystemPrompt(question, contextText);

      log.debug("System prompt built with context slide");

      const generatedContent = await generateSlideContent(systemPrompt, log);
      const minifiedHtml = minifyHTML(generatedContent);

      const newSlide: ParsedSlide = {
        content: `# ${question}\n\n${minifiedHtml}`,
        frontmatter: {
          aiGen: true
        },
        // Offsets are only meaningful for slides parsed from an existing
        // file; `insertSlideInRaw` recomputes them from the target file.
        startOffset: -1,
        endOffset: -1,
      };

      // Insert *at* `slideNum` in the resolved deck. If `slideNum` falls
      // inside a `src:`-loaded region, `insertSlideInFile` writes into the
      // referenced file at the correct local index.
      const result = await insertSlideInFile(slidesFile, slideNum, newSlide);

      log.info(
        {
          slideNum,
          modifiedFile: result.modifiedFile,
          parentFile: result.parentFile,
          slideCount: result.slideCount,
          changed: result.changed,
        },
        "Generated slide inserted"
      );

      return {
        html: newSlide.content,
        insertedAt: slideNum,
        // Kept for clients on the old contract: the slide that now precedes
        // the new one is `slideNum - 1` (-1 when inserted at the very top).
        insertedAfter: slideNum - 1,
        message: "Successfully generated, minified, and inserted slide.",
      };
    }
  );
};
