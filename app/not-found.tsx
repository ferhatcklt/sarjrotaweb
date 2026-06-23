'use client';

import Link from 'next/link';
import { Home, Map, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-gray-50 dark:bg-slate-950 px-4 text-center">
      <div className="relative mb-8">
        <div className="text-[180px] font-black text-slate-100 dark:text-slate-900 leading-none select-none">404</div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-blue-600 rounded-full p-6 shadow-2xl shadow-blue-500/30">
            <Map className="w-12 h-12 text-white" />
          </div>
        </div>
      </div>

      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
        Rota Bulunamadı
      </h1>
      <p className="text-slate-500 dark:text-slate-400 text-lg max-w-md mb-10">
        Aradığınız sayfa mevcut değil veya taşınmış olabilir. Belki de yanlış bir rota hesaplandı? 😄
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-md shadow-blue-500/30 hover:shadow-lg hover:shadow-blue-500/40 hover:-translate-y-0.5"
        >
          <Home size={18} /> Ana Sayfaya Dön
        </Link>
        <Link
          href="/harita"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold rounded-xl border border-slate-200 dark:border-slate-700 transition-all"
        >
          <Map size={18} /> Haritaya Git
        </Link>
      </div>
    </div>
  );
}
