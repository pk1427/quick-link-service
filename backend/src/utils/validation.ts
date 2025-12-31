export function isValidUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === "http:" || urlObj.protocol === "https:";
  } catch {
    return false;
  }
}

export function isBlockedDomain(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname === "blocked.com" || urlObj.hostname === "www.blocked.com";
  } catch {
    return false;
  }
}

export function generateShortCode(): string {
  const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  
  for (let i = 0; i < 5; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  
  const finalCode = code + code.length;
  
  return finalCode;
}
