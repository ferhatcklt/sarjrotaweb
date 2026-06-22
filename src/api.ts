export const getSecureHeaders = (): Record<string, string> => {
  const secret = import.meta.env.VITE_API_SECRET || 'SarjRota-App-2026';
  const timestamp = Date.now().toString();
  const str = secret + timestamp;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  const token = `${timestamp}.${Math.abs(hash).toString(16)}`;

  return {
    'X-App-Token': token
  };
};

const originalFetch = window.fetch;

window.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
  // Sadece kendi API'mize giden isteklere token ekle (harici apilere veya lokal jsonlara gitmesin)
  const urlStr = typeof input === 'string' ? input : (input instanceof URL ? input.toString() : input.url);
  
  if (urlStr.includes('/api/')) {
    const headers = new Headers(init?.headers);
    const secureHeaders = getSecureHeaders();
    
    Object.entries(secureHeaders).forEach(([key, value]) => {
      headers.set(key, value);
    });

    return originalFetch(input, {
      ...init,
      headers
    });
  }
  
  return originalFetch(input, init);
};
