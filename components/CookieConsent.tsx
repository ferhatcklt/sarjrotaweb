'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cookie, X } from 'lucide-react';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('sarjrota_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('sarjrota_cookie_consent', 'accepted');
    setVisible(false);
  };

  const reject = () => {
    localStorage.setItem('sarjrota_cookie_consent', 'rejected');
    (window as any)[`ga-disable-G-5RKDXVG4PP`] = true;
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6 animate-slide-up">
      <div className="max-w-4xl mx-auto bg-slate-900 border border-slate-700/60 backdrop-blur-xl rounded-2xl p-6 shadow-2xl shadow-black/40">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Cookie className="w-5 h-5 text-amber-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-white font-bold text-base mb-1.5">Çerez ve Gizlilik Bildirimi</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              ŞarjRota, deneyiminizi iyileştirmek ve site kullanımını analiz etmek amacıyla çerezler ve Google Analytics kullanır. 
              Kişisel verileriniz 3. taraflarla paylaşılmaz. Detaylar için{' '}
              <Link href="/gizlilik-politikasi" className="text-blue-400 underline underline-offset-2 hover:text-blue-300">Gizlilik Politikası</Link> ve{' '}
              <Link href="/kullanim-sartlari" className="text-blue-400 underline underline-offset-2 hover:text-blue-300">Kullanım Şartları</Link> sayfalarımızı inceleyebilirsiniz.
            </p>
          </div>
          <button onClick={() => setVisible(false)} className="text-slate-500 hover:text-slate-300 transition-colors flex-shrink-0">
            <X size={18} />
          </button>
        </div>
        <div className="flex items-center justify-end gap-3 mt-5">
          <button
            onClick={reject}
            className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-300 border border-slate-700 hover:bg-slate-800 transition-colors"
          >
            Sadece Zorunlular
          </button>
          <button
            onClick={accept}
            className="px-6 py-2.5 rounded-xl text-sm font-bold bg-white text-slate-900 hover:bg-slate-200 transition-colors shadow-lg"
          >
            Tümünü Kabul Et
          </button>
        </div>
      </div>
    </div>
  );
}
