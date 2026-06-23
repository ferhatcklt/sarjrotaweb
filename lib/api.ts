/**
 * API yardımcı fonksiyonları
 * 
 * window.fetch override yerine, API isteklerine güvenli token ekleyen
 * bir yardımcı fonksiyon kullanıyoruz. Bu Next.js SSR ile uyumludur.
 */

export const getSecureHeaders = (): Record<string, string> => {
  const secret = process.env.NEXT_PUBLIC_API_SECRET || 'SarjRota-App-2026';
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

/**
 * Kendi API'mize güvenli fetch yapan wrapper.
 * Sadece /api/ içeren URL'lere token ekler.
 */
export const apiFetch = async (
  url: string,
  init?: RequestInit
): Promise<Response> => {
  if (url.includes('/api/')) {
    const headers = new Headers(init?.headers);
    const secureHeaders = getSecureHeaders();
    Object.entries(secureHeaders).forEach(([key, value]) => {
      headers.set(key, value);
    });
    return fetch(url, { ...init, headers });
  }
  return fetch(url, init);
};
