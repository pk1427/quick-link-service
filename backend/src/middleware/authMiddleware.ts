import { Context, Next } from "oak";

export async function authMiddleware(ctx: Context, next: Next) {
  const challengeHeader = ctx.request.headers.get("X-Intern-Challenge");
  
  if (!challengeHeader) {
    ctx.response.status = 401;
    ctx.response.body = { error: "Unauthorized: Missing X-Intern-Challenge header" };
    return;
  }
  
  await next();
}
