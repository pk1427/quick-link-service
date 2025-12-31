import { Application } from "oak";
import { oakCors } from "cors";
import { initDatabase, closeDatabase } from "./db/database.ts";
import urlRoutes from "./routes/urlRoutes.ts";

const app = new Application();
const PORT = 8000;

initDatabase();

app.use(oakCors({
  origin: "*",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "X-Intern-Challenge"]
}));

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.error("Server error:", err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Internal server error" };
  }
});

app.use(urlRoutes.routes());
app.use(urlRoutes.allowedMethods());

const controller = new AbortController();
const { signal } = controller;

Deno.addSignalListener("SIGINT", () => {
  console.log("\n🛑 Shutting down gracefully...");
  closeDatabase();
  controller.abort();
  Deno.exit();
});

console.log(`🚀 Server running on http://localhost:${PORT}`);
await app.listen({ port: PORT, signal });
