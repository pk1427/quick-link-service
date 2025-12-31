import { getDatabase } from "../db/database.ts";
import { generateShortCode, isValidUrl, isBlockedDomain } from "../utils/validation.ts";

export class URLService {
  static createShortUrl(longUrl: string): { shortCode: string; error?: string } {
    if (!isValidUrl(longUrl)) {
      return { shortCode: "", error: "Invalid URL format" };
    }
    
    if (isBlockedDomain(longUrl)) {
      return { shortCode: "", error: "This domain is blocked and cannot be shortened" };
    }
    
    const db = getDatabase();
    let shortCode = generateShortCode();
    let attempts = 0;
    const maxAttempts = 10;
    
    while (attempts < maxAttempts) {
      try {
        db.query("INSERT INTO urls (short_code, long_url) VALUES (?, ?)", [shortCode, longUrl]);
        return { shortCode };
      } catch (error) {
        if (error instanceof Error && error.message.includes("UNIQUE")) {
          shortCode = generateShortCode();
          attempts++;
        } else {
          throw error;
        }
      }
    }
    
    return { shortCode: "", error: "Failed to generate unique short code" };
  }
  
  static getLongUrl(shortCode: string): string | null {
    const db = getDatabase();
    const result = db.query("SELECT long_url FROM urls WHERE short_code = ?", [shortCode]);
    
    if (result.length > 0) {
      return result[0][0] as string;
    }
    
    return null;
  }
}
