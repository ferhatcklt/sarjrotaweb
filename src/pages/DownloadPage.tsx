import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, Zap, MapPin, BatteryCharging, Route, Shield, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';

const APP_STORE_URL = 'https://apps.apple.com/tr/app/%C5%9Farjrota-ev-rota-planlay%C4%B1c%C4%B1/id6771183754';
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=tr.com.sarjrota';

const AppleIcon = ({ className = "w-7 h-7" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
  </svg>
);

const PlayStoreIcon = ({ className = "w-7 h-7" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594zM1.337.924a1.486 1.486 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087L1.337.924zm12.207 10.065l3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.179l11.04 10.973zm0 2.067l-11 10.933c.298.036.612-.016.906-.183l13.324-7.544-3.23-3.206z"/>
  </svg>
);

const features = [
  { icon: <MapPin className="w-5 h-5" />, title: 'Akıllı Rota', desc: 'Yapay zeka destekli şarj rota planlaması' },
  { icon: <BatteryCharging className="w-5 h-5" />, title: 'Tüm Ağlar', desc: 'ZES, Trugo, Eşarj, Tesla ve daha fazlası' },
  { icon: <Route className="w-5 h-5" />, title: 'Topografya', desc: 'Yokuş ve eğim analizli menzil hesabı' },
  { icon: <Shield className="w-5 h-5" />, title: 'Ücretsiz', desc: 'Tüm özellikler tamamen ücretsiz' },
];

export default function DownloadPage() {
  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
      window.location.replace(APP_STORE_URL);
      return;
    }
    if (/android/i.test(userAgent)) {
      window.location.replace(PLAY_STORE_URL);
      return;
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-[#030712] overflow-x-hidden selection:bg-brand-500/30 font-['Inter'] flex flex-col">
      <SEO
        title="Uygulamayı İndir | ŞarjRota"
        description="ŞarjRota mobil uygulamasını iOS ve Android cihazlarınıza indirin. Yapay zeka destekli elektrikli araç rota planlayıcısı."
      />

      {/* ── ANIMATED BACKGROUND ── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
        <motion.div
          animate={{ x: [0, 60, -60, 0], y: [0, -40, 40, 0], scale: [1, 1.3, 0.8, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[15%] -left-[15%] w-[55vw] h-[55vw] rounded-full bg-blue-600/20 blur-[140px]"
        />
        <motion.div
          animate={{ x: [0, -80, 80, 0], y: [0, 60, -60, 0], scale: [1, 0.8, 1.4, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[10%] -right-[15%] w-[45vw] h-[45vw] rounded-full bg-emerald-500/15 blur-[140px]"
        />
        <motion.div
          animate={{ x: [0, 40, -40, 0], y: [0, -30, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[50%] left-[30%] w-[25vw] h-[25vw] rounded-full bg-sky-500/10 blur-[100px]"
        />
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 pt-24 pb-16">
        <div className="w-full max-w-4xl mx-auto">

          {/* ── HERO SECTION ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wide mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
              </span>
              iOS & Android'de Yayında
            </motion.div>

            {/* Phone Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="w-24 h-24 mx-auto mb-8 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-3xl blur-xl opacity-40" />
              <div className="relative w-full h-full bg-gradient-to-br from-blue-500 to-emerald-500 rounded-3xl flex items-center justify-center shadow-2xl">
                <Smartphone className="w-12 h-12 text-white" />
              </div>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-6">
              ŞarjRota'yı <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                cebine indir.
              </span>
            </h1>

            <p className="text-slate-400 text-base lg:text-lg max-w-xl mx-auto mb-10 leading-relaxed font-light">
              Elektrikli aracınla her yere özgürce git. Yapay zeka destekli rota planlama, 
              tüm şarj ağları ve anlık maliyet hesabı artık cebinde.
            </p>
          </motion.div>

          {/* ── STORE BUTTONS ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-4 px-8 py-5 w-full sm:w-auto bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/50 text-white rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg backdrop-blur-xl hover:shadow-blue-500/10 hover:border-slate-600/50"
            >
              <div className="absolute -inset-px bg-gradient-to-r from-blue-500/20 to-sky-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
              <div className="relative z-10 flex items-center gap-4">
                <AppleIcon className="w-9 h-9" />
                <div className="flex flex-col items-start leading-tight">
                  <span className="text-[11px] text-slate-400 font-medium">App Store'dan</span>
                  <span className="text-xl font-bold tracking-tight">İndirin</span>
                </div>
              </div>
            </a>

            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-4 px-8 py-5 w-full sm:w-auto bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/50 text-white rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg backdrop-blur-xl hover:shadow-emerald-500/10 hover:border-slate-600/50"
            >
              <div className="absolute -inset-px bg-gradient-to-r from-emerald-500/20 to-green-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
              <div className="relative z-10 flex items-center gap-4">
                <PlayStoreIcon className="w-9 h-9" />
                <div className="flex flex-col items-start leading-tight">
                  <span className="text-[11px] text-slate-400 font-medium">Google Play'den</span>
                  <span className="text-xl font-bold tracking-tight">Alın</span>
                </div>
              </div>
            </a>
          </motion.div>

          {/* ── FEATURES GRID ── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1, duration: 0.4 }}
                className="group bg-slate-900/40 backdrop-blur-md border border-slate-800/60 rounded-2xl p-5 hover:bg-slate-900/60 transition-all duration-300 hover:border-slate-700/60"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700/50 flex items-center justify-center mb-3 text-blue-400 group-hover:text-emerald-400 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-white font-bold text-sm mb-1">{feature.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* ── STATS BAR ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="bg-slate-900/40 backdrop-blur-md border border-slate-800/60 rounded-[2rem] p-8 mb-16"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-4 text-center">
              <div>
                <div className="flex items-center justify-center gap-2 text-yellow-400 mb-2">
                  <Star className="w-5 h-5 fill-yellow-400" />
                  <Star className="w-5 h-5 fill-yellow-400" />
                  <Star className="w-5 h-5 fill-yellow-400" />
                  <Star className="w-5 h-5 fill-yellow-400" />
                  <Star className="w-5 h-5 fill-yellow-400" />
                </div>
                <div className="text-white font-bold text-lg">5.0 Puan</div>
                <div className="text-slate-500 text-xs">App Store & Google Play</div>
              </div>
              <div>
                <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 mb-1">
                  20K+
                </div>
                <div className="text-white font-bold text-lg">İstasyon</div>
                <div className="text-slate-500 text-xs">Türkiye genelinde</div>
              </div>
              <div>
                <div className="flex items-center justify-center gap-1 text-emerald-400 mb-2">
                  <Zap className="w-6 h-6" />
                </div>
                <div className="text-white font-bold text-lg">%100 Ücretsiz</div>
                <div className="text-slate-500 text-xs">Tüm özellikler açık</div>
              </div>
            </div>
          </motion.div>

          {/* ── WEB CTA ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-center"
          >
            <p className="text-slate-500 text-sm mb-3">Mobil uygulama yerine web üzerinden devam etmek ister misiniz?</p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium transition-colors text-sm"
            >
              Web sürümüne git →
            </Link>
          </motion.div>

        </div>
      </div>

      {/* ── FOOTER ── */}
      <div className="relative z-20 border-t border-slate-800/50 bg-[#02040a]">
        <Footer />
      </div>
    </div>
  );
}
