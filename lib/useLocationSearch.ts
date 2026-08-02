'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export interface SearchResult {
  displayName: string;
  lat: number;
  lng: number;
  type: string;
}

/**
 * Nominatim (OpenStreetMap) geocoding hook.
 * Debounce ile arama yapar, Türkiye sınırlarında sonuç döner.
 */
export function useLocationSearch(debounceMs = 300) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const search = useCallback(async (q: string) => {
    if (q.trim().length < 2) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    // Önceki isteği iptal et
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setIsSearching(true);
    try {
      const params = new URLSearchParams({
        q,
        format: 'json',
        addressdetails: '1',
        limit: '6',
        countrycodes: 'tr',
        'accept-language': 'tr',
        viewbox: '25.5,35.8,44.8,42.1',
        bounded: '1',
      });

      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?${params}`,
        {
          signal: controller.signal,
          headers: { 'User-Agent': 'SarjRota/1.0 (sarjrota.com.tr)' },
        }
      );

      if (!res.ok) throw new Error('Nominatim API error');

      const data = await res.json();
      const mapped: SearchResult[] = data.map((item: any) => ({
        displayName: item.display_name,
        lat: parseFloat(item.lat),
        lng: parseFloat(item.lon),
        type: item.type || 'place',
      }));

      setResults(mapped);
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        console.error('Geocoding hatası:', err);
        setResults([]);
      }
    } finally {
      if (!controller.signal.aborted) {
        setIsSearching(false);
      }
    }
  }, []);

  // Debounced arama
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    if (query.trim().length < 2) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    timerRef.current = setTimeout(() => {
      search(query);
    }, debounceMs);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [query, debounceMs, search]);

  const clear = useCallback(() => {
    setQuery('');
    setResults([]);
    setIsSearching(false);
    abortRef.current?.abort();
  }, []);

  return { query, setQuery, results, isSearching, clear };
}
