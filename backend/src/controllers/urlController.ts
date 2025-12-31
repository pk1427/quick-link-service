import { Context } from "oak";
import { URLService } from "../services/urlService.ts";

export class URLController {
  static async shortenUrl(ctx: Context) {
    try {
      const body = ctx.request.body({ type: "json" });
      const { longUrl } = await body.value;
      
      if (!longUrl) {
        ctx.response.status = 400;
        ctx.response.body = { error: "longUrl is required" };
        return;
      }
      
      const result = URLService.createShortUrl(longUrl);
      
      if (result.error) {
        ctx.response.status = 400;
        ctx.response.body = { error: result.error };
        return;
      }
      
      ctx.response.status = 201;
      ctx.response.body = { 
        shortCode: result.shortCode,
        shortUrl: `${ctx.request.url.origin}/${result.shortCode}`
      };
    } catch (error) {
      console.error("Error in shortenUrl:", error);
      ctx.response.status = 500;
      ctx.response.body = { error: "Internal server error" };
    }
  }
  
  static async redirectUrl(ctx: Context) {
    try {
      const { code } = ctx.params;
      
      if (!code) {
        ctx.response.status = 400;
        ctx.response.body = { error: "Short code is required" };
        return;
      }
      
      const longUrl = URLService.getLongUrl(code);
      
      if (!longUrl) {
        ctx.response.status = 404;
        ctx.response.body = { error: "Short URL not found" };
        return;
      }
      
      ctx.response.redirect(longUrl);
    } catch (error) {
      console.error("Error in redirectUrl:", error);
      ctx.response.status = 500;
      ctx.response.body = { error: "Internal server error" };
    }
  }
}
