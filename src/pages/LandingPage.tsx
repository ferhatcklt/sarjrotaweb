import { Link } from 'react-router-dom';
import { Zap, MapPin, BatteryCharging, ChevronRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-['Inter'] selection:bg-blue-200">
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-600/20">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900">ŞarjRota</span>
            </div>
            <div>
              <Link
                to="/harita"
                className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-slate-900 rounded-full hover:bg-slate-800 transition-all duration-200 shadow-sm"
              >
                Uygulamaya Git
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full opacity-30 pointer-events-none">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-20 right-20 w-72 h-72 bg-sky-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium mb-8">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Türkiye'nin En Kapsamlı Şarj Ağı Haritası
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight mb-8">
            Elektrikli Aracınız İçin <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500">
              Akıllı Rota Planlayıcı
            </span>
          </h1>
          
          <p className="mt-4 text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
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
              href="#ozellikler"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium text-slate-700 bg-white border border-slate-200 rounded-full hover:bg-slate-50 transition-all duration-200"
            >
              Daha Fazla Bilgi
            </a>
          </div>

          {/* Dashboard Preview / Mockup */}
          <div className="mt-20 relative mx-auto max-w-5xl">
            <div className="rounded-2xl border border-slate-200/60 bg-white/50 backdrop-blur-sm p-2 shadow-2xl shadow-slate-200/50">
              <div className="rounded-xl overflow-hidden border border-slate-100 bg-slate-100 aspect-video relative flex items-center justify-center">
                {/* Fallback image if hero.png is missing */}
                <img 
                  src="/hero.png" 
                  alt="Şarj Rota Arayüzü" 
                  className="w-full h-full object-cover rounded-lg"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    e.currentTarget.parentElement!.innerHTML = '<div class="text-slate-400 font-medium text-lg">Gelişmiş Harita Arayüzü</div>';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="ozellikler" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Neden ŞarjRota?</h2>
            <p className="mt-4 text-lg text-slate-600">Yolculuğunuzu planlarken ihtiyacınız olan her şey tek bir yerde.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Zap className="w-6 h-6 text-yellow-500" />}
              title="Akıllı Optimizasyon"
              description="OSRM tabanlı gerçek yol verileriyle, bataryanızı en verimli şekilde kullanacak rotayı hesaplar."
            />
            <FeatureCard 
              icon={<BatteryCharging className="w-6 h-6 text-green-500" />}
              title="Geniş Araç Veritabanı"
              description="Tesla, Togg, Porsche ve daha fazlası. Aracınızın gerçek tüketim değerlerine göre menzil tahmini."
            />
            <FeatureCard 
              icon={<MapPin className="w-6 h-6 text-red-500" />}
              title="Tüm İstasyonlar"
              description="ZES, Eşarj, Trugo ve Supercharger istasyonları anlık olarak haritanızda."
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-white">ŞarjRota</span>
            </div>
            <p className="text-slate-400 text-sm text-center md:text-left max-w-md">
              Elektrikli araç sürücüleri için yapay zeka ve gerçek verilerle güçlendirilmiş rota ve şarj planlama asistanı.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-sm">
            <Link to="/gizlilik-politikasi" className="text-slate-400 hover:text-white transition-colors">
              Gizlilik Politikası
            </Link>
            <Link to="/kullanim-sartlari" className="text-slate-400 hover:text-white transition-colors">
              Kullanım Şartları
            </Link>
            <span className="text-slate-500 hidden md:inline">|</span>
            <span className="text-slate-400">
              © {new Date().getFullYear()} ŞarjRota. Tüm hakları saklıdır.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
      <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
}
