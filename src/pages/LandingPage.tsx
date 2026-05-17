import { Link } from 'react-router-dom';
import { 
  Zap, 
  MapPin, 
  BatteryCharging, 
  ChevronRight, 
  Target, 
  Navigation, 
  CheckCircle2, 
  HelpCircle 
} from 'lucide-react';
import { Footer } from '../components/Footer';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function LandingPage() {
  const { scrollY } = useScroll();
  
  // Parallax Transformasyonları (Hafifletilmiş)
  const heroBgY = useTransform(scrollY, [0, 1000], ['0%', '15%']);
  const heroContentY = useTransform(scrollY, [0, 1000], ['0%', '5%']);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 font-['Inter'] selection:bg-blue-200 dark:selection:bg-blue-900 transition-colors duration-300 overflow-hidden">
      
      {/* ── HERO SECTION (Gerçek Parallax) ── */}
      <div className="relative pt-20 pb-20 lg:pt-32 lg:pb-32 flex items-center justify-center min-h-[90vh]">
        
        {/* Parallax Arkaplan Katmanı */}
        <motion.div 
          className="absolute inset-0 z-0 pointer-events-none"
          style={{ y: heroBgY }}
        >
          <div className="absolute inset-0 bg-parallax opacity-50 dark:opacity-30" style={{ backgroundImage: "radial-gradient(circle at center, rgba(14, 165, 233, 0.1) 0%, transparent 70%)" }} />
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] opacity-60 animate-blob"></div>
          <div className="absolute top-20 right-20 w-72 h-72 bg-sky-400 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] opacity-60 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] opacity-60 animate-blob animation-delay-4000"></div>
        </motion.div>

        {/* Hero İçerik */}
        <motion.div 
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 w-full"
          style={{ y: heroContentY }}
        >
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-blue-100 dark:border-blue-800/50 shadow-sm text-blue-700 dark:text-blue-300 text-sm font-medium mb-8 hover:shadow-md transition-shadow"
          >
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
            </span>
            Türkiye'nin En Kapsamlı Şarj Ağı Haritası
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05, ease: "easeOut" }}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-8 drop-shadow-sm"
          >
            Elektrikli Aracınız İçin <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500 dark:from-blue-400 dark:to-sky-300 inline-block hover:scale-[1.02] transition-transform duration-300">
              Akıllı Rota Planlayıcı
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
            className="mt-4 text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Menzil endişesine son! Aracınızın modeline ve mevcut şarjınıza göre, 
            yolculuğunuzdaki en hızlı ve uygun şarj istasyonlarını saniyeler içinde hesaplayın.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link
              to="/harita"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 hover:shadow-[0_0_40px_-10px_rgba(37,99,235,0.7)] transition-all duration-300 transform hover:-translate-y-1"
            >
              Hemen Rota Oluştur
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#nasil-calisir"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full hover:bg-slate-50 dark:hover:bg-slate-700 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              Nasıl Çalışır?
            </a>
          </motion.div>

          {/* Dashboard Preview / Mockup */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 80 }}
            className="mt-20 relative mx-auto max-w-5xl group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-sky-400 to-blue-600 rounded-[2rem] blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
            <div className="relative rounded-[1.5rem] border border-slate-200/80 dark:border-slate-700/80 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl p-2 shadow-2xl transition-colors">
              <div className="rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 aspect-video relative flex items-center justify-center">
                <img 
                  src="/hero.png" 
                  alt="Şarj Rota Arayüzü" 
                  className="w-full h-full object-cover rounded-lg dark:brightness-90 dark:contrast-125"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    e.currentTarget.parentElement!.innerHTML = '<div class="text-slate-400 dark:text-slate-500 font-medium text-lg flex flex-col items-center gap-4"><svg class="w-12 h-12 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path></svg>Gelişmiş Harita Arayüzü</div>';
                  }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ── NASIL ÇALIŞIR ── */}
      <div id="nasil-calisir" className="py-32 bg-slate-50/50 dark:bg-slate-950/50 transition-colors relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ duration: 0.4 }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white">Nasıl Çalışır?</h2>
            <p className="mt-6 text-xl text-slate-600 dark:text-slate-400">Yola çıkmadan önce sadece 3 adımda mükemmel rotanızı planlayın.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-blue-100 via-blue-400 to-blue-100 dark:from-slate-800 dark:via-blue-600 dark:to-slate-800"></div>
            
            <StepCard 
              delay={0.05}
              number="1"
              icon={<Target className="w-8 h-8 text-blue-600 dark:text-blue-400" />}
              title="Aracını Seç"
              description="Veritabanımızdan aracınızın marka ve modelini seçin. Sistem batarya kapasitenizi ve tüketiminizi otomatik ayarlar."
            />
            <StepCard 
              delay={0.15}
              number="2"
              icon={<Navigation className="w-8 h-8 text-blue-600 dark:text-blue-400" />}
              title="Konumu Belirle"
              description="Başlangıç ve varış noktalarınızı haritadan seçin. Tercih ettiğiniz şarj ağlarını filtreleyin."
            />
            <StepCard 
              delay={0.25}
              number="3"
              icon={<Zap className="w-8 h-8 text-blue-600 dark:text-blue-400" />}
              title="Rotan Hazır"
              description="Gerçek yol koşulları ve menzilinize göre nerede ve kaç dakika şarj etmeniz gerektiği saniyeler içinde karşınıza gelsin."
            />
          </div>
        </div>
      </div>

      {/* ── NEDEN ŞARJ ROTA (Framer Parallax) ── */}
      <SectionWithParallaxBg />

      {/* ── DESTEKLENEN AĞLAR ── */}
      <div className="py-32 bg-slate-50/50 dark:bg-slate-950/50 transition-colors relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-2xl md:text-4xl font-bold text-slate-900 dark:text-white mb-16"
          >
            Türkiye'nin En Büyük Şarj Ağları Tek Haritada
          </motion.h2>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.05 } }
            }}
            className="flex flex-wrap justify-center gap-6 md:gap-8 opacity-70 dark:opacity-80 grayscale hover:grayscale-0 transition-all duration-300"
          >
            {['ZES', 'Trugo', 'Eşarj', 'Astor Şarj', 'Tesla Supercharger'].map((brand) => (
              <motion.div 
                key={brand}
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } }
                }}
                whileHover={{ scale: 1.05, rotate: [-1, 1, 0] }}
                className="px-8 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm font-bold text-xl text-slate-800 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-md transition-all cursor-default"
              >
                {brand}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── SSS / FAQ ── */}
      <div className="py-32 bg-white dark:bg-slate-900/30 transition-colors relative z-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white">Sıkça Sorulan Sorular</h2>
          </motion.div>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            className="space-y-6"
          >
            <FaqItem 
              q="ŞarjRota ücretsiz mi?" 
              a="Evet, ŞarjRota'nın tüm rota hesaplama özellikleri ve istasyon görüntüleme modülleri tamamen ücretsizdir." 
            />
            <FaqItem 
              q="Aracım listede yok, ne yapmalıyım?" 
              a="Veritabanımızı sürekli güncelliyoruz. Listede olmayan bir araç için yakın batarya kapasiteli benzer bir model seçerek çok yaklaşık sonuçlar elde edebilirsiniz." 
            />
            <FaqItem 
              q="İstasyonların doluluk durumunu görebilir miyim?" 
              a="Şu an için anlık doluluk durumu (API kısıtlamaları nedeniyle) gösterilemiyor ancak istasyonların güç kapasiteleri (kW) ve soket tipleri (CCS, Type2) haritada yer almaktadır." 
            />
          </motion.div>
        </div>
      </div>

      {/* ── FINAL CTA ── */}
      <div className="relative py-32 overflow-hidden z-20">
        <div className="absolute inset-0 bg-blue-600 dark:bg-blue-800"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative text-center px-4 max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8 drop-shadow-md">Elektrikli Aracınızla Sınırları Aşın</h2>
          <p className="text-blue-100 text-xl md:text-2xl mb-12 max-w-3xl mx-auto font-light">Sıfır emisyonlu yolculuklarınızı stressiz bir şekilde planlayın.</p>
          <Link
            to="/harita"
            className="group inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-blue-600 bg-white rounded-full hover:bg-slate-50 hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-[0_0_50px_rgba(255,255,255,0.4)]"
          >
            Rota Oluşturmaya Başla
            <Zap className="ml-3 w-6 h-6 text-yellow-500 group-hover:rotate-12 transition-transform" />
          </Link>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}

// ── Yardımcı Bileşenler ──

// Neden ŞarjRota kısmı için scroll'a duyarlı özel arkaplan bileşeni
function SectionWithParallaxBg() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Parallax Arkaplan (Hafifletilmiş)
  const yBg = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className="relative py-32 overflow-hidden bg-slate-900 z-10">
      <motion.div 
        className="absolute inset-0 z-0 opacity-80"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1620800615965-0a99268393e8?q=80&w=2070&auto=format&fit=crop')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          y: yBg 
        }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-slate-900 via-slate-900/90 to-slate-900/80"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-8 drop-shadow-md">Menzil Endişesini Geride Bırakın</h2>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed font-light">
              ŞarjRota sadece mesafeye bakmaz. Yükseklik farkları (topografya), otoyol hız limitleri ve hava durumu gibi etkenleri analiz ederek aracınızın gerçekte ne kadar şarj tüketeceğini hesaplar.
            </p>
            <ul className="space-y-6">
              <BenefitItem delay={0.1} text="Zaman kaybı yaratan gereksiz şarj duraklarını atlar." />
              <BenefitItem delay={0.2} text="Ağlara göre filtreleme ile sadece güvendiğiniz istasyonları bulur." />
              <BenefitItem delay={0.3} text="Varış noktanızda pilinizin güvenli seviyede kalmasını garantiler." />
            </ul>
            <Link
              to="/harita"
              className="inline-flex mt-12 items-center justify-center gap-2 px-10 py-5 text-lg font-bold text-slate-900 bg-white rounded-full hover:bg-slate-100 hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)]"
            >
              Hemen Ücretsiz Dene
            </Link>
          </motion.div>
          <div className="grid grid-cols-2 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-slate-800/60 backdrop-blur-md border border-slate-700/50 p-8 rounded-3xl shadow-xl"
            >
              <BatteryCharging className="w-12 h-12 text-emerald-400 mb-6 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]" />
              <h3 className="text-white font-bold text-3xl mb-3">%95<span className="text-xl text-slate-400 font-normal block mt-1">Doğruluk</span></h3>
              <p className="text-slate-400 text-sm leading-relaxed">Gerçek tüketim verileriyle hesaplanmış hassas batarya tahmini.</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-slate-800/60 backdrop-blur-md border border-slate-700/50 p-8 rounded-3xl mt-12 shadow-xl"
            >
              <MapPin className="w-12 h-12 text-blue-400 mb-6 drop-shadow-[0_0_15px_rgba(96,165,250,0.5)]" />
              <h3 className="text-white font-bold text-3xl mb-3">3500+<span className="text-xl text-slate-400 font-normal block mt-1">İstasyon</span></h3>
              <p className="text-slate-400 text-sm leading-relaxed">Türkiye çapında tüm aktif DC ve AC şarj noktaları anlık haritada.</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StepCard({ number, icon, title, description, delay }: { number: string, icon: React.ReactNode, title: string, description: string, delay: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px" }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -5, boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.1)" }}
      className="relative flex flex-col items-center text-center p-8 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md rounded-3xl shadow-sm border border-slate-100/50 dark:border-slate-800/50 z-10 transition-colors"
    >
      <div className="absolute -top-6 w-12 h-12 bg-white dark:bg-slate-800 border-4 border-blue-100 dark:border-blue-900 text-blue-600 dark:text-blue-400 font-bold text-xl rounded-full flex items-center justify-center shadow-md">
        {number}
      </div>
      <div className="mt-8 mb-6 p-5 bg-blue-50 dark:bg-blue-900/20 rounded-2xl group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{title}</h3>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">{description}</p>
    </motion.div>
  );
}

function BenefitItem({ text, delay }: { text: string, delay: number }) {
  return (
    <motion.li 
      initial={{ opacity: 0, x: -15 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay }}
      className="flex items-start gap-4"
    >
      <div className="bg-emerald-500/20 p-1 rounded-full shrink-0">
        <CheckCircle2 className="w-6 h-6 text-emerald-400" />
      </div>
      <span className="text-slate-300 text-lg leading-snug">{text}</span>
    </motion.li>
  );
}

function FaqItem({ q, a }: { q: string, a: string }) {
  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
      }}
      whileHover={{ scale: 1.01 }}
      className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/60 dark:border-slate-700/60 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow cursor-default"
    >
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
        <div className="bg-blue-100 dark:bg-blue-900/40 p-2 rounded-lg">
          <HelpCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        {q}
      </h3>
      <p className="text-slate-600 dark:text-slate-400 text-lg pl-14 leading-relaxed">{a}</p>
    </motion.div>
  );
}
