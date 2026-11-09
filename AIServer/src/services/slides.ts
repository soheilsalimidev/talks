import { resolve as resolvePath, dirname } from "node:path";
import fs from "node:fs/promises";
import { load as loadYaml } from "js-yaml";

import { logger } from "../logger.js";

const SEPARATOR_LINE = /^---\s*$/;

export interface ParsedSlide {
  content: string;
  frontmatter: Record<string, unknown> | null;
  /**
   * Byte offset in the source `raw` where this slide's block starts — i.e. the
   * position of the `---` that opens its frontmatter (or, for a slide with no
   * frontmatter, the `---` that precedes its first content segment; `0` for
   * the very first slide of a deck that begins with content).
   * `-1` means "not tied to a single source string" (e.g. loaded via `src:`).
   */
  startOffset: number;
  /**
   * Byte offset in the source `raw` where this slide's block ends (exclusive).
   * Equal to `startOffset` of the next slide, or `raw.length` for the last.
   * `-1` for slides loaded via `src:` (their offsets live in the child file).
   */
  endOffset: number;
}

function tryParseFrontmatter(segment: string): Record<string, unknown> | null {
  if (!segment) return null;
  try {
    const parsed = loadYaml(segment);
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return parsed as Record<string, unknown>;
    }
  } catch (e) {
    logger.info({ err: e }, "Segment is not valid frontmatter YAML");
  }
  return null;
}

/**
 * Pure parse: file text → slides, with byte offsets pointing into `raw`.
 * No file I/O, no `src:` resolution.
 */
export function parseSlides(raw: string): ParsedSlide[] {
  // --- split into segments, recording where each `---` line begins ---------
  const segments: string[] = [];
  const separatorPositions: number[] = [];

  let pos = 0;
  let current = "";

  while (pos < raw.length) {
    const nl = raw.indexOf("\n", pos);
    const lineEnd = nl === -1 ? raw.length : nl;
    const line = raw.slice(pos, lineEnd);

    if (SEPARATOR_LINE.test(line)) {
      segments.push(current);
      separatorPositions.push(pos);
      current = "";
      pos = nl === -1 ? raw.length : nl + 1;
    } else {
      if (current) current += "\n";
      current += line;
      pos = nl === -1 ? raw.length : nl + 1;
    }
  }
  segments.push(current);

  // For a slide whose "owning segment" is `segIdx`, the `---` that opens it
  // lives at `separatorPositions[segIdx - 1]` (or 0 if segIdx === 0).
  const startOffsetForSegment = (segIdx: number): number =>
    segIdx === 0 ? 0 : separatorPositions[segIdx - 1];

  // --- walk segments → slides ---------------------------------------------
  const slides: ParsedSlide[] = [];
  let pendingFrontmatter: Record<string, unknown> | null = null;
  let pendingStartSegment = -1;

  const emit = (
    content: string,
    fm: Record<string, unknown> | null,
    segIdx: number
  ) => {
    slides.push({
      content,
      frontmatter: fm,
      startOffset: startOffsetForSegment(segIdx),
      endOffset: -1, // filled below
    });
  };

  for (let segIdx = 0; segIdx < segments.length; segIdx++) {
    const trimmed = segments[segIdx].trim();

    if (!trimmed) {
      if (pendingFrontmatter !== null) {
        emit("", pendingFrontmatter, pendingStartSegment);
        pendingFrontmatter = null;
        pendingStartSegment = -1;
      }
      continue;
    }

    const asFm = tryParseFrontmatter(trimmed);
    if (asFm !== null) {
      if (pendingFrontmatter !== null) {
        emit("", pendingFrontmatter, pendingStartSegment);
      }
      pendingFrontmatter = asFm;
      pendingStartSegment = segIdx;
      continue;
    }

    const startSeg =
      pendingFrontmatter !== null ? pendingStartSegment : segIdx;
    emit(trimmed, pendingFrontmatter, startSeg);
    pendingFrontmatter = null;
    pendingStartSegment = -1;
  }

  if (pendingFrontmatter !== null) {
    emit("", pendingFrontmatter, pendingStartSegment);
  }

  // --- fill endOffset: each slide ends where the next begins ---------------
  for (let i = 0; i < slides.length; i++) {
    slides[i].endOffset =
      i + 1 < slides.length ? slides[i + 1].startOffset : raw.length;
  }

  return slides;
}

/**
 * If `slide` is a `src:`-only slide, read the referenced file (relative to
 * `baseDir`) and return the slides it contains. One level only.
 */
async function resolveSrcSlide(
  slide: ParsedSlide,
  baseDir: string
): Promise<ParsedSlide[]> {
  const src = slide.frontmatter?.src;
  const isSrcOnly = typeof src === "string" && slide.content === "";
  if (!isSrcOnly) return [slide];

  const childPath = resolvePath(baseDir, src as string);

  try {
    const childRaw = await fs.readFile(childPath, "utf-8");
    logger.info({ childPath }, "Loaded slide via `src`");
    // Child offsets refer to the child file, not the parent raw, so mark
    // them as unbound (-1). Splicing such slides is not supported.
    return parseSlides(childRaw).map((s) => ({
      ...s,
      startOffset: -1,
      endOffset: -1,
    }));
  } catch (e) {
    logger.info(
      { err: e, src: childPath },
      "Failed to load slide `src`; keeping placeholder"
    );
    return [slide];
  }
}

export interface LocatedSlide extends ParsedSlide {
  /** Absolute path of the file this slide's bytes live in. */
  sourceFile: string;
  /** Index of this slide within `sourceFile`'s own `parseSlides()` output. */
  sourceIndex: number;
}

export async function readSlidesWithLocations(
  file: string
): Promise<LocatedSlide[]> {
  const filePath = resolvePath(file);
  logger.info({ filePath }, "Reading Slidev file");

  const raw = await fs.readFile(filePath, "utf-8");
  const parsed = parseSlides(raw);
  const baseDir = dirname(filePath);

  const slides: LocatedSlide[] = [];

  for (let i = 0; i < parsed.length; i++) {
    const slide = parsed[i];
    const src = slide.frontmatter?.src;
    const isSrcOnly = typeof src === "string" && slide.content === "";

    if (!isSrcOnly) {
      slides.push({ ...slide, sourceFile: filePath, sourceIndex: i });
      continue;
    }

    const childPath = resolvePath(baseDir, src as string);

    try {
      const childRaw = await fs.readFile(childPath, "utf-8");
      logger.info({ childPath }, "Loaded slide via `src`");
      const childSlides = parseSlides(childRaw);
      for (let j = 0; j < childSlides.length; j++) {
        slides.push({
          ...childSlides[j],
          sourceFile: childPath,
          sourceIndex: j,
        });
      }
    } catch (e) {
      logger.info(
        { err: e, src: childPath },
        "Failed to load slide `src`; keeping placeholder"
      );
      slides.push({ ...slide, sourceFile: filePath, sourceIndex: i });
    }
  }

  logger.info(
    { filePath, slideCount: slides.length },
    "File parsed into slides"
  );
  return slides;
}

/**
 * Backwards-compatible `readSlides`. Slides loaded via `src:` report `-1`
 * offsets (their real offsets point into the child file); callers that need
 * offsets or source-file info should use `readSlidesWithLocations`.
 */
export async function readSlides(file: string): Promise<ParsedSlide[]> {
  const filePath = resolvePath(file);
  const located = await readSlidesWithLocations(filePath);
  return located.map((s) => ({
    content: s.content,
    frontmatter: s.frontmatter,
    startOffset: s.sourceFile === filePath ? s.startOffset : -1,
    endOffset: s.sourceFile === filePath ? s.endOffset : -1,
  }));
}
