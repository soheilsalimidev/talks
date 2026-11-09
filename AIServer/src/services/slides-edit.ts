import { resolve as resolvePath } from "node:path";
import fs from "node:fs/promises";
import { dump as dumpYaml } from "js-yaml";

import { parseSlides, type ParsedSlide } from "./slides.js";

// ---------------------------------------------------------------------------
// Stringify
// ---------------------------------------------------------------------------

/**
 * Stringify a single slide.
 *
 *   frontmatter + content  →  "---\n{yaml}\n---\n\n{content}"
 *   frontmatter only       →  "---\n{yaml}\n---"
 *   content only           →  "{content}"
 *   neither                →  ""
 */
export function stringifySlide(slide: ParsedSlide): string {
  const fm = slide.frontmatter;
  const hasFm = !!fm && Object.keys(fm).length > 0;
  const hasContent = slide.content.trim().length > 0;

  const parts: string[] = [];
  if (hasFm) {
    parts.push("---");
    parts.push(dumpYaml(fm).trimEnd());
    parts.push("---");
  }
  if (hasContent) {
    if (hasFm) parts.push(""); // blank line between `---` and content
    parts.push(slide.content);
  }
  return parts.join("\n");
}

/** Stringify a list of slides. Slides are separated by `\n\n---\n\n`. */
export function stringifySlides(slides: ParsedSlide[]): string {
  return slides
    .map(stringifySlide)
    .filter((text) => text.length > 0)
    .join("\n\n---\n\n");
}

// ---------------------------------------------------------------------------
// Array-level insert (unchanged)
// ---------------------------------------------------------------------------

export function insertSlide(
  slides: ParsedSlide[],
  index: number,
  slide: ParsedSlide
): ParsedSlide[] {
  if (!Number.isInteger(index) || index < 0 || index > slides.length) {
    throw new RangeError(
      `insertSlide: index ${index} out of range [0, ${slides.length}]`
    );
  }
  return [...slides.slice(0, index), slide, ...slides.slice(index)];
}

export function insertSlideAndStringify(
  slides: ParsedSlide[],
  index: number,
  slide: ParsedSlide
): string {
  return stringifySlides(insertSlide(slides, index, slide));
}

// ---------------------------------------------------------------------------
// Raw-text-level insert (surgical: other slides' bytes are untouched)
// ---------------------------------------------------------------------------

/**
 * Insert `slide` into `raw` so that it becomes the slide at position `index`
 * of the resulting deck — without regenerating the rest of the file.
 *
 * Uses the `startOffset` recorded on each slide by `parseSlides` to splice
 * the new slide directly into the source text: every byte of every other
 * slide (including YAML comments, formatting, and inline `---` in prose) is
 * preserved verbatim.
 *
 * `raw` is re-parsed internally to obtain fresh offsets. Indices refer to
 * the *raw* parse, not to an expanded `readSlides` view — if the deck contains
 * `src:` slides, the inserted slide will land before the placeholder, not
 * inside the referenced file.
 */
export function insertSlideInRaw(
  raw: string,
  index: number,
  slide: ParsedSlide
): string {
  const slides = parseSlides(raw);

  if (!Number.isInteger(index) || index < 0 || index > slides.length) {
    throw new RangeError(
      `insertSlideInRaw: index ${index} out of range [0, ${slides.length}]`
    );
  }

  const newText = stringifySlide(slide);
  if (newText.length === 0) return raw;

  // --- empty file: just write the slide ----------------------------------
  if (raw.length === 0) return newText + "\n";

  // --- prepend -----------------------------------------------------------
  if (index === 0) {
    // If raw already starts with `---`, that line becomes the separator
    // between the new slide and the original first slide.
    if (/^---(?:\r?\n|$)/.test(raw)) return newText + "\n\n" + raw;
    return newText + "\n\n---\n\n" + raw;
  }

  // --- append ------------------------------------------------------------
  if (index === slides.length) {
    return raw.trimEnd() + "\n\n---\n\n" + newText + "\n";
  }

  // --- middle: splice immediately before slide[index]'s opening `---` ----
  const target = slides[index];
  if (target.startOffset < 0) {
    throw new Error(
      "insertSlideInRaw: target slide has no offset (loaded via `src`?)"
    );
  }

  const insertPos = target.startOffset;
  const prefix = raw.slice(0, insertPos);
  const suffix = raw.slice(insertPos); // starts with `---\n`

  // Normalise blank lines around the insertion point so the result stays
  // readable, but never remove bytes that belong to other slides.
  const trailingNl = prefix.match(/\n*$/)?.[0] ?? "";
  const leadNl =
    trailingNl.length >= 2 ? "" : trailingNl.length === 1 ? "\n" : "\n\n";

  return (
    prefix +
    leadNl +
    "---\n\n" +
    newText +
    "\n\n" +
    suffix
  );
}


import {
  readSlidesWithLocations,
  type LocatedSlide,
} from "./slides.js";

export interface InsertResult {
  /** Absolute path of the file whose bytes were actually rewritten. */
  modifiedFile: string;
  /** The top-level deck file passed to `insertSlideInFile`. */
  parentFile: string;
  /** False when the slide was empty and nothing changed. */
  changed: boolean;
  /** Total resolved slide count of the parent deck after insertion. */
  slideCount: number;
  /** Resolved slides of the parent deck after insertion. */
  slides: LocatedSlide[];
}

/**
 * Insert `slide` at position `index` of `file`'s resolved deck.
 *
 * If `index` falls inside a `src:`-loaded region, the slide is written into
 * the *referenced* file at the correct local index, not into `file`. Only the
 * target file's bytes are modified — the rest of the deck, including other
 * `src:`-loaded files, is untouched.
 *
 * Appending (`index === slides.length`) targets the file containing the last
 * slide, so the new slide visually follows the last slide of the deck.
 */
export async function insertSlideInFile(
  file: string,
  index: number,
  slide: ParsedSlide
): Promise<InsertResult> {
  const parentFile = resolvePath(file);
  const slides = await readSlidesWithLocations(parentFile);

  if (!Number.isInteger(index) || index < 0 || index > slides.length) {
    throw new RangeError(
      `insertSlideInFile: index ${index} out of range [0, ${slides.length}]`
    );
  }

  // --- decide which file the new slide physically goes into ---------------
  let targetFile: string;
  let localIndex: number;

  if (index === slides.length) {
    if (slides.length === 0) {
      targetFile = parentFile;
      localIndex = 0;
    } else {
      const last = slides[slides.length - 1];
      targetFile = last.sourceFile;
      localIndex = last.sourceIndex + 1;
    }
  } else {
    const target = slides[index];
    targetFile = target.sourceFile;
    localIndex = target.sourceIndex;
  }

  // --- splice into the target file's raw ----------------------------------
  const raw = await fs.readFile(targetFile, "utf-8");
  const next = insertSlideInRaw(raw, localIndex, slide);
  const changed = next !== raw;

  if (changed) {
    await fs.writeFile(targetFile, next, "utf-8");
  }

  // Re-resolve the parent deck so callers see the new slide list.
  const resolved = await readSlidesWithLocations(parentFile);
  return {
    modifiedFile: targetFile,
    parentFile,
    changed,
    slideCount: resolved.length,
    slides: resolved,
  };
}
