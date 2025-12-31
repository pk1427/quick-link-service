import { useState } from 'react';
import { shortenUrl } from '../services/api';

export default function URLShortener() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setShortUrl('');
    setLoading(true);

    try {
      const result = await shortenUrl(longUrl);
      setShortUrl(result.shortUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>⚡ Quick-Link Service</h1>
        <p style={styles.subtitle}>Shorten your URLs instantly</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            placeholder="Enter your long URL here..."
            style={styles.input}
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !longUrl.trim()}
            style={{
              ...styles.button,
              ...(loading || !longUrl.trim() ? styles.buttonDisabled : {}),
            }}
          >
            {loading ? '⏳ Shortening...' : '🔗 Shorten URL'}
          </button>
        </form>

        {error && (
          <div style={styles.error}>
            <strong>❌ Error:</strong> {error}
          </div>
        )}

        {shortUrl && (
          <div style={styles.success}>
            <p style={styles.successTitle}>✅ Success! Your short URL:</p>
            <div style={styles.urlBox}>
              <code style={styles.urlText}>{shortUrl}</code>
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.link}
              >
                🔗 Open in new tab
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  card: {
    background: 'white',
    borderRadius: '16px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    padding: '40px',
    maxWidth: '600px',
    width: '100%',
  },
  title: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#1a202c',
    marginBottom: '8px',
    textAlign: 'center' as const,
  },
  subtitle: {
    color: '#718096',
    textAlign: 'center' as const,
    marginBottom: '32px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
  },
  input: {
    padding: '16px',
    fontSize: '16px',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  button: {
    padding: '16px',
    fontSize: '16px',
    fontWeight: '600',
    color: 'white',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  buttonDisabled: {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
  error: {
    marginTop: '20px',
    padding: '16px',
    background: '#fed7d7',
    color: '#c53030',
    borderRadius: '8px',
    border: '1px solid #fc8181',
  },
  success: {
    marginTop: '20px',
    padding: '20px',
    background: '#c6f6d5',
    borderRadius: '8px',
    border: '1px solid #9ae6b4',
  },
  successTitle: {
    color: '#22543d',
    fontWeight: '600',
    marginBottom: '12px',
  },
  urlBox: {
    background: 'white',
    padding: '16px',
    borderRadius: '6px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
  },
  urlText: {
    color: '#2d3748',
    fontSize: '14px',
    wordBreak: 'break-all' as const,
  },
  link: {
    display: 'inline-block',
    padding: '8px 16px',
    background: '#667eea',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '6px',
    textAlign: 'center' as const,
    fontWeight: '600',
    transition: 'background 0.2s',
  },
};