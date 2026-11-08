// src/routes/generate.e2e.test.ts
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { mkdtemp, mkdir, writeFile, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import type { AddressInfo } from "node:net";
import type { FastifyInstance } from "fastify";

// Only the AI call is faked.
const { mockGenerateSlideContent } = vi.hoisted(() => ({
  mockGenerateSlideContent: vi.fn(),
}));

vi.mock("../services/llm.js", () => ({
  generateSlideContent: mockGenerateSlideContent,
}));

// Silence the real logger so test output stays readable.
// If you'd rather see the server's logs, delete this block.
vi.mock("../logger.js", () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn(), debug: vi.fn() },
}));

import { buildServer } from "../index.js";

describe("POST /api/generate — e2e (real server via index.ts)", () => {
  let app: FastifyInstance;
  let baseUrl: string;
  let tmp: string;
  let deckPath: string;
  let childPath: string;

  beforeEach(async () => {
    tmp = await mkdtemp(join( "./slides-e2e-"));
    await mkdir(join(tmp, "pages"), { recursive: true });
    deckPath = join(tmp, "deck.md");
    childPath = join(tmp, "pages", "child.md");

    mockGenerateSlideContent.mockReset();
    mockGenerateSlideContent.mockResolvedValue("<p>AI generated</p>");

    // Uses the *real* buildServer — CORS, onRequest hook, error handler,
    // 404 handler, and the generate route are all live.
    app = await buildServer(deckPath);
    await app.listen({ port: 0, host: "127.0.0.1" });
    const { port } = app.server.address() as AddressInfo;
    baseUrl = `http://127.0.0.1:${port}`;
  });

  afterEach(async () => {
    await app.close();
    await rm(tmp, { recursive: true, force: true });
  });

  const post = (body: unknown) =>
    fetch(`${baseUrl}/api/generate`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });

  // -------------------------------------------------------------------------
  // Happy path — deck.md modified in place
  // -------------------------------------------------------------------------

  describe("happy path", () => {
    it("inserts a slide into the middle and preserves the other slides", async () => {
      const original = `# Slide 1\n\nFirst\n\n---\n\n# Slide 2\n\nSecond\n`;
      await writeFile(deckPath, original);

      const res = await post({ question: "What is new?", slideNum: 1 });
      expect(res.status).toBe(200);

      const body = await res.json();
      expect(body.insertedAt).toBe(1);
      expect(body.insertedAfter).toBe(0);
      expect(body.html).toContain("# What is new?");
      expect(body.html).toContain("<p>AI generated</p>");

      const after = await readFile(deckPath, "utf-8");
      expect(after).toContain("# Slide 1\n\nFirst");
      expect(after).toContain("# Slide 2\n\nSecond");
      expect(after.indexOf("# Slide 1")).toBeLessThan(
        after.indexOf("# What is new?")
      );
      expect(after.indexOf("# What is new?")).toBeLessThan(
        after.indexOf("# Slide 2")
      );
      expect(after).toContain("aiGen: true");
    });

    it("inserts at the top when slideNum is 0", async () => {
      await writeFile(deckPath, `# A\n\n---\n\n# B\n`);

      const res = await post({ question: "Intro", slideNum: 0 });
      expect(res.status).toBe(200);

      const after = await readFile(deckPath, "utf-8");
      expect(after.indexOf("# Intro")).toBeLessThan(after.indexOf("# A"));
    });

    it("appends when slideNum === slides.length", async () => {
      await writeFile(deckPath, `# A\n\n---\n\n# B\n`);

      const res = await post({ question: "Outro", slideNum: 2 });
      expect(res.status).toBe(200);

      const after = await readFile(deckPath, "utf-8");
      expect(after.indexOf("# Outro")).toBeGreaterThan(after.indexOf("# B"));
    });

    it("creates the first slide when deck.md is empty", async () => {
      await writeFile(deckPath, "");

      const res = await post({ question: "First", slideNum: 0 });
      expect(res.status).toBe(200);

      const after = await readFile(deckPath, "utf-8");
      expect(after).toContain("# First");
      expect(after).toContain("<p>AI generated</p>");
    });

    it("preserves YAML comments and formatting in untouched slides", async () => {
      const original = [
        "# A",
        "",
        "---",
        "# Keep me",
        "layout: center",
        "---",
        "",
        "# B",
        "",
      ].join("\n");
      await writeFile(deckPath, original);

      const res = await post({ question: "New", slideNum: 1 });
      expect(res.status).toBe(200);

      const after = await readFile(deckPath, "utf-8");
      expect(after).toContain("# Keep me");
      expect(after).toContain("layout: center");
      expect(after).toContain("# New");
    });
  });

  // -------------------------------------------------------------------------
  // src routing — child file rewritten, parent untouched
  // -------------------------------------------------------------------------

  describe("src routing", () => {
    it("inserts into the child file, leaving deck.md byte-identical", async () => {
      const parent = `# A\n\n---\n\n---\nsrc: ./pages/child.md\n---\n\n---\n\n# B\n`;
      const child = `# C1\n\n---\n\n# C2\n`;
      await writeFile(deckPath, parent);
      await writeFile(childPath, child);

      // Resolved deck is [A, C1, C2, B]; slideNum 2 targets C2 (child index 1).
      const res = await post({ question: "New", slideNum: 2 });
      expect(res.status).toBe(200);

      expect(await readFile(deckPath, "utf-8")).toBe(parent);

      const childAfter = await readFile(childPath, "utf-8");
      expect(childAfter).toContain("# New");
      expect(childAfter.indexOf("# C1")).toBeLessThan(
        childAfter.indexOf("# New")
      );
      expect(childAfter.indexOf("# New")).toBeLessThan(
        childAfter.indexOf("# C2")
      );
    });

    it("appends into the child when the deck ends with a src block", async () => {
      const parent = `# A\n\n---\n\n---\nsrc: ./pages/child.md\n---\n`;
      const child = `# C1\n\n---\n\n# C2\n`;
      await writeFile(deckPath, parent);
      await writeFile(childPath, child);

      const res = await post({ question: "New", slideNum: 3 });
      expect(res.status).toBe(200);

      expect(await readFile(deckPath, "utf-8")).toBe(parent);

      const childAfter = await readFile(childPath, "utf-8");
      expect(childAfter.indexOf("# New")).toBeGreaterThan(
        childAfter.indexOf("# C2")
      );
    });
  });

  // -------------------------------------------------------------------------
  // Failure paths — files left untouched
  // -------------------------------------------------------------------------

  describe("failures leave files untouched", () => {
    it("returns 500 when the LLM fails", async () => {
      const original = `# A\n\n---\n\n# B\n`;
      await writeFile(deckPath, original);
      mockGenerateSlideContent.mockRejectedValueOnce(new Error("LLM down"));

      const res = await post({ question: "Q", slideNum: 1 });
      expect(res.status).toBe(500);
      expect(await res.json()).toEqual({ error: "LLM down" });

      expect(await readFile(deckPath, "utf-8")).toBe(original);
    });

    it("returns 400 when slideNum is out of range", async () => {
      const original = `# A\n\n---\n\n# B\n`;
      await writeFile(deckPath, original);

      const res = await post({ question: "Q", slideNum: 99 });
      expect(res.status).toBe(400);

      expect(await readFile(deckPath, "utf-8")).toBe(original);
    });

    it("returns 400 when the body is invalid", async () => {
      await writeFile(deckPath, `# A\n`);
      const res = await post({ slideNum: 0 }); // missing question
      expect(res.status).toBe(400);
    });
  });

  // -------------------------------------------------------------------------
  // index.ts-specific wiring — proven to be live because we use buildServer
  // -------------------------------------------------------------------------

  describe("server wiring from index.ts", () => {
    it("answers CORS preflight with the configured origin", async () => {
      const res = await fetch(`${baseUrl}/api/generate`, {
        method: "OPTIONS",
        headers: {
          origin: "http://example.com",
          "access-control-request-method": "POST",
        },
      });
      expect(res.status).toBe(204);
      expect(res.headers.get("access-control-allow-origin")).toBe("*");
      expect(res.headers.get("access-control-allow-methods")).toContain("POST");
    });

    it("returns the 404 handler's JSON for unknown routes", async () => {
      const res = await fetch(`${baseUrl}/api/nope`);
      expect(res.status).toBe(404);
      expect(await res.json()).toEqual({ error: "Not found" });
    });
  });
});
