import { Link } from 'react-router-dom';
import { 
  Zap, MapPin, BatteryCharging, ChevronRight, Activity, Cpu, 
  Car, Compass, CloudLightning, ShieldCheck, HelpCircle 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Footer } from '../components/Footer';

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
    <div className="relative min-h-screen bg-[#030712] overflow-x-hidden selection:bg-brand-500/30 font-['Inter']">
      
      {/* ── ARKA PLAN (SABİT) ── */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-60">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }}></div>
        
        <motion.div 
          animate={{ x: [0, 50, -50, 0], y: [0, -50, 50, 0], scale: [1, 1.2, 0.8, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-blue-600/20 blur-[120px]"
        />
        <motion.div 
          animate={{ x: [0, -70, 70, 0], y: [0, 70, -70, 0], scale: [1, 0.9, 1.3, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[40%] -right-[10%] w-[40vw] h-[40vw] rounded-full bg-sky-500/10 blur-[120px]"
        />
      </div>

      {/* ── İÇERİK KAPSAYICI ── */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-32 pb-32">
        
        {/* =========================================
            BÖLÜM 1: HERO BENTO GRID
        ========================================= */}
        <div className="min-h-[calc(100vh-64px)] pt-16 lg:pt-8 flex flex-col justify-center">
          <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-3 gap-4 lg:gap-6 min-h-[700px]">
            
            {/* 1. ANA HERO */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              style={{ transform: `perspective(1000px) rotateY(${mousePosition.x * 0.05}deg) rotateX(${-mousePosition.y * 0.05}deg)` }}
              className="md:col-span-7 md:row-span-2 relative group rounded-[2rem] bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-xl border border-slate-800/60 p-8 lg:p-12 overflow-hidden flex flex-col justify-center transition-colors"
            >
              <div className="absolute -inset-px bg-gradient-to-r from-blue-500/20 to-sky-400/20 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl"></div>
              
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wide mb-6 md:mb-8">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                  </span>
                  Sistem Aktif v2.0
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-6">
                  Elektrikli araç rotanızı <br className="hidden lg:block"/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                    yapay zeka yönetsin.
                  </span>
                </h1>
                
                <p className="text-slate-400 text-base lg:text-lg max-w-xl mb-10 leading-relaxed font-light">
                  ŞarjRota; topografya, hava durumu ve araç batarya profilinizi analiz ederek durmanız gereken ideal noktaları ve maliyeti saniyeler içinde hesaplar.
                </p>

                <Link
                  to="/harita"
                  className="group/btn relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-slate-950 rounded-full font-bold text-lg hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                >
                  Kalkışa Hazırlan
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover/btn:bg-slate-200 transition-colors">
                    <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              </div>
            </motion.div>

            {/* 2. HARİTA SİMÜLASYONU */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
              className="md:col-span-5 md:row-span-2 relative rounded-[2rem] bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 overflow-hidden flex items-center justify-center group min-h-[300px]"
            >
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -inset-4 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.2) 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl"></div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/80"></div>
              
              <svg className="absolute inset-0 w-full h-full z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                <motion.path 
                  d="M 10 80 Q 30 20 50 50 T 90 20" 
                  fill="none" stroke="url(#gradient)" strokeWidth="0.8" strokeDasharray="4 2"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" /><stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                </defs>
              </svg>

              <motion.div 
                animate={{ y: [-5, 5, -5] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
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
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400"><MapPin size={16} /></div>
                    <div><div className="text-white text-sm font-bold">İstanbul</div><div className="text-slate-500 text-xs">Başlangıç • %100 Şarj</div></div>
                  </div>
                  <div className="ml-4 w-0.5 h-6 bg-slate-800"></div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400"><Zap size={16} /></div>
                    <div><div className="text-white text-sm font-bold">Bolu Dağı</div><div className="text-slate-500 text-xs">+35 dk Şarj Molası</div></div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* 3. MALIYET KUTUSU */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
              className="md:col-span-3 md:row-span-1 rounded-[2rem] bg-gradient-to-br from-emerald-900/20 to-emerald-950/40 backdrop-blur-xl border border-emerald-800/30 p-6 flex flex-col justify-between relative group overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-colors"></div>
              <div className="flex items-center gap-2 text-emerald-400 font-medium text-sm z-10"><Activity size={18} />Yakıt Tasarrufu</div>
              <div className="z-10 mt-4">
                <div className="text-slate-400 text-xs mb-1">Tahmini Ortalama Maliyet</div>
                <div className="text-3xl font-bold text-white tracking-tight">₺0,95<span className="text-lg text-emerald-500 font-medium">/km</span></div>
              </div>
            </motion.div>

            {/* 4. DOĞRULUK KUTUSU */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
              className="md:col-span-3 md:row-span-1 rounded-[2rem] bg-slate-900/60 backdrop-blur-xl border border-slate-800/60 p-6 flex flex-col justify-between"
            >
              <div className="flex items-center gap-2 text-sky-400 font-medium text-sm"><Cpu size={18} />Yapay Zeka Doğruluğu</div>
              <div className="mt-4">
                <div className="text-4xl font-extrabold text-white tracking-tighter">%95<span className="text-2xl text-sky-500">+</span></div>
                <div className="text-slate-400 text-xs mt-1">Gerçek dünya test verisi.</div>
              </div>
            </motion.div>

            {/* 5. AĞLAR (MARQUEE) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}
              className="md:col-span-6 md:row-span-1 rounded-[2rem] bg-slate-900/40 backdrop-blur-xl border border-slate-800/40 p-6 flex flex-col justify-center overflow-hidden relative"
            >
              <div className="flex items-center gap-2 text-slate-400 font-medium text-sm mb-4 z-10"><BatteryCharging size={18} />Tüm Ağlar Tek Haritada</div>
              <div className="flex w-[200%] animate-marquee whitespace-nowrap opacity-60 hover:opacity-100 transition-opacity">
                {[1, 2].map((i) => (
                  <div key={i} className="flex gap-12 px-6 items-center">
                    {['ZES', 'EŞARJ', 'TRUGO', 'ASTOR', 'TESLA'].map(brand => <span key={brand} className="text-2xl font-black text-white tracking-widest">{brand}</span>)}
                  </div>
                ))}
              </div>
              <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#030712] to-transparent z-10"></div>
              <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#030712] to-transparent z-10"></div>
            </motion.div>
          </div>
        </div>

        {/* =========================================
            BÖLÜM 2: ÖRNEK ROTALAR (Bento Cards)
        ========================================= */}
        <section className="pt-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">Gerçek Dünya Örnekleri</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">Popüler elektrikli araçlarla yapılan gerçek rotalardaki zaman ve maliyet tasarrufuna göz atın.</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Örnek 1: Togg */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="bg-slate-900/40 backdrop-blur-md border border-slate-800/60 rounded-[2rem] p-8 hover:bg-slate-900/60 transition-colors group"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center border border-blue-500/30">
                    <Car className="text-blue-400 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Togg T10X</h3>
                    <p className="text-slate-400 text-sm">Uzun Menzil (88.5 kWh)</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-emerald-400 font-bold text-2xl">₺420</div>
                  <div className="text-slate-500 text-xs">Tahmini Maliyet</div>
                </div>
              </div>

              <div className="relative mb-8">
                <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-slate-800"></div>
                <div className="space-y-6">
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center text-xs">İST</div>
                    <div className="text-white font-medium">İstanbul <span className="text-slate-500 text-sm font-normal block">Kalkış Şarjı: %100</span></div>
                  </div>
                  <div className="flex items-center gap-4 relative z-10 pl-2">
                    <div className="w-4 h-4 rounded-full bg-blue-500 ring-4 ring-slate-950"></div>
                    <div className="text-white font-medium">Oksijen 183 - ZES <span className="text-blue-400 text-sm font-normal block">45 Dk Şarj (%15 ➔ %80)</span></div>
                  </div>
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center text-xs">İZM</div>
                    <div className="text-white font-medium">İzmir <span className="text-slate-500 text-sm font-normal block">Varış Şarjı: %22</span></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-slate-800/50 text-sm">
                <span className="text-slate-400">Toplam Mesafe: <strong className="text-white">480 km</strong></span>
                <span className="text-slate-400">Süre: <strong className="text-white">5 Saat 15 Dk</strong></span>
              </div>
            </motion.div>

            {/* Örnek 2: Tesla */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-slate-900/40 backdrop-blur-md border border-slate-800/60 rounded-[2rem] p-8 hover:bg-slate-900/60 transition-colors group"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-red-500/20 rounded-2xl flex items-center justify-center border border-red-500/30">
                    <Car className="text-red-400 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Tesla Model Y</h3>
                    <p className="text-slate-400 text-sm">Long Range (75 kWh)</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-emerald-400 font-bold text-2xl">₺350</div>
                  <div className="text-slate-500 text-xs">Tahmini Maliyet</div>
                </div>
              </div>

              <div className="relative mb-8">
                <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-slate-800"></div>
                <div className="space-y-6">
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center text-xs">ANK</div>
                    <div className="text-white font-medium">Ankara <span className="text-slate-500 text-sm font-normal block">Kalkış Şarjı: %100</span></div>
                  </div>
                  <div className="flex items-center gap-4 relative z-10 pl-2">
                    <div className="w-4 h-4 rounded-full bg-red-500 ring-4 ring-slate-950"></div>
                    <div className="text-white font-medium">Afyon Supercharger <span className="text-red-400 text-sm font-normal block">25 Dk Şarj (%20 ➔ %75)</span></div>
                  </div>
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center text-xs">ANT</div>
                    <div className="text-white font-medium">Antalya <span className="text-slate-500 text-sm font-normal block">Varış Şarjı: %18</span></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-slate-800/50 text-sm">
                <span className="text-slate-400">Toplam Mesafe: <strong className="text-white">475 km</strong></span>
                <span className="text-slate-400">Süre: <strong className="text-white">5 Saat 45 Dk</strong></span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* =========================================
            BÖLÜM 3: NASIL ÇALIŞIR & ALTYAPI
        ========================================= */}
        <section className="pt-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">Mükemmel Rotanın Sırrı</h2>
            <p className="text-slate-400 text-lg">Sadece kilometre değil, tüm çevresel faktörler hesaba katılır.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard 
              icon={<Compass className="w-8 h-8 text-blue-400" />}
              title="Topografya Analizi"
              desc="Yokuş çıkarken artan tüketim ve inerken kazanılan (rejeneratif) enerji harfi harfine hesaplanır."
              delay={0.1}
            />
            <FeatureCard 
              icon={<ShieldCheck className="w-8 h-8 text-emerald-400" />}
              title="Ağ Filtreleme"
              desc="Kartınızın veya aboneliğinizin olduğu şarj ağlarını (Örn: ZES, Trugo) önceliklendirebilirsiniz."
              delay={0.2}
            />
            <FeatureCard 
              icon={<CloudLightning className="w-8 h-8 text-amber-400" />}
              title="Hızlı Şarj Mantığı"
              desc="Batarya doldukça yavaşlayan şarj eğrisi hesaba katılarak en kısa sürede optimum şarj planı çizilir."
              delay={0.3}
            />
          </div>
        </section>

        {/* =========================================
            BÖLÜM 4: SIKÇA SORULAN SORULAR
        ========================================= */}
        <section className="pt-16 max-w-4xl mx-auto w-full">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">Aklınıza Takılanlar</h2>
          </div>
          
          <div className="space-y-4">
            <FaqCard 
              q="Sistem tamamen ücretsiz mi?"
              a="Evet, ŞarjRota'nın harita, filtreleme ve gelişmiş yapay zeka destekli rota planlama modüllerinin tamamı açık ve ücretsizdir."
            />
            <FaqCard 
              q="Aracımı listede bulamazsam ne yapmalıyım?"
              a="Veritabanımız sürekli güncellenmektedir. Aracınız yoksa, batarya kapasitesi (kWh) ve tüketimi sizinkine en yakın olan aracı seçerek çok yaklaşık sonuçlar elde edebilirsiniz."
            />
            <FaqCard 
              q="Tahmini maliyet nasıl hesaplanıyor?"
              a="Hesaplamalar, şarj ağlarının güncel ortalama AC ve DC kilovat-saat (kWh) birim fiyatları üzerinden yaklaşık olarak yapılmaktadır."
            />
          </div>
        </section>

        {/* =========================================
            BÖLÜM 5: FINAL CTA BENTO
        ========================================= */}
        <section className="pt-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            className="w-full bg-gradient-to-br from-blue-600 to-sky-500 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.8) 1px, transparent 0)', backgroundSize: '20px 20px' }}></div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">Yolculuğa Başla.</h2>
              <p className="text-blue-100 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
                Hesap makinesini ve birden fazla şarj uygulamasını bir kenara bırakın. 
                Rotanızı girin, arkanıza yaslanın.
              </p>
              <Link
                to="/harita"
                className="inline-flex items-center justify-center px-10 py-5 bg-white text-blue-600 rounded-full font-bold text-xl hover:scale-105 transition-transform shadow-2xl"
              >
                Hemen Rota Oluştur
              </Link>
            </div>
          </motion.div>
        </section>

      </div>

      {/* FOOTER */}
      <div className="relative z-20 border-t border-slate-800/50 bg-[#02040a]">
        <Footer />
      </div>
    </div>
  );
}

// ── YARDIMCI BİLEŞENLER ──

function FeatureCard({ icon, title, desc, delay }: { icon: React.ReactNode, title: string, desc: string, delay: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay }}
      className="bg-slate-900/40 backdrop-blur-md border border-slate-800/60 rounded-[2rem] p-8 hover:bg-slate-900/60 transition-colors"
    >
      <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-6 shadow-inner">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
    </motion.div>
  );
}

function FaqCard({ q, a }: { q: string, a: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      className="bg-slate-900/30 backdrop-blur-md border border-slate-800/50 rounded-2xl p-6 hover:bg-slate-900/50 transition-colors"
    >
      <h3 className="text-lg font-bold text-white flex items-center gap-3 mb-2">
        <HelpCircle className="w-5 h-5 text-blue-500" />
        {q}
      </h3>
      <p className="text-slate-400 pl-8 text-sm leading-relaxed">{a}</p>
    </motion.div>
  );
}
