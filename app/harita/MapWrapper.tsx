'use client';

import dynamic from 'next/dynamic';

const MapPageClient = dynamic(() => import('./MapPageClient'), { 
  ssr: false, 
  loading: () => (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-slate-900 transition-colors">
      <div className="w-12 h-12 border-4 border-blue-200 dark:border-blue-900 border-t-blue-600 dark:border-t-blue-500 rounded-full animate-spin mb-4"></div>
      <p className="text-slate-600 dark:text-slate-400 font-medium font-sans animate-pulse">Harita yükleniyor, lütfen bekleyin...</p>
    </div>
  )
});

export default function MapWrapper() {
  return <MapPageClient />;
}
