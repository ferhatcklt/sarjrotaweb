import { Link } from 'react-router-dom';
import { Zap, MapPin, BatteryCharging, ChevronRight, Activity, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function LandingPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative w-full h-auto md:h-[calc(100vh-64px)] bg-[#030712] overflow-hidden selection:bg-brand-500/30">
      
      {/* ── ARKA PLAN: Dinamik & Fütüristik Mesh ── */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
        {/* CSS Grid Pattern */}
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }}></div>
        
        {/* Hareketli Gradient Orb'lar */}
        <motion.div 
          animate={{ 
            x: [0, 50, -50, 0], 
            y: [0, -50, 50, 0],
            scale: [1, 1.2, 0.8, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/4 -left-1/4 w-[60vw] h-[60vw] rounded-full bg-blue-600/20 blur-[120px]"
        />
        <motion.div 
          animate={{ 
            x: [0, -70, 70, 0], 
            y: [0, 70, -70, 0],
            scale: [1, 0.9, 1.3, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/4 -right-1/4 w-[50vw] h-[50vw] rounded-full bg-sky-500/10 blur-[120px]"
        />
      </div>

      {/* ── BENTO GRID KAPSAYICISI ── */}
      <div className="relative z-10 w-full h-full max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8 flex flex-col justify-center">
        
        <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-3 gap-4 lg:gap-6 h-full min-h-[800px] md:min-h-0">
          
          {/* 1. ANA HERO KUTUSU (Sol Üst - 7 Sütun, 2 Satır) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ 
              transform: `perspective(1000px) rotateY(${mousePosition.x * 0.1}deg) rotateX(${-mousePosition.y * 0.1}deg)` 
            }}
            className="md:col-span-7 md:row-span-2 relative group rounded-[2rem] bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-xl border border-slate-800/60 p-8 lg:p-12 overflow-hidden flex flex-col justify-center hover:border-slate-700/80 transition-colors"
          >
            {/* İç Işık / Glow */}
            <div className="absolute -inset-px bg-gradient-to-r from-blue-500/20 to-sky-400/20 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wide mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                Sistem Aktif v2.0
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6">
                Elektrikli araç rotanızı <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                  yapay zeka yönetsin.
                </span>
              </h1>
              
              <p className="text-slate-400 text-lg lg:text-xl max-w-xl mb-10 leading-relaxed font-light">
                ŞarjRota; topografya, hava durumu ve araç batarya profilinizi analiz ederek durmanız gereken ideal noktaları ve maliyeti saniyeler içinde hesaplar.
              </p>

              <Link
                to="/harita"
                className="group/btn relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-slate-950 rounded-full font-bold text-lg hover:scale-105 transition-all duration-300"
              >
                Kalkışa Hazırlan
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover/btn:bg-slate-200 transition-colors">
                  <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            </div>
          </motion.div>

          {/* 2. GÖRSEL / HARİTA SİMÜLASYONU KUTUSU (Sağ Üst - 5 Sütun, 2 Satır) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-5 md:row-span-2 relative rounded-[2rem] bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 overflow-hidden flex items-center justify-center group"
          >
            {/* CSS Soyut Harita Arkaplanı */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -inset-4 opacity-20" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.2) 1px, transparent 0)',
                backgroundSize: '24px 24px'
              }}></div>
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl"></div>
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/80"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-transparent"></div>
            
            {/* Animasyonlu Rota Çizgisi ve Noktalar */}
            <svg className="absolute inset-0 w-full h-full z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
              <motion.path 
                d="M 10 80 Q 30 20 50 50 T 90 20" 
                fill="none" 
                stroke="url(#gradient)" 
                strokeWidth="0.8"
                strokeDasharray="4 2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </svg>

            {/* Yüzen Rota Bilgi Kartı */}
            <motion.div 
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-20 bg-slate-950/80 backdrop-blur-xl border border-slate-700/50 p-6 rounded-2xl shadow-2xl w-3/4 max-w-sm"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Canlı Rota</span>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <div className="text-white text-sm font-bold">İstanbul</div>
                    <div className="text-slate-500 text-xs">Başlangıç • %100 Şarj</div>
                  </div>
                </div>
                <div className="ml-4 w-0.5 h-6 bg-slate-800"></div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400">
                    <Zap size={16} />
                  </div>
                  <div>
                    <div className="text-white text-sm font-bold">Bolu Dağı Tesisi</div>
                    <div className="text-slate-500 text-xs">+35 dk Şarj Molası</div>
                  </div>
                </div>
                <div className="ml-4 w-0.5 h-6 bg-slate-800"></div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <div className="text-white text-sm font-bold">Ankara</div>
                    <div className="text-slate-500 text-xs">Varış • %24 Şarj</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* 3. MALIYET KUTUSU (Alt Sol - 3 Sütun, 1 Satır) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-3 md:row-span-1 rounded-[2rem] bg-gradient-to-br from-emerald-900/20 to-emerald-950/40 backdrop-blur-xl border border-emerald-800/30 p-6 flex flex-col justify-between relative group overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-colors"></div>
            <div className="flex items-center gap-2 text-emerald-400 font-medium text-sm z-10">
              <Activity size={18} />
              Yakıt Tasarrufu
            </div>
            <div className="z-10 mt-4">
              <div className="text-slate-400 text-xs mb-1">Tahmini Ortalama Maliyet</div>
              <div className="text-3xl lg:text-4xl font-bold text-white tracking-tight">₺0,95<span className="text-lg text-emerald-500 font-medium">/km</span></div>
            </div>
          </motion.div>

          {/* 4. DOĞRULUK KUTUSU (Alt Orta - 3 Sütun, 1 Satır) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="md:col-span-3 md:row-span-1 rounded-[2rem] bg-slate-900/60 backdrop-blur-xl border border-slate-800/60 p-6 flex flex-col justify-between"
          >
            <div className="flex items-center gap-2 text-sky-400 font-medium text-sm">
              <Cpu size={18} />
              Yapay Zeka Doğruluğu
            </div>
            <div className="mt-4">
              <div className="text-5xl font-extrabold text-white tracking-tighter">%95<span className="text-2xl text-sky-500">+</span></div>
              <div className="text-slate-400 text-sm mt-1">Gerçek dünya verileriyle test edildi.</div>
            </div>
          </motion.div>

          {/* 5. AĞLAR (MARQUEE) KUTUSU (Alt Sağ - 6 Sütun, 1 Satır) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="md:col-span-6 md:row-span-1 rounded-[2rem] bg-slate-900/40 backdrop-blur-xl border border-slate-800/40 p-6 flex flex-col justify-center overflow-hidden relative"
          >
            <div className="flex items-center gap-2 text-slate-400 font-medium text-sm mb-6 z-10">
              <BatteryCharging size={18} />
              Türkiye'nin Tüm Ağları Tek Haritada
            </div>
            
            {/* CSS Marquee Effect */}
            <div className="flex w-[200%] animate-marquee whitespace-nowrap opacity-60 hover:opacity-100 transition-opacity">
              {[1, 2].map((i) => (
                <div key={i} className="flex gap-12 px-6 items-center">
                  <span className="text-2xl font-black text-white tracking-widest">ZES</span>
                  <span className="text-2xl font-black text-white tracking-widest">EŞARJ</span>
                  <span className="text-2xl font-black text-white tracking-widest">TRUGO</span>
                  <span className="text-2xl font-black text-white tracking-widest">ASTOR</span>
                  <span className="text-2xl font-black text-white tracking-widest">TESLA</span>
                </div>
              ))}
            </div>
            
            <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#070b14] to-transparent z-10"></div>
            <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#070b14] to-transparent z-10"></div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
