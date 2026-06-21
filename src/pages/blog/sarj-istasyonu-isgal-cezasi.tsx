import { AlertTriangle, ShieldAlert, Bell, Car, Timer } from 'lucide-react';
import BlogCTA from './components/BlogCTA';

export default function SarjIstasyonuIsgalCezasi() {
  return (
    <article className="max-w-none">
      {/* Giriş Paragrafı */}
      <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-[1.85]">
        Elektrikli araç kullanıcılarının sayısının hızla artmasıyla birlikte, şarj istasyonlarındaki yoğunluk da önemli bir sorun haline geldi. Şarjı biten veya dolan aracını istasyonda bırakıp giden sürücüler için firmalar <strong className="text-slate-900 dark:text-white">"işgal ücreti"</strong> (blokaj cezası) uygulamasına başladı.
      </p>


      {/* İşgal Ücreti Nedir */}
      <h2 className="relative text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mt-16 mb-6 pl-5 border-l-[3px] border-blue-500">
        İşgal Ücreti (Blokaj Cezası) Nedir?
      </h2>
      <p className="text-slate-700 dark:text-slate-300 mb-6 leading-[1.85] text-[17px]">
        İşgal ücreti, aracınızın bataryası %100 dolmasına rağmen şarj soketini çıkarmayıp park yerini işgal etmeye devam ettiğiniz her dakika için faturanıza yansıtılan ek bir ücrettir. Bu uygulama, istasyonların otopark olarak kullanılmasını engellemek ve şarj sırası bekleyen diğer mağdur sürücülerin haklarını korumak amacıyla getirilmiştir.
      </p>

      {/* Önemli Kural - Premium Callout */}
      <div className="my-10 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/15 dark:to-orange-900/10 border border-amber-200/80 dark:border-amber-800/30 rounded-2xl p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md shadow-amber-500/20">
            <AlertTriangle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="text-amber-900 dark:text-amber-200 font-bold text-lg mb-2">Önemli Kural</h4>
            <p className="text-amber-800 dark:text-amber-300 m-0 leading-relaxed text-[15px]">
              Genellikle şarjınız %100'e ulaştığında veya şarj işlemini durdurduğunuzda, firmalar size aracı çekmeniz için <strong className="font-bold">15 ila 30 dakika arasında bir tolerans süresi</strong> (grace period) tanır. Bu süre aşılırsa ceza yazılmaya başlar.
            </p>
          </div>
        </div>
      </div>


      {/* Firmalar */}
      <h2 className="relative text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mt-16 mb-6 pl-5 border-l-[3px] border-blue-500">
        Firmaların 2026 İşgal Ücreti Tarifeleri
      </h2>
      <p className="text-slate-700 dark:text-slate-300 mb-8 leading-[1.85] text-[17px]">
        Türkiye'de hizmet veren belli başlı operatörlerin işgal ücreti politikaları farklılık göstermektedir:
      </p>

      <div className="space-y-3 mb-10">
        {/* ZES */}
        <div className="flex items-start gap-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl p-4 border border-slate-100 dark:border-slate-700/50 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800/60">
          <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mt-0.5 shadow-sm shadow-blue-500/20">
            <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
          </span>
          <div className="flex-1 text-slate-700 dark:text-slate-300 text-[17px] leading-relaxed">
            <strong className="font-bold text-slate-900 dark:text-white">ZES (Zorlu Energy Solutions):</strong> Şarj işlemi bittikten sonra belirli bir tolerans süresi aşılırsa dakika başına işgal ücreti faturaya eklenir. Lokasyona göre DC istasyonlarda bu ücret dakika başına 5-10 TL arasında değişebilmektedir.
          </div>
        </div>

        {/* Eşarj */}
        <div className="flex items-start gap-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl p-4 border border-slate-100 dark:border-slate-700/50 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800/60">
          <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mt-0.5 shadow-sm shadow-blue-500/20">
            <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
          </span>
          <div className="flex-1 text-slate-700 dark:text-slate-300 text-[17px] leading-relaxed">
            <strong className="font-bold text-slate-900 dark:text-white">Eşarj:</strong> Hızlı şarj (DC) istasyonlarında şarj bittikten sonra tanınan sürenin ardından dakika bazlı cezai işlem uygulanır.
          </div>
        </div>

        {/* Tesla */}
        <div className="flex items-start gap-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl p-4 border border-slate-100 dark:border-slate-700/50 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800/60">
          <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mt-0.5 shadow-sm shadow-blue-500/20">
            <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
          </span>
          <div className="flex-1 text-slate-700 dark:text-slate-300 text-[17px] leading-relaxed">
            <strong className="font-bold text-slate-900 dark:text-white">Tesla Supercharger:</strong> Tesla'nın dünya genelinde uyguladığı katı bir kuraldır. Şarj bittikten sonra araç 5 dakika içinde çekilmezse dakika başına ücret yazılır. Eğer istasyon %100 doluysa bu ceza "Idle Fee" olarak iki katına çıkar.
          </div>
        </div>

        {/* Trugo */}
        <div className="flex items-start gap-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl p-4 border border-slate-100 dark:border-slate-700/50 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800/60">
          <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mt-0.5 shadow-sm shadow-blue-500/20">
            <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
          </span>
          <div className="flex-1 text-slate-700 dark:text-slate-300 text-[17px] leading-relaxed">
            <strong className="font-bold text-slate-900 dark:text-white">Trugo:</strong> Benzer şekilde, yüksek hızlı DC soketlerde şarj sonlanmasına rağmen kabloyu çıkarmayanlara dakika başına ek faturalandırma yapılır.
          </div>
        </div>
      </div>

      {/* Araya giren CTA */}
      <BlogCTA />


      {/* Nasıl Kaçınılır */}
      <h2 className="relative text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mt-16 mb-6 pl-5 border-l-[3px] border-blue-500">
        İşgal Ücretinden Nasıl Kaçınılır?
      </h2>
      <p className="text-slate-700 dark:text-slate-300 mb-8 leading-[1.85] text-[17px]">
        Bu tür cezalarla karşılaşmamak ve EV etiğine (Elektrikli Araç adabı) uymak için şu adımları izleyebilirsiniz:
      </p>

      <div className="space-y-3 mb-10">
        {/* Adım 1 */}
        <div className="flex items-start gap-4 bg-white dark:bg-slate-800/60 rounded-xl p-5 border border-slate-100 dark:border-slate-700/50 shadow-sm hover:shadow-md transition-shadow">
          <span className="flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-blue-500/20">1</span>
          <div className="flex-1 text-slate-700 dark:text-slate-300 text-[17px] leading-relaxed pt-1">
            Kullandığınız şarj ağının mobil uygulamasından <strong className="text-slate-900 dark:text-white">bildirimlere izin verin</strong>. Şarj %80'e veya %100'e ulaştığında telefonunuza bildirim gelecektir.
          </div>
        </div>

        {/* Adım 2 */}
        <div className="flex items-start gap-4 bg-white dark:bg-slate-800/60 rounded-xl p-5 border border-slate-100 dark:border-slate-700/50 shadow-sm hover:shadow-md transition-shadow">
          <span className="flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-blue-500/20">2</span>
          <div className="flex-1 text-slate-700 dark:text-slate-300 text-[17px] leading-relaxed pt-1">
            Şarj sürenizi (örneğin 30 dakika) tahmin ediyorsanız, <strong className="text-slate-900 dark:text-white">aracın yanından çok uzaklaşmayın</strong>.
          </div>
        </div>

        {/* Adım 3 */}
        <div className="flex items-start gap-4 bg-white dark:bg-slate-800/60 rounded-xl p-5 border border-slate-100 dark:border-slate-700/50 shadow-sm hover:shadow-md transition-shadow">
          <span className="flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-blue-500/20">3</span>
          <div className="flex-1 text-slate-700 dark:text-slate-300 text-[17px] leading-relaxed pt-1">
            Şarj istasyonları <strong className="text-slate-900 dark:text-white">"VIP Otopark" değildir</strong>. İşiniz biter bitmez aracınızı normal bir park alanına taşıyın.
          </div>
        </div>
      </div>

      {/* Son Bilgi Notu */}
      <div className="my-8 flex items-start gap-3 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800/30 rounded-xl p-4 text-sm text-blue-800 dark:text-blue-300">
        <svg className="w-5 h-5 flex-shrink-0 mt-0.5 text-blue-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" /></svg>
        <span>Bu sayfadaki bilgiler genel bilgilendirme amaçlıdır. Güncel ve kesin işgal ücreti tarifeleri için ilgili şarj operatörünün resmi uygulamasını veya web sitesini kontrol edin.</span>
      </div>
    </article>
  );
}
