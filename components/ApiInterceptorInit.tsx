'use client';

import { useEffect } from 'react';
import { getSecureHeaders } from '@/lib/api';

/**
 * window.fetch'e API token interceptor'ı ekler.
 * Sadece client-side çalışır, SSR'da güvenle atlanır.
 */
export default function ApiInterceptorInit() {
  useEffect(() => {
    const originalFetch = window.fetch;

    window.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
      const urlStr = typeof input === 'string'
        ? input
        : (input instanceof URL ? input.toString() : (input as Request).url);

      if (urlStr.includes('/api/')) {
        const headers = new Headers(init?.headers);
        const secureHeaders = getSecureHeaders();
        Object.entries(secureHeaders).forEach(([key, value]) => {
          headers.set(key, value);
        });
        return originalFetch(input, { ...init, headers });
      }

      return originalFetch(input, init);
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, []);

  return null;
}
