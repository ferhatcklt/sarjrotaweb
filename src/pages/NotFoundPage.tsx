import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ZapOff, MapPin, ChevronLeft, BatteryMedium } from 'lucide-react';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#030712] font-['Inter'] flex flex-col relative overflow-hidden selection:bg-red-500/30">
      <SEO 
        title="Sayfa Bulunamadı - 404 | ŞarjRota" 
        description="Aradığınız sayfa bulunamadı. ŞarjRota anasayfasına dönerek elektrikli araç rotanızı planlamaya devam edebilirsiniz."
      />
      
      {/* ── ANIMATED BACKGROUND ── */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <motion.div
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full bg-red-600/10 blur-[120px]"
        />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 relative z-10 mt-16 lg:mt-0">
        
        {/* ── CREATIVE 404 VISUAL ── */}
        <div className="relative w-full max-w-md h-64 flex items-center justify-center mb-8 perspective-1000">
          
          {/* Glowing 404 Background Text */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.05, scale: 1 }}
            transition={{ duration: 1 }}
            className="absolute text-[160px] sm:text-[200px] font-black text-white select-none z-0 tracking-tighter"
          >
            404
          </motion.div>

          <div className="relative z-10 w-full flex items-center justify-center gap-2 sm:gap-4">
            {/* The Charging Station Outlet (Left) */}
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", bounce: 0.4, duration: 0.8 }}
              className="relative"
            >
              <div className="w-20 h-28 sm:w-24 sm:h-32 bg-slate-900 rounded-2xl border-4 border-slate-800 flex flex-col items-center justify-center gap-3 shadow-2xl relative overflow-hidden">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-950 border-2 border-slate-700 shadow-inner"></div>
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-950 border-2 border-slate-700 shadow-inner"></div>
                {/* Error LED */}
                <motion.div 
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.9)]"
                />
              </div>
            </motion.div>

            {/* The Snapped Cable / Disconnected Plug (Right) */}
            <motion.div 
              initial={{ x: -20, rotate: 0 }}
              animate={{ x: [0, 40, 35], y: [0, 30, 25], rotate: [0, 15, 12] }}
              transition={{ duration: 1.5, type: 'spring', bounce: 0.5, delay: 0.2 }}
              className="relative flex items-center"
            >
              {/* Plug Head */}
              <div className="w-16 h-20 sm:w-20 sm:h-24 bg-slate-800 rounded-xl border-2 border-slate-700 relative z-10 flex flex-col items-center justify-center shadow-xl">
                 <div className="absolute -left-3 sm:-left-4 top-4 w-3 sm:w-4 h-4 bg-slate-500 rounded-l-md border-y border-l border-slate-600"></div>
                 <div className="absolute -left-3 sm:-left-4 bottom-4 w-3 sm:w-4 h-4 bg-slate-500 rounded-l-md border-y border-l border-slate-600"></div>
                 <ZapOff className="text-slate-500 w-8 h-8 opacity-50" />
              </div>
              {/* Dangling Wire */}
              <div className="w-16 sm:w-24 h-4 bg-slate-700 relative -ml-2 rounded-r-full overflow-hidden border-y border-r border-slate-600">
                {/* Electric Sparks */}
                <motion.div 
                  animate={{ opacity: [0, 1, 0, 1, 0], x: [0, 5, 0, -5, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                  className="absolute left-0 top-0 bottom-0 w-3 bg-yellow-400 blur-[1px]"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── TEXT CONTENT ── */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center max-w-lg z-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs sm:text-sm font-semibold tracking-wide mb-6">
            <BatteryMedium className="w-4 h-4" />
            Bağlantı Koptu / Menzil Dışı
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Rotadan Çıktınız
          </h1>
          
          <p className="text-slate-400 text-base md:text-lg mb-10 leading-relaxed font-light">
            Görünüşe göre menzil dışında bir sayfaya ulaştınız. Bataryanız tamamen bitmeden haritaya dönüp güvenli bir rota çizelim.
          </p>
          
          <Link
            to="/harita"
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-slate-950 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-blue-500/20 overflow-hidden"
          >
            <MapPin className="w-5 h-5 relative z-10 group-hover:-translate-y-1 group-hover:text-blue-600 transition-transform duration-300" />
            <span className="relative z-10">Rotayı Yeniden Hesapla</span>
          </Link>
          
          <div className="mt-8">
            <Link to="/" className="text-sm text-slate-500 hover:text-white transition-colors flex items-center justify-center gap-1">
              <ChevronLeft className="w-4 h-4" /> Anasayfaya Dön
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="relative z-20 border-t border-slate-800/50 bg-[#02040a]">
        <Footer />
      </div>
    </div>
  );
}
