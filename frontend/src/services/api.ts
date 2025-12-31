const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const INTERN_NAME = 'Debajyoti'; // CHANGE THIS TO YOUR NAME

export interface ShortenResponse {
  shortCode: string;
  shortUrl: string;
}

export interface ErrorResponse {
  error: string;
}

export async function shortenUrl(longUrl: string): Promise<ShortenResponse> {
  const response = await fetch(`${API_BASE_URL}/shorten`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Intern-Challenge': INTERN_NAME,
    },
    body: JSON.stringify({ longUrl }),
  });

  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw new Error(error.error || 'Failed to shorten URL');
  }

  return response.json();
}
