import { Link } from 'react-router-dom';
import { ChevronLeft, BookOpen, Clock, AlertTriangle } from 'lucide-react';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';

export default function GuideArticlePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#030712] font-['Inter'] transition-colors flex flex-col">
      <SEO 
        title="Şarj İstasyonu İşgal Cezası ve Ücretleri (2024) | ŞarjRota Rehber"
        description="Elektrikli aracınızı şarj ettikten sonra istasyonu terk etmezseniz ne olur? Eşarj, ZES, Trugo gibi firmaların 2024 işgal ücretleri ve cezalarını öğrenin."
      />
      
      <div className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16">
        <Link to="/rehber" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-8 font-medium transition-colors">
          <ChevronLeft className="w-5 h-5 mr-1" />
          Rehbere Dön
        </Link>

        <div className="mb-10">
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-6">
            <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full font-semibold">
              Mevzuat & Ücretler
            </span>
            <span className="flex items-center gap-1"><BookOpen size={16} /> 24 Mayıs 2024</span>
            <span className="flex items-center gap-1"><Clock size={16} /> 3 dk okuma</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight mb-8">
            Şarj İstasyonu İşgal Cezası ve Ücretleri Nelerdir?
          </h1>
          
          <img 
            src="https://images.unsplash.com/photo-1593941707882-a5bba14938cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
            alt="Elektrikli Araç Şarj İstasyonu" 
            className="w-full h-[400px] object-cover rounded-3xl shadow-md mb-12"
          />
        </div>

        <article className="prose prose-lg dark:prose-invert prose-blue max-w-none prose-headings:font-bold prose-a:text-blue-600">
          <p className="lead text-xl text-slate-600 dark:text-slate-300 mb-8">
            Elektrikli araç kullanıcılarının sayısının hızla artmasıyla birlikte, şarj istasyonlarındaki yoğunluk da önemli bir sorun haline geldi. Şarjı biten veya dolan aracını istasyonda bırakıp giden sürücüler için firmalar "işgal ücreti" (blokaj cezası) uygulamasına başladı.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4">İşgal Ücreti (Blokaj Cezası) Nedir?</h2>
          <p className="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
            İşgal ücreti, aracınızın bataryası %100 dolmasına rağmen şarj soketini çıkarmayıp park yerini işgal etmeye devam ettiğiniz her dakika için faturanıza yansıtılan ek bir ücrettir. Bu uygulama, istasyonların otopark olarak kullanılmasını engellemek ve şarj sırası bekleyen diğer mağdur sürücülerin haklarını korumak amacıyla getirilmiştir.
          </p>

          <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-6 rounded-r-xl my-8">
            <div className="flex items-start">
              <AlertTriangle className="w-6 h-6 text-amber-500 mr-3 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-amber-800 dark:text-amber-200 font-bold text-lg mb-2">Önemli Kural</h4>
                <p className="text-amber-700 dark:text-amber-300 m-0">
                  Genellikle şarjınız %100'e ulaştığında veya şarj işlemini durdurduğunuzda, firmalar size aracı çekmeniz için <strong>15 ila 30 dakika arasında bir tolerans süresi</strong> (grace period) tanır. Bu süre aşılırsa ceza yazılmaya başlar.
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4">Firmaların 2024 İşgal Ücreti Tarifeleri</h2>
          <p className="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
            Türkiye'de hizmet veren belli başlı operatörlerin işgal ücreti politikaları farklılık göstermektedir:
          </p>

          <ul className="space-y-4 mb-8 text-slate-700 dark:text-slate-300">
            <li className="flex items-start">
              <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-3 flex-shrink-0"></span>
              <div><strong>ZES (Zorlu Energy Solutions):</strong> Şarj işlemi bittikten sonra belirli bir tolerans süresi aşılırsa dakika başına işgal ücreti faturaya eklenir. Lokasyona göre DC istasyonlarda bu ücret dakika başına 5-10 TL arasında değişebilmektedir.</div>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-3 flex-shrink-0"></span>
              <div><strong>Eşarj:</strong> Hızlı şarj (DC) istasyonlarında şarj bittikten sonra tanınan sürenin ardından dakika bazlı cezai işlem uygulanır.</div>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-3 flex-shrink-0"></span>
              <div><strong>Tesla Supercharger:</strong> Tesla'nın dünya genelinde uyguladığı katı bir kuraldır. Şarj bittikten sonra araç 5 dakika içinde çekilmezse dakika başına ücret yazılır. Eğer istasyon %100 doluysa bu ceza "Idle Fee" olarak iki katına çıkar.</div>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-3 flex-shrink-0"></span>
              <div><strong>Trugo:</strong> Benzer şekilde, yüksek hızlı DC soketlerde şarj sonlanmasına rağmen kabloyu çıkarmayanlara dakika başına ek faturalandırma yapılır.</div>
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4">İşgal Ücretinden Nasıl Kaçınılır?</h2>
          <p className="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
            Bu tür cezalarla karşılaşmamak ve EV etiğine (Elektrikli Araç adabı) uymak için şu adımları izleyebilirsiniz:
          </p>
          
          <ol className="list-decimal pl-6 space-y-3 mb-10 text-slate-700 dark:text-slate-300">
            <li className="pl-2">Kullandığınız şarj ağının mobil uygulamasından bildirimlere izin verin. Şarj %80'e veya %100'e ulaştığında telefonunuza bildirim gelecektir.</li>
            <li className="pl-2">Şarj sürenizi (örneğin 30 dakika) tahmin ediyorsanız, aracın yanından çok uzaklaşmayın.</li>
            <li className="pl-2">Şarj istasyonları "VIP Otopark" değildir. İşiniz biter bitmez aracınızı normal bir park alanına taşıyın.</li>
          </ol>

        </article>
      </div>

      <div className="mt-auto border-t border-gray-200 dark:border-slate-800/50 bg-white dark:bg-[#02040a]">
        <Footer />
      </div>
    </div>
  );
}
