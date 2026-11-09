
import Fastify from "fastify";
import cors from "@fastify/cors";
import { parseArgs } from "node:util";
import { pathToFileURL } from "node:url";          // ← new
import { logger } from "./logger.js";
import './load-env.js';
import { generateRoute } from "./routes/generate.js";
import { voiceRoutes } from "./routes/voice-route.js";


export async function buildServer(slidesFile: string) {   // ← added `export`
  const app = Fastify({ logger: false });

  await app.register(cors, {
    origin: "*",
    methods: ["POST", "GET", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    maxAge: 86400,
  });

  app.addHook("onRequest", async (req) => {
    logger.info(`Received ${req.method} request to ${req.url}`);
  });

  app.setErrorHandler((error, req, reply) => {
    const status = (error as Error & { statusCode?: number }).statusCode ?? 500;
    logger.error(`Error on ${req.method} ${req.url}: ${error.message}`);
    reply.status(status).send({ error: error.message });
  });

  app.setNotFoundHandler((req, reply) => {
    logger.warn(`Rejected request: ${req.method} ${req.url}`);
    reply.status(404).send({ error: "Not found" });
  });

  await app.register(generateRoute, { slidesFile });
  await app.register(voiceRoutes);

  return app;
}

async function start() {
  const { values } = parseArgs({
    options: {
      slides: { type: "string", short: "s" },
      port: { type: "string", short: "p" },
    },
    allowPositionals: false,
  });

  if (!values.slides) {
    logger.info("Missing required argument: --slides <path/to/file.md>");
    logger.info("Usage: npm run dev -- --slides pages/2-peripheral.md [--port 3111]");
    process.exit(1);
  }

  const slidesFile = values.slides;
  const port = Number(values.port ?? process.env.PORT) || 3111;

  logger.info(`Slides file: ${slidesFile}`);
  logger.info(`Port: ${port}`);

  const app = await buildServer(slidesFile);

  try {
    await app.listen({ port, host: "0.0.0.0" });
    logger.info(`Server running on http://localhost:${port}`);
  } catch (err) {
    logger.error("Failed to start server");
    process.exit(1);
  }
}

// ← new: only auto-start when executed directly, not when imported.
const isMain =
  typeof process.argv[1] === "string" &&
  import.meta.url === pathToFileURL(process.argv[1]).href;

if (isMain) {
  start();
}
