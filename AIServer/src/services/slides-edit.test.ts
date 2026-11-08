import { describe, it, expect, vi, beforeEach } from "vitest";

const { mockReadFile, mockWriteFile, mockInfo } = vi.hoisted(() => ({
  mockReadFile: vi.fn(),
  mockWriteFile: vi.fn(),
  mockInfo: vi.fn(),
}));

vi.mock("node:fs/promises", () => ({
  default: { readFile: mockReadFile, writeFile: mockWriteFile },
  readFile: mockReadFile,
  writeFile: mockWriteFile,
}));

vi.mock("../logger.js", () => ({ logger: { info: mockInfo } }));

import { insertSlideInFile } from "./slides-edit.js";
import type { ParsedSlide } from "./slides.js";

const s = (
  content: string,
  frontmatter: Record<string, unknown> | null = null
): ParsedSlide => ({ content, frontmatter, startOffset: -1, endOffset: -1 });

// ---------------------------------------------------------------------------
// In-memory FS helper
// ---------------------------------------------------------------------------
type Files = Record<string, string>;

function setupFs(files: Files) {
  const normalize = (p: string) => p.replace(/\\/g, "/");

  const findKey = (p: string) =>
    Object.keys(files)
      .sort((a, b) => b.length - a.length)
      .find((k) => normalize(p).endsWith(k));

  mockReadFile.mockImplementation(async (p: string) => {
    const key = findKey(p);
    if (!key) {
      const err: NodeJS.ErrnoException = new Error(`ENOENT: ${p}`);
      err.code = "ENOENT";
      throw err;
    }
    return files[key];
  });

  mockWriteFile.mockImplementation(async (p: string, c: string) => {
    const key = findKey(p);
    if (!key) throw new Error(`ENOENT (write): ${p}`);
    files[key] = c;                              // ← persist the write
    writeLog.push({ path: normalize(p), content: c });
  });
}

const writeLog: Array<{ path: string; content: string }> = [];
beforeEach(() => {
  mockReadFile.mockReset();
  mockWriteFile.mockReset();
  mockInfo.mockReset();
  writeLog.length = 0;
  mockWriteFile.mockImplementation(async (p: string, c: string) => {
    writeLog.push({ path: p.replace(/\\/g, "/"), content: c });
  });
});

const NEW = s("# NEW");

describe("insertSlideInFile — parent-only deck", () => {
  it("inserts into the parent when target is a parent slide", async () => {
    setupFs({
      "deck.md": "# A\n\n---\n\n# B\n",
    });

    const res = await insertSlideInFile("deck.md", 1, NEW);

    expect(res.modifiedFile).toMatch(/deck\.md$/);
    expect(res.changed).toBe(true);
    expect(writeLog).toHaveLength(1);
    expect(writeLog[0].path).toMatch(/deck\.md$/);
    expect(writeLog[0].content).toBe("# A\n\n---\n\n# NEW\n\n---\n\n# B\n");
  });

  it("appends into the parent when the deck ends in a parent slide", async () => {
    setupFs({ "deck.md": "# A\n\n---\n\n# B\n" });

    const res = await insertSlideInFile("deck.md", 2, NEW);

    expect(res.modifiedFile).toMatch(/deck\.md$/);
    expect(writeLog[0].content).toBe("# A\n\n---\n\n# B\n\n---\n\n# NEW\n");
  });
});

describe("insertSlideInFile — src routing", () => {
  const DECK = `# A

---

---
src: ./pages/child.md
---

---

# B
`;
  const CHILD = `# C1

---

# C2
`;

  it("inserts into the child when target is a child slide", async () => {
    setupFs({ "deck.md": DECK, "pages/child.md": CHILD });

    // Resolved: [A(parent), C1(child), C2(child), B(parent)]
    // insert before C2 → child, localIndex 1
    const res = await insertSlideInFile("deck.md", 2, NEW);

    expect(res.modifiedFile).toMatch(/pages[\\/]child\.md$/);
    expect(writeLog).toHaveLength(1);
    expect(writeLog[0].path).toMatch(/pages[\\/]child\.md$/);
    expect(writeLog[0].content).toBe("# C1\n\n---\n\n# NEW\n\n---\n\n# C2\n");
  });

  it("inserts into the child when target is the first child slide", async () => {
    setupFs({ "deck.md": DECK, "pages/child.md": CHILD });

    // insert before C1 → child, localIndex 0
    const res = await insertSlideInFile("deck.md", 1, NEW);

    expect(res.modifiedFile).toMatch(/pages[\\/]child\.md$/);
    expect(writeLog[0].content).toBe("# NEW\n\n---\n\n# C1\n\n---\n\n# C2\n");
  });

  it("appends into the child when the deck ends with a src block", async () => {
    setupFs({
      "deck.md": `# A\n\n---\n\n---\nsrc: ./pages/child.md\n---\n`,
      "pages/child.md": CHILD,
    });

    // Resolved: [A, C1, C2]; append → child, localIndex 2
    const res = await insertSlideInFile("deck.md", 3, NEW);

    expect(res.modifiedFile).toMatch(/pages[\\/]child\.md$/);
    expect(writeLog[0].content).toBe("# C1\n\n---\n\n# C2\n\n---\n\n# NEW\n");
  });

  it("inserts into the parent when target is the slide after a src block", async () => {
    setupFs({ "deck.md": DECK, "pages/child.md": CHILD });

    // Resolved: [A, C1, C2, B]; insert before B → parent, localIndex 2
    const res = await insertSlideInFile("deck.md", 3, NEW);

    expect(res.modifiedFile).toMatch(/deck\.md$/);
    // Parent still has the src block untouched
    expect(writeLog[0].content).toContain("src: ./pages/child.md");
    expect(writeLog[0].content).toContain("# NEW");
  });

  it("inserts into the parent when the src is broken (placeholder)", async () => {
    setupFs({
      "deck.md": `# A\n\n---\n\n---\nsrc: ./pages/missing.md\n---\n`,
      // missing.md intentionally absent
    });

    // Resolved: [A, placeholder]; insert before placeholder → parent, localIndex 1
    const res = await insertSlideInFile("deck.md", 1, NEW);

    expect(res.modifiedFile).toMatch(/deck\.md$/);
    expect(writeLog[0].content).toContain("src: ./pages/missing.md");
    expect(writeLog[0].content).toContain("# NEW");
  });
});

describe("insertSlideInFile — bookkeeping", () => {
  it("reports the resolved slide count from the parent deck", async () => {
    setupFs({
      "deck.md": `# A\n\n---\n\n---\nsrc: ./pages/child.md\n---\n`,
      "pages/child.md": `# C1\n\n---\n\n# C2\n`,
    });

    const res = await insertSlideInFile("deck.md", 3, NEW);

    // A + C1 + C2 + NEW
    expect(res.slideCount).toBe(4);
    expect(res.slides.map((x) => x.content)).toEqual([
      "# A",
      "# C1",
      "# C2",
      "# NEW",
    ]);
  });

  it("does not write when the inserted slide is empty", async () => {
    setupFs({ "deck.md": "# A\n" });

    const res = await insertSlideInFile("deck.md", 1, s(""));

    expect(res.changed).toBe(false);
    expect(writeLog).toHaveLength(0);
  });

  it("throws when index is out of range", async () => {
    setupFs({ "deck.md": "# A\n" });

    await expect(insertSlideInFile("deck.md", 5, NEW)).rejects.toThrow(
      RangeError
    );
  });
});
