const PLACEHOLDER = "\u0000";

/**
 * Minifies HTML while preserving whitespace-sensitive blocks
 * (<pre>, <textarea>, <script>, <style>) and HTML comments
 * (used for Slidev presenter notes).
 */
export function minifyHTML(html: string): string {
  const blocks: string[] = [];

  // 1. Protect sensitive blocks + comments
  html = html.replace(
    /<(pre|textarea|script|style)\b[^>]*>[\s\S]*?<\/\1>|<!--[\s\S]*?-->/gi,
    (m) => `${PLACEHOLDER}${blocks.push(m) - 1}${PLACEHOLDER}`
  );

  // 2. Minify the rest
  html = html
    .replace(/>\s+</g, "><")
    .replace(/\s+/g, " ")
    .trim();

  // 3. Restore protected blocks
  return html.replace(
    new RegExp(`${PLACEHOLDER}(\\d+)${PLACEHOLDER}`, "g"),
    (_, i) => blocks[Number(i)]
  );
}
