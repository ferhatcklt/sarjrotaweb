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

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 font-['Inter'] selection:bg-blue-200 dark:selection:bg-blue-900 transition-colors duration-300">
      
      {/* Hero Section */}
      <div className="relative pt-20 pb-20 lg:pt-32 lg:pb-32 overflow-hidden bg-parallax" style={{ backgroundImage: "radial-gradient(circle at center, rgba(14, 165, 233, 0.05) 0%, transparent 70%)" }}>
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full opacity-30 dark:opacity-20 pointer-events-none">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-20 right-20 w-72 h-72 bg-sky-300 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800/50 text-blue-700 dark:text-blue-300 text-sm font-medium mb-8">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Türkiye'nin En Kapsamlı Şarj Ağı Haritası
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-8 drop-shadow-sm">
            Elektrikli Aracınız İçin <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500 dark:from-blue-400 dark:to-sky-300">
              Akıllı Rota Planlayıcı
            </span>
          </h1>
          
          <p className="mt-4 text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Menzil endişesine son! Aracınızın modeline ve mevcut şarjınıza göre, 
            yolculuğunuzdaki en hızlı ve uygun şarj istasyonlarını saniyeler içinde hesaplayın.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/harita"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/30 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              Hemen Rota Oluştur
              <ChevronRight className="w-5 h-5" />
            </Link>
            <a
              href="#nasil-calisir"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200"
            >
              Nasıl Çalışır?
            </a>
          </div>

          {/* Dashboard Preview / Mockup */}
          <div className="mt-20 relative mx-auto max-w-5xl">
            <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm p-2 shadow-2xl shadow-slate-200/50 dark:shadow-slate-900/50 transition-colors">
              <div className="rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 aspect-video relative flex items-center justify-center">
                <img 
                  src="/hero.png" 
                  alt="Şarj Rota Arayüzü" 
                  className="w-full h-full object-cover rounded-lg dark:brightness-90 dark:contrast-125 transition-all"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    e.currentTarget.parentElement!.innerHTML = '<div class="text-slate-400 dark:text-slate-500 font-medium text-lg">Harita Arayüzü Önizlemesi</div>';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Nasıl Çalışır Section */}
      <div id="nasil-calisir" className="py-24 bg-white dark:bg-slate-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Nasıl Çalışır?</h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">Yola çıkmadan önce sadece 3 adımda mükemmel rotanızı planlayın.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Dekoratif bağlantı çizgisi (Sadece desktopta) */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-blue-100 via-blue-300 to-blue-100 dark:from-slate-800 dark:via-blue-900 dark:to-slate-800"></div>
            
            <StepCard 
              number="1"
              icon={<Target className="w-8 h-8 text-blue-600 dark:text-blue-400" />}
              title="Aracını Seç"
              description="Veritabanımızdan aracınızın marka ve modelini seçin. Sistem batarya kapasitenizi ve tüketiminizi otomatik ayarlar."
            />
            <StepCard 
              number="2"
              icon={<Navigation className="w-8 h-8 text-blue-600 dark:text-blue-400" />}
              title="Konumu Belirle"
              description="Başlangıç ve varış noktalarınızı haritadan seçin. Tercih ettiğiniz şarj ağlarını filtreleyin."
            />
            <StepCard 
              number="3"
              icon={<Zap className="w-8 h-8 text-blue-600 dark:text-blue-400" />}
              title="Rotan Hazır"
              description="Gerçek yol koşulları ve menzilinize göre nerede ve kaç dakika şarj etmeniz gerektiği saniyeler içinde karşınıza gelsin."
            />
          </div>
        </div>
      </div>

      {/* Neden ŞarjRota Section (Parallax Arkaplan) */}
      <div className="py-24 bg-slate-900 dark:bg-slate-900 relative overflow-hidden bg-parallax" style={{ backgroundImage: "linear-gradient(rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.9)), url('https://images.unsplash.com/photo-1620800615965-0a99268393e8?q=80&w=2070&auto=format&fit=crop')" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Menzil Endişesini Geride Bırakın</h2>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                ŞarjRota sadece mesafeye bakmaz. Yükseklik farkları (topografya), otoyol hız limitleri ve hava durumu gibi etkenleri analiz ederek aracınızın gerçekte ne kadar şarj tüketeceğini hesaplar.
              </p>
              <ul className="space-y-4">
                <BenefitItem text="Zaman kaybı yaratan gereksiz şarj duraklarını atlar." />
                <BenefitItem text="Ağlara göre filtreleme ile sadece güvendiğiniz istasyonları bulur." />
                <BenefitItem text="Varış noktanızda pilinizin güvenli seviyede kalmasını garantiler." />
              </ul>
              <Link
                to="/harita"
                className="inline-flex mt-10 items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-slate-900 bg-white rounded-full hover:bg-slate-100 transition-colors"
              >
                Hemen Ücretsiz Dene
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700 p-6 rounded-2xl">
                <BatteryCharging className="w-10 h-10 text-emerald-400 mb-4" />
                <h3 className="text-white font-bold text-xl mb-2">%95 Doğruluk</h3>
                <p className="text-slate-400 text-sm">Gerçek tüketim verileriyle hesaplanmış batarya tahmini.</p>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700 p-6 rounded-2xl mt-8">
                <MapPin className="w-10 h-10 text-blue-400 mb-4" />
                <h3 className="text-white font-bold text-xl mb-2">3500+ İstasyon</h3>
                <p className="text-slate-400 text-sm">Türkiye çapında tüm aktif DC ve AC şarj noktaları.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desteklenen Ağlar ve Araçlar */}
      <div className="py-24 bg-white dark:bg-slate-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-12">Türkiye'nin En Büyük Şarj Ağları Tek Haritada</h2>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 opacity-70 dark:opacity-80 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Placeholder logolar, metin olarak gösteriliyor, gerçek hayatta SVG eklenebilir */}
            <div className="px-6 py-3 border border-slate-200 dark:border-slate-800 rounded-xl font-bold text-xl text-slate-800 dark:text-slate-300">ZES</div>
            <div className="px-6 py-3 border border-slate-200 dark:border-slate-800 rounded-xl font-bold text-xl text-slate-800 dark:text-slate-300">Trugo</div>
            <div className="px-6 py-3 border border-slate-200 dark:border-slate-800 rounded-xl font-bold text-xl text-slate-800 dark:text-slate-300">Eşarj</div>
            <div className="px-6 py-3 border border-slate-200 dark:border-slate-800 rounded-xl font-bold text-xl text-slate-800 dark:text-slate-300">Astor Şarj</div>
            <div className="px-6 py-3 border border-slate-200 dark:border-slate-800 rounded-xl font-bold text-xl text-slate-800 dark:text-slate-300">Tesla Supercharger</div>
          </div>
        </div>
      </div>

      {/* SSS / FAQ */}
      <div className="py-24 bg-slate-50 dark:bg-slate-900 transition-colors">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Sıkça Sorulan Sorular</h2>
          </div>
          <div className="space-y-4">
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
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-24 bg-blue-600 dark:bg-blue-700 text-center px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Elektrikli Aracınızla Sınırları Aşın</h2>
        <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">Sıfır emisyonlu yolculuklarınızı stressiz bir şekilde planlayın.</p>
        <Link
          to="/harita"
          className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-blue-600 bg-white rounded-full hover:bg-slate-50 transition-all duration-200 shadow-xl"
        >
          Rota Oluşturmaya Başla
        </Link>
      </div>

      <Footer />
    </div>
  );
}

// Yardımcı Bileşenler

function StepCard({ number, icon, title, description }: { number: string, icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="relative flex flex-col items-center text-center p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 z-10">
      <div className="absolute -top-6 w-12 h-12 bg-white dark:bg-slate-800 border-4 border-blue-100 dark:border-blue-900 text-blue-600 dark:text-blue-400 font-bold text-xl rounded-full flex items-center justify-center">
        {number}
      </div>
      <div className="mt-8 mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-full">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{title}</h3>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{description}</p>
    </div>
  );
}

function BenefitItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3">
      <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
      <span className="text-slate-300">{text}</span>
    </li>
  );
}

function FaqItem({ q, a }: { q: string, a: string }) {
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
        <HelpCircle className="w-5 h-5 text-blue-500" />
        {q}
      </h3>
      <p className="text-slate-600 dark:text-slate-400 pl-7">{a}</p>
    </div>
  );
}
