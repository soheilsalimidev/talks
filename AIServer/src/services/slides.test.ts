import { describe, it, expect, vi, beforeEach } from "vitest";

// ---------------------------------------------------------------------------
// Hoisted mocks
// ---------------------------------------------------------------------------
const { mockReadFile, mockInfo } = vi.hoisted(() => ({
  mockReadFile: vi.fn(),
  mockInfo: vi.fn(),
}));

vi.mock("node:fs/promises", () => ({
  default: { readFile: mockReadFile },
  readFile: mockReadFile, // cover `import * as fs`
}));

// Must match the specifier used in src/services/slides.ts
vi.mock("../logger.js", () => ({
  logger: { info: mockInfo },
}));

import { ParsedSlide, readSlides } from "./slides.js";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const plain = (s: ParsedSlide) => ({
  content: s.content,
  frontmatter: s.frontmatter,
});
const plainAll = (ss: ParsedSlide[]) => ss.map(plain);
/**
 * Configure `fs.readFile` to return the given content for any path that
 * *ends with* the key (after normalising Windows separators).
 * Longest key wins so `"talks/deck.md"` doesn't collide with `"deck.md"`.
 */
function mockFiles(files: Record<string, string>) {
  const normalize = (p: string) => p.replace(/\\/g, "/");
  mockReadFile.mockImplementation(async (p: string) => {
    const key = normalize(p);
    const entries = Object.entries(files).sort(
      (a, b) => b[0].length - a[0].length
    );
    for (const [suffix, content] of entries) {
      if (key.endsWith(suffix)) return content;
    }
    const err: NodeJS.ErrnoException = new Error(
      `ENOENT: no such file or directory, open '${p}'`
    );
    err.code = "ENOENT";
    throw err;
  });
}

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

const SAMPLE_DECK = `---
theme: seriph
title: Welcome to Slidev
---

# Slide 1

The frontmatter of this slide is also the headmatter

---
layout: center
background: /background-1.png
class: text-white
---

# Slide 2

A page with the layout \`center\` and a background image

---

# Slide 3

A page without frontmatter

---
src: ./pages/4.md  # This slide only contains a frontmatter
---

---

# Slide 5
`;

const PAGE_4 = `---
layout: center
---

# Slide 4

Loaded from pages/4.md
`;

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("readSlides", () => {
  beforeEach(() => {
    mockReadFile.mockReset();
    mockInfo.mockReset();
  });

  // =========================================================================
  // `src` resolution
  // =========================================================================
  describe("`src` slide resolution", () => {
    it("expands a `src:`-only slide into the referenced file's slides", async () => {
      mockFiles({ "deck.md": SAMPLE_DECK, "pages/4.md": PAGE_4 });

      const slides = await readSlides("deck.md");

      expect(slides).toHaveLength(5);
      expect(slides[3]).toMatchObject({
        content: "# Slide 4\n\nLoaded from pages/4.md",
        frontmatter: { layout: "center" },
      });
    });

    it("reads each `src` file exactly once", async () => {
      mockFiles({ "deck.md": SAMPLE_DECK, "pages/4.md": PAGE_4 });

      await readSlides("deck.md");

      const srcReads = mockReadFile.mock.calls.filter(([p]) =>
        String(p).replace(/\\/g, "/").endsWith("pages/4.md")
      );
      expect(srcReads).toHaveLength(1);
    });

    it("resolves `src` relative to the deck file's directory", async () => {
      mockFiles({
        "talks/deck.md": `---\nsrc: ./parts/intro.md\n---\n`,
        "talks/parts/intro.md": `# Intro\n`,
      });

      const slides = await readSlides("talks/deck.md");

      expect(mockReadFile).toHaveBeenCalledWith(
        expect.stringMatching(/talks[\\/]parts[\\/]intro\.md$/),
        "utf-8"
      );
      expect(slides).toMatchObject([{ content: "# Intro", frontmatter: null }]);
    });

    it("splices in every slide from the referenced file", async () => {
      mockFiles({
        "deck.md": `---\nsrc: ./multi.md\n---\n`,
        "multi.md": `# A\n\n---\n\n# B\n\n---\n\n# C\n`,
      });

      const slides = await readSlides("deck.md");

      expect(slides.map((s) => s.content)).toEqual(["# A", "# B", "# C"]);
    });

    it("preserves the loaded slides' own frontmatter", async () => {
      mockFiles({
        "deck.md": `---\nsrc: ./page.md\n---\n`,
        "page.md": `---\nlayout: cover\n---\n\n# Hello\n`,
      });

      const slides = await readSlides("deck.md");

      expect(slides).toMatchObject([
        { content: "# Hello", frontmatter: { layout: "cover" } },
      ]);
    });

    it("keeps the placeholder if the referenced file is missing", async () => {
      mockFiles({ "deck.md": `---\nsrc: ./missing.md\n---\n` });

      const slides = await readSlides("deck.md");

      expect(slides).toMatchObject([
        { content: "", frontmatter: { src: "./missing.md" } },
      ]);
    });

    it("logs the failure when the referenced file is missing", async () => {
      mockFiles({ "deck.md": `---\nsrc: ./missing.md\n---\n` });

      await readSlides("deck.md");

      expect(mockInfo).toHaveBeenCalledWith(
        expect.objectContaining({
          src: expect.stringMatching(/missing\.md$/),
        }),
        expect.stringContaining("Failed to load")
      );
    });

    it("does NOT recurse — a `src:` inside the loaded file stays a placeholder", async () => {
      mockFiles({
        "deck.md": `---\nsrc: ./outer.md\n---\n`,
        "outer.md": `---\nsrc: ./inner.md\n---\n`,
        "inner.md": `# Should never be loaded\n`,
      });

      const slides = await readSlides("deck.md");

      expect(slides).toMatchObject([
        { content: "", frontmatter: { src: "./inner.md" } },
      ]);
      expect(mockReadFile).not.toHaveBeenCalledWith(
        expect.stringMatching(/inner\.md$/),
        "utf-8"
      );
    });

    it("does not treat a slide with `src` AND body content as src-only", async () => {
      mockFiles({
        "deck.md": `---\nsrc: ./pages/ignored.md\n---\n\n# Real content\n`,
        "pages/ignored.md": `# Should not appear\n`,
      });

      const slides = await readSlides("deck.md");

      expect(slides).toMatchObject([
        {
          content: "# Real content",
          frontmatter: { src: "./pages/ignored.md" },
        },
      ]);
      expect(mockReadFile).not.toHaveBeenCalledWith(
        expect.stringMatching(/ignored\.md$/),
        "utf-8"
      );
    });

    it("leaves frontmatter-only slides without `src` as placeholders", async () => {
      mockFiles({ "deck.md": `---\ntitle: Standalone\n---\n` });

      const slides = await readSlides("deck.md");

      expect(slides).toMatchObject([
        { content: "", frontmatter: { title: "Standalone" } },
      ]);
    });

    it("does not expand a `src` that is not a string", async () => {
      mockFiles({
        "deck.md": `---\nsrc: [a, b]\n---\n`,
      });

      const slides = await readSlides("deck.md");

      expect(slides).toMatchObject([
        { content: "", frontmatter: { src: ["a", "b"] } },
      ]);
    });
  });

  // =========================================================================
  // Parsing / regression
  // =========================================================================
  describe("parsing", () => {
    it("splits the sample deck into 5 slides when `src` is resolvable", async () => {
      mockFiles({ "deck.md": SAMPLE_DECK, "pages/4.md": PAGE_4 });

      const slides = await readSlides("deck.md");

      expect(slides[0]).toMatchObject({
        content:
          "# Slide 1\n\nThe frontmatter of this slide is also the headmatter",
        frontmatter: { theme: "seriph", title: "Welcome to Slidev" },
      });
      expect(slides[1]).toMatchObject({
        content:
          "# Slide 2\n\nA page with the layout `center` and a background image",
        frontmatter: {
          layout: "center",
          background: "/background-1.png",
          class: "text-white",
        },
      });
      expect(slides[2]).toMatchObject({
        content: "# Slide 3\n\nA page without frontmatter",
        frontmatter: null,
      });
      expect(slides[4]).toMatchObject({
        content: "# Slide 5",
        frontmatter: null,
      });
    });

    it("handles CRLF line endings", async () => {
      mockFiles({
        "deck.md":
          "---\r\ntitle: A\r\n---\r\n\r\n# One\r\n\r\n---\r\n\r\n# Two\r\n",
      });

      const slides = await readSlides("deck.md");

      expect(slides).toMatchObject([
        { content: "# One", frontmatter: { title: "A" } },
        { content: "# Two", frontmatter: null },
      ]);
    });

    it("returns [] for an empty file", async () => {
      mockFiles({ "deck.md": "" });

      const slides = await readSlides("deck.md");

      expect(slides).toMatchObject([]);
    });

    it("does not split on inline `---` in prose", async () => {
      mockFiles({
        "deck.md": "# Slide\n\nThis --- is inline.\n\n---\n\n# Next\n",
      });

      const slides = await readSlides("deck.md");

      expect(slides).toHaveLength(2);
      expect(slides[0].content).toContain("This --- is inline");
      expect(slides[0].content).not.toContain("# Next");
    });

    it("logs the final slide count after expansion", async () => {
      mockFiles({ "deck.md": SAMPLE_DECK, "pages/4.md": PAGE_4 });

      await readSlides("deck.md");

      const lastCall = mockInfo.mock.calls.at(-1);
      expect(lastCall?.[0]).toMatchObject({ slideCount: 5 });
    });
  });
  it("records startOffset/endOffset into the source raw", async () => {
    mockFiles({ "deck.md": SAMPLE_DECK, "pages/4.md": PAGE_4 });

    const slides = await readSlides("deck.md");

    // Parent slide 0 starts at byte 0 (its opening `---`).
    expect(slides[0].startOffset).toBe(0);
    // Its end is where slide 1 starts, which is > 0 and < raw.length.
    expect(slides[0].endOffset).toBeGreaterThan(0);
    expect(slides[0].endOffset).toBe(slides[1].startOffset);

    // The `src:`-loaded slide reports -1 / -1 because its bytes live in
    // pages/4.md, not in the parent raw.
    expect(slides[3].startOffset).toBe(-1);
    expect(slides[3].endOffset).toBe(-1);
  });
});
