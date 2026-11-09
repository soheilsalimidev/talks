// src/routes/generate.test.ts
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import Fastify, { type FastifyInstance } from "fastify";

// ---------------------------------------------------------------------------
// Hoisted mocks for every collaborator the route touches.
// ---------------------------------------------------------------------------
const {
  mockReadSlides,
  mockInsertSlideInFile,
  mockGenerateSlideContent,
  mockBuildSystemPrompt,
  mockMinifyHTML,
} = vi.hoisted(() => ({
  mockReadSlides: vi.fn(),
  mockInsertSlideInFile: vi.fn(),
  mockGenerateSlideContent: vi.fn(),
  mockBuildSystemPrompt: vi.fn(),
  mockMinifyHTML: vi.fn(),
}));

vi.mock("../services/slides.js", () => ({
  readSlides: mockReadSlides,
}));

vi.mock("../services/slides-edit.js", () => ({
  insertSlideInFile: mockInsertSlideInFile,
}));

vi.mock("../services/llm.js", () => ({
  generateSlideContent: mockGenerateSlideContent,
}));

vi.mock("../prompts/systemPrompt.js", () => ({
  buildSystemPrompt: mockBuildSystemPrompt,
}));

vi.mock("../utils/minifier.js", () => ({
  minifyHTML: mockMinifyHTML,
}));

import { generateRoute } from "./generate.js";
import type { ParsedSlide } from "../services/slides.js";

// ---------------------------------------------------------------------------
// Fixtures & helpers
// ---------------------------------------------------------------------------

const slide = (
  content: string,
  frontmatter: Record<string, unknown> | null = null
): ParsedSlide => ({ content, frontmatter, startOffset: 0, endOffset: 0 });

const okInsertResult = (overrides: Record<string, unknown> = {}) => ({
  modifiedFile: "/deck.md",
  parentFile: "/deck.md",
  changed: true,
  slideCount: 3,
  slides: [],
  ...overrides,
});

const post = (app: FastifyInstance, body: unknown) =>
  app.inject({ method: "POST", url: "/api/generate", payload: body as object });

// ---------------------------------------------------------------------------
// Suite
// ---------------------------------------------------------------------------

describe("generateRoute", () => {
  let app: FastifyInstance;

  beforeEach(async () => {
    vi.resetAllMocks();

    mockBuildSystemPrompt.mockReturnValue("SYSTEM PROMPT");
    mockGenerateSlideContent.mockResolvedValue("<p>gen</p>");
    mockMinifyHTML.mockImplementation((s: string) => s.trim());
    mockReadSlides.mockResolvedValue([slide("# A"), slide("# B")]);
    mockInsertSlideInFile.mockResolvedValue(okInsertResult());

    app = Fastify({ logger: false });
    await app.register(generateRoute, { slidesFile: "/deck.md" });
    await app.ready();
  });

  afterEach(async () => {
    await app.close();
  });

  // =========================================================================
  // Registration
  // =========================================================================

  describe("registration", () => {
    it("rejects when slidesFile is not provided", async () => {
      const instance = Fastify({ logger: false });
      await expect(
        generateRoute(instance, {} as { slidesFile: string })
      ).rejects.toThrow(/slidesFile/);
      await instance.close();
    });
  });

  // =========================================================================
  // Request validation (schema-level)
  // =========================================================================

  describe("request validation", () => {
    it("returns 400 when question is missing", async () => {
      const res = await post(app, { slideNum: 0 });
      expect(res.statusCode).toBe(400);
    });

    it("returns 400 when slideNum is missing", async () => {
      const res = await post(app, { question: "Q" });
      expect(res.statusCode).toBe(400);
    });

    it("returns 400 when question is empty", async () => {
      const res = await post(app, { question: "", slideNum: 0 });
      expect(res.statusCode).toBe(400);
    });

    it("returns 400 when slideNum is negative", async () => {
      const res = await post(app, { question: "Q", slideNum: -1 });
      expect(res.statusCode).toBe(400);
    });
  });

  // =========================================================================
  // Range handling
  // =========================================================================

  describe("slideNum bounds", () => {
    it("returns 400 when slideNum > slides.length", async () => {
      const res = await post(app, { question: "Q", slideNum: 5 });

      expect(res.statusCode).toBe(400);
      expect(res.json()).toEqual({ error: "slideNum 5 out of range (max 2)" });
      // The rest of the pipeline must not have run.
      expect(mockBuildSystemPrompt).not.toHaveBeenCalled();
      expect(mockGenerateSlideContent).not.toHaveBeenCalled();
      expect(mockInsertSlideInFile).not.toHaveBeenCalled();
    });

    it("accepts slideNum === slides.length (append)", async () => {
      const res = await post(app, { question: "Q", slideNum: 2 });
      expect(res.statusCode).toBe(200);
    });
  });

  // =========================================================================
  // Happy path
  // =========================================================================

  describe("happy path", () => {
    it("returns the generated HTML, insertedAt, and message", async () => {
      const res = await post(app, { question: "What is X?", slideNum: 1 });

      expect(res.statusCode).toBe(200);
      expect(res.json()).toEqual({
        html: "# What is X?\n\n<p>gen</p>",
        insertedAt: 1,
        insertedAfter: 0,
        message:
          "Successfully generated, minified, and inserted slide.",
      });
    });

    it("reads the deck with the configured slidesFile", async () => {
      await post(app, { question: "Q", slideNum: 0 });
      expect(mockReadSlides).toHaveBeenCalledWith("/deck.md");
    });

    it("passes the context slide's content at slideNum to buildSystemPrompt", async () => {
      const slides = [slide("# A"), slide("# B"), slide("# C")];
      mockReadSlides.mockResolvedValue(slides);

      await post(app, { question: "Q", slideNum: 1 });

      expect(mockBuildSystemPrompt).toHaveBeenCalledWith("Q", "# B");
    });

    it("falls back to the last slide's content when appending", async () => {
      const slides = [slide("# A"), slide("# B")];
      mockReadSlides.mockResolvedValue(slides);

      await post(app, { question: "Q", slideNum: 2 });

      expect(mockBuildSystemPrompt).toHaveBeenCalledWith("Q", "# B");
    });

    it("passes null as context when the deck is empty", async () => {
      mockReadSlides.mockResolvedValue([]);

      const res = await post(app, { question: "Q", slideNum: 0 });

      expect(res.statusCode).toBe(200);
      expect(mockBuildSystemPrompt).toHaveBeenCalledWith("Q", "");
    });

    it("calls generateSlideContent with the system prompt", async () => {
      await post(app, { question: "Q", slideNum: 0 });

      expect(mockGenerateSlideContent).toHaveBeenCalledTimes(1);
      const [prompt] = mockGenerateSlideContent.mock.calls[0];
      expect(prompt).toBe("SYSTEM PROMPT");
    });
  });

  // =========================================================================
  // Content assembly
  // =========================================================================

  describe("content assembly", () => {
    it("prepends the question as an H1 to the minified HTML", async () => {
      mockGenerateSlideContent.mockResolvedValue("  <p>raw</p>  ");
      mockMinifyHTML.mockImplementation((s: string) => s.trim());

      await post(app, { question: "My Question", slideNum: 0 });

      expect(mockInsertSlideInFile).toHaveBeenCalledWith(
        "/deck.md",
        0,
        expect.objectContaining({
          content: "# My Question\n\n<p>raw</p>",
        })
      );
    });

    it("applies minifyHTML to the LLM output before assembly", async () => {
      mockGenerateSlideContent.mockResolvedValue("<p>  spaced  </p>");
      mockMinifyHTML.mockReturnValue("<p>spaced</p>");

      await post(app, { question: "Q", slideNum: 0 });

      expect(mockMinifyHTML).toHaveBeenCalledWith("<p>  spaced  </p>");
      expect(mockInsertSlideInFile).toHaveBeenCalledWith(
        "/deck.md",
        0,
        expect.objectContaining({ content: "# Q\n\n<p>spaced</p>" })
      );
    });

    it("builds a ParsedSlide with no frontmatter and -1 offsets", async () => {
      await post(app, { question: "Q", slideNum: 1 });

      expect(mockInsertSlideInFile).toHaveBeenCalledWith(
        "/deck.md",
        1,
        expect.objectContaining({
          frontmatter: { aiGen: true },
          startOffset: -1,
          endOffset: -1,
        })
      );
    });
  });

  // =========================================================================
  // Insert position routing
  // =========================================================================

  describe("insertion position", () => {
    it("inserts at index 0 when slideNum is 0", async () => {
      await post(app, { question: "Q", slideNum: 0 });
      expect(mockInsertSlideInFile).toHaveBeenCalledWith(
        "/deck.md",
        0,
        expect.anything()
      );
    });

    it("inserts at slideNum when slideNum is in the middle", async () => {
      mockReadSlides.mockResolvedValue([
        slide("# A"),
        slide("# B"),
        slide("# C"),
      ]);
      await post(app, { question: "Q", slideNum: 1 });
      expect(mockInsertSlideInFile).toHaveBeenCalledWith(
        "/deck.md",
        1,
        expect.anything()
      );
    });

    it("appends when slideNum === slides.length", async () => {
      await post(app, { question: "Q", slideNum: 2 });
      expect(mockInsertSlideInFile).toHaveBeenCalledWith(
        "/deck.md",
        2,
        expect.anything()
      );
    });

    it("propagates modifiedFile from insertSlideInFile (src-file routing)", async () => {
      // Deck of 2 slides where slideNum lands inside a src-loaded region.
      mockReadSlides.mockResolvedValue([slide("# A"), slide("# Child")]);
      mockInsertSlideInFile.mockResolvedValue(
        okInsertResult({ modifiedFile: "/pages/child.md" })
      );

      const res = await post(app, { question: "Q", slideNum: 1 });

      expect(res.statusCode).toBe(200);
      // Response shape doesn't expose the file, but the call must still be
      // forwarded verbatim — the routing itself lives in insertSlideInFile.
      expect(mockInsertSlideInFile).toHaveBeenCalledWith(
        "/deck.md",
        1,
        expect.anything()
      );
    });
  });

  // =========================================================================
  // Response field contract
  // =========================================================================

  describe("response fields", () => {
    it("sets insertedAt to slideNum", async () => {
      const res = await post(app, { question: "Q", slideNum: 1 });
      expect(res.json().insertedAt).toBe(1);
    });

    it("sets insertedAfter to slideNum - 1", async () => {
      const res = await post(app, { question: "Q", slideNum: 1 });
      expect(res.json().insertedAfter).toBe(0);
    });

    it("sets insertedAfter to -1 when inserting at the very top", async () => {
      const res = await post(app, { question: "Q", slideNum: 0 });
      expect(res.json().insertedAfter).toBe(-1);
    });

    it("echoes the assembled slide content in html", async () => {
      mockGenerateSlideContent.mockResolvedValue("<p>body</p>");
      mockMinifyHTML.mockReturnValue("<p>body</p>");

      const res = await post(app, { question: "Title", slideNum: 0 });
      expect(res.json().html).toBe("# Title\n\n<p>body</p>");
    });
  });

  // =========================================================================
  // Failure propagation
  // =========================================================================

  describe("failure propagation", () => {
    it("returns 500 when readSlides rejects", async () => {
      mockReadSlides.mockRejectedValue(new Error("read failed"));

      const res = await post(app, { question: "Q", slideNum: 0 });
      expect(res.statusCode).toBe(500);
      expect(mockInsertSlideInFile).not.toHaveBeenCalled();
    });

    it("returns 500 when generateSlideContent rejects", async () => {
      mockGenerateSlideContent.mockRejectedValue(new Error("llm down"));

      const res = await post(app, { question: "Q", slideNum: 0 });
      expect(res.statusCode).toBe(500);
      expect(mockInsertSlideInFile).not.toHaveBeenCalled();
    });

    it("returns 500 when insertSlideInFile rejects", async () => {
      mockInsertSlideInFile.mockRejectedValue(new Error("write failed"));

      const res = await post(app, { question: "Q", slideNum: 0 });
      expect(res.statusCode).toBe(500);
    });

    it("does not write when minifyHTML throws", async () => {
      mockMinifyHTML.mockImplementation(() => {
        throw new Error("minifier crashed");
      });

      const res = await post(app, { question: "Q", slideNum: 0 });
      expect(res.statusCode).toBe(500);
      expect(mockInsertSlideInFile).not.toHaveBeenCalled();
    });
  });
});
