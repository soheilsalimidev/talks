import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";

// Helper for formatted, timestamped logging
const log = (type, message, data = null) => {
  const timestamp = new Date().toISOString();
  const prefix = `[${timestamp}] [${type}]`;
  if (data) {
    console.log(prefix, message, data);
  } else {
    console.log(prefix, message);
  }
};

// Minifier that preserves <pre>, <textarea>, <script>, <style>, AND HTML comments (for presenter notes)
function minifyHTML(html) {
  const blocks = [];
  const M = '\u0000'; // placeholder marker

  // 1. Protect whitespace-sensitive blocks AND HTML comments
  html = html.replace(
    /<(pre|textarea|script|style)\b[^>]*>[\s\S]*?<\/\1>|<!--[\s\S]*?-->/gi,
    (m) => `${M}${blocks.push(m) - 1}${M}`
  );

  // 2. Minify the rest
  html = html
    .replace(/>\s+</g, '><')                // remove whitespace between tags
    .replace(/\s+/g, ' ')                   // collapse runs of whitespace
    .trim();

  // 3. Restore protected blocks
  return html.replace(new RegExp(`${M}(\\d+)${M}`, 'g'), (_, i) => blocks[i]);
}

function getSystemPrompt(question, precedingSlide) {
  return `You are an expert Slidev presentation designer. Your task is to generate **1 to 2 slides** that directly answer a specific question, designed to be seamlessly placed in the middle of an ongoing presentation.

### Context
- **Question to Answer**: ${question}

### Preceding Slide Context
The slide immediately before the new slides you generate contains the following content. Ensure your generated slides flow naturally from this:
\`\`\`markdown
${precedingSlide}
\`\`\`

### Design & Formatting Rules (Strictly Follow)
1. **Slide Count**: Generate 1 to 2 slides maximum. Do not include title slides, transitions, or concluding slides. If generating 2 slides, separate them with \`\\n---\\n\`.
2. **NO Title Heading**: Do NOT output a \`# Title\` or \`## Title\`. The server will automatically prepend the question as the title. Start directly with the layout HTML.
3. **Visual Structure Over Plain Text**: Do not use plain Markdown bullet points. Use structured HTML / Tailwind CSS layouts (e.g., \`<div flex="~ col gap-4">\`, \`bg-blue:10\`, \`border="~ gray/50 rounded-lg"\`, \`p4\`) to create polished, card-based or segmented compositions.
4. **Progressive Disclosure**: Use \`v-click\` or \`<v-clicks>\` to reveal information step-by-step. Guide the audience's attention logically.
5. **High Signal, Low Noise**: Rewrite the answer to be concise, scannable, and impactful. No long paragraphs. Focus on visual hierarchy.
6. **Intentional Design**: Use appropriate sizing, subtle background colors, and icons (e.g., \`i-solar:*-broken\`) to make the slide feel intentionally designed, not auto-generated.
7. **Presenter Notes**: At the very end of the slide content, add detailed speaker notes enclosed in an HTML comment block \`<!-- ... -->\`. The notes should explain the narrative, elaborate on the visual points, and guide the presenter on what to say during each \`v-click\` reveal.

### Theme Reference Style
Mirror this structural pattern:
\`\`\`html
<div flex="~ col gap-4" py6>
  <div v-click bg-blue:10 border="~ gray/50 rounded-lg" p4>
    <div flex="~ items-center gap-2" mb2>
      <div class="i-solar:lightbulb-broken text-xl text-blue-4"></div>
      <span font-bold text-lg text-blue-4>Direct Answer / Core Insight</span>
    </div>
    <div ml2 text-gray-700>
      <v-clicks>
        <p>• First supporting point, concise and scannable.</p>
        <p>• Second supporting point or contextual detail.</p>
      </v-clicks>
    </div>
  </div>
  
  <div v-click bg-gray:10 border="~ gray/50 rounded-lg" p4>
    <div flex="~ items-center gap-2" mb2>
      <div class="i-solar:chart-broken text-xl text-gray-4"></div>
      <span font-bold text-lg>Supporting Evidence or Next Step</span>
    </div>
    <div ml2 text-gray-700>
      <p>Brief elaboration or placeholder for an image/diagram.</p>
    </div>
  </div>
</div>

<!--
Presenter Notes:
- Click 1: Introduce the core concept and direct answer.
- Click 2: Elaborate on the first supporting point (explain the 'why').
- Click 3: Transition to the evidence and explain the second point.
-->
\`\`\`

### Output Requirement
Output **only** the valid Slidev markdown for the 1 to 2 slides. Do not add explanations, apologies, or conversational text outside the markdown.`;
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => (data += chunk));
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });
}

function send(res, status, body) {
  const json = JSON.stringify(body);
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(json),
    "Access-Control-Allow-Origin": "*",
  });
  res.end(json);
}

const server = http.createServer(async (req, res) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    log("CORS", "Handling OPTIONS preflight request");
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Max-Age": "86400",
    });
    return res.end();
  }

  if (req.method !== "POST" || req.url !== "/api/generate") {
    log("WARN", `Rejected request: ${req.method} ${req.url}`);
    return send(res, 404, { error: "Not found" });
  }

  log("INFO", `Received POST request to ${req.url}`);

  try {
    const raw = await readBody(req);
    const { question, slideNum } = JSON.parse(raw || "{}");

    log("INFO", `Parsed request: slideNum=${slideNum}, question="${question.substring(0, 50)}..."`);

    if (!question) {
      log("WARN", "Request missing 'question'");
      return send(res, 400, { error: "No question" });
    }
    if (typeof slideNum !== "number" || slideNum < 0) {
      log("WARN", `Invalid slideNum: ${slideNum}`);
      return send(res, 400, { error: "Invalid slideNum" });
    }

    // 1. Read the slidev file FIRST to get context
    const filePath = path.join(process.cwd(), "pages", "2-peripheral.md");
    log("INFO", `Reading Slidev file: ${filePath}`);
    
    const content = await fs.readFile(filePath, "utf-8");
    const slides = content.split("\n---\n");
    log("INFO", `File split into ${slides.length} slides`);

    if (slideNum >= slides.length) {
      log("ERROR", `slideNum ${slideNum} out of range (max ${slides.length - 1})`);
      return send(res, 400, {
        error: `slideNum ${slideNum} out of range (max ${slides.length - 1})`,
      });
    }

    const precedingSlide = slides[slideNum];
    const systemPrompt = getSystemPrompt(question, precedingSlide);
    log("INFO", "System prompt generated with preceding slide context");

    // 2. Call the LLM
    log("INFO", "Calling LLM API (deepseek-v4.1-flash)...");
    const response = await fetch("https://api.avalai.ir/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek-v4.1-flash",
        messages: [{ role: "system", content: systemPrompt }],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      log("ERROR", `LLM API request failed: ${response.status} - ${errText}`);
      return send(res, response.status, { error: errText });
    }

    const data = await response.json();
    let generatedContent = data.choices[0].message.content || "";
    log("INFO", `LLM responded successfully. Content length: ${generatedContent.length} chars`);

    // Clean up markdown code blocks if the model adds them
    generatedContent = generatedContent
      .replace(/^```(?:markdown|html)?\s*/i, "")
      .replace(/```$/i, "")
      .trim();

    // 3. Minify and format
    const minifiedHtml = minifyHTML(generatedContent);
    const finalSlideContent = `\n # ${question}\n\n${minifiedHtml}`;
    log("INFO", "Content minified and title prepended");

    // 4. Insert AFTER slideNum (0-indexed)
    slides.splice(slideNum + 1, 0, finalSlideContent);

    // 5. Write back to file
    const updated = slides.join("\n---\n");
    log("INFO", `Writing updated content back to ${filePath}`);
    await fs.writeFile(filePath, updated, "utf-8");
    log("INFO", "File write successful");

    send(res, 200, {
      html: finalSlideContent,
      insertedAfter: slideNum,
      message: "Successfully generated, minified, and inserted slides.",
    });
    log("INFO", "Response sent to client");

  } catch (e) {
    log("ERROR", "Unhandled server error", e);
    send(res, 500, { error: e.message });
  }
});

const port = process.env.PORT || 3111;
server.listen(port, () =>
  log("INFO", `Server running on http://localhost:${port}`)
);
