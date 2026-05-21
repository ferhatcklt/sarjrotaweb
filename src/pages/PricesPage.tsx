import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Zap, Info } from 'lucide-react';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';

const API_BASE = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const BRAND_PRICES: Record<string, { AC: number; DC: number; note?: string; dcNote?: string }> = {
  'ZES': { AC: 9.99, DC: 16.49, dcNote: 'DC-1: 12.99 ₺ / DC-2: 16.49 ₺' },
  'Eşarj': { AC: 9.90, DC: 13.50 },
  'Trugo': { AC: 11.49, DC: 14.98 },
  'Tesla': { AC: 12.30, DC: 12.30, note: 'Tesla araçlarına 9.90 ₺' },
  'Voltrun': { AC: 10.00, DC: 14.00 },
  'Sharz.net': { AC: 9.49, DC: 10.99 },
  'Astor': { AC: 10.00, DC: 14.00 },
  'Ovolt': { AC: 9.99, DC: 13.99 }
};

interface StationBasic {
  brand: string;
}

export default function PricesPage() {
  const [stations, setStations] = useState<StationBasic[]>([]);
  const [loading, setLoading] = useState(true);
  const [chargeType, setChargeType] = useState<'DC' | 'AC'>('DC');

  useEffect(() => {
    fetch(`${API_BASE}/api/stations`, { headers: { 'X-Api-Key': API_KEY } })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setStations(data);
      })
      .catch(err => console.error('İstasyonlar yüklenemedi:', err))
      .finally(() => setLoading(false));
  }, []);

  const groupedBrands = useMemo(() => {
    const brandMap = new Map();
    stations.forEach((s) => {
      const prices = BRAND_PRICES[s.brand] || { AC: 14.00, DC: 14.00 };
      const price = chargeType === 'AC' ? prices.AC : prices.DC;
      const noteToShow = (chargeType === 'DC' && prices.dcNote) ? prices.dcNote : prices.note;
      
      if (!brandMap.has(s.brand)) {
        brandMap.set(s.brand, {
          name: s.brand,
          count: 1,
          price: price.toFixed(2),
          note: noteToShow,
        });
      } else {
        const existing = brandMap.get(s.brand);
        existing.count += 1;
      }
    });
    return Array.from(brandMap.values()).sort((a, b) => b.count - a.count);
  }, [stations, chargeType]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#030712] font-['Inter'] transition-colors flex flex-col">
      <SEO 
        title="Güncel Şarj İstasyonu Fiyatları ve Tarifeler | ŞarjRota"
        description="ZES, Eşarj, Trugo, Tesla ve diğer tüm şarj istasyonu ağlarının güncel AC ve DC hızlı şarj fiyatlarını (₺/kWh) karşılaştırın."
      />
      <div className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">Tarifeler</h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg">Şarj istasyonlarının güncel kW fiyatları</p>
          
          {/* AC/DC Toggle */}
          <div className="mt-8 flex justify-center">
            <div className="bg-gray-200/50 dark:bg-slate-800/50 p-1 rounded-xl inline-flex shadow-sm">
              <button
                onClick={() => setChargeType('DC')}
                className={`px-8 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  chargeType === 'DC' 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                DC Hızlı Şarj
              </button>
              <button
                onClick={() => setChargeType('AC')}
                className={`px-8 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  chargeType === 'AC' 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                AC Normal Şarj
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        ) : groupedBrands.length === 0 ? (
          <div className="text-center py-20 text-slate-500 dark:text-slate-400">
            Henüz veri bulunamadı.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groupedBrands.map((brand, i) => (
              <motion.div
                key={brand.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-white dark:bg-slate-900/60 backdrop-blur-sm border border-gray-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                      <Zap size={18} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-lg">{brand.name}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{brand.count} İstasyon</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end mt-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">{brand.price}</span>
                    <span className="text-slate-500 dark:text-slate-400 font-semibold">₺</span>
                    <span className="text-sm text-slate-400 dark:text-slate-500 ml-1">/ kWh</span>
                  </div>
                  {brand.note && (
                    <div className="mt-2 text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <Info size={12} /> {brand.note}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      
      {/* SEO Content Section */}
      <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 mb-8">
        <div className="bg-white dark:bg-slate-900/40 rounded-3xl p-8 sm:p-12 border border-gray-100 dark:border-slate-800/60 shadow-sm prose prose-slate dark:prose-invert max-w-none">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-6 border-b border-gray-100 dark:border-slate-800 pb-4">
            Elektrikli Araç Şarj İstasyonu Fiyatları ve Tarifeler Rehberi
          </h2>
          
          <div className="space-y-6 text-slate-600 dark:text-slate-300 leading-relaxed">
            <p className="text-lg">
              Elektrikli araç pazarının büyümesiyle birlikte Türkiye'nin dört bir yanında şarj istasyonları ağı hızla genişliyor. ZES, Eşarj, Trugo, Tesla, Voltrun, Ovolt ve daha birçok operatör, elektrikli araç sahiplerine farklı hizmet kaliteleri ve fiyatlandırma politikaları sunuyor. ŞarjRota olarak, karmaşıklaşan bu tarifeleri sadeleştiriyor ve en güncel <strong>kW (kilowatt) başına şarj ücretlerini</strong> tek bir ekranda karşılaştırmanıza olanak tanıyoruz. Seyahatinizden önce güncel şarj fiyatlarını bilmek, rota maliyetinizi doğru hesaplamanız için kritik bir adımdır.
            </p>
            
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-4">Şarj İstasyonu Fiyatları Nasıl Belirlenir?</h3>
            <p>
              Şarj istasyonu operatörlerinin belirlediği fiyatlar genellikle EPDK (Enerji Piyasası Düzenleme Kurumu) tarafından belirlenen ticari elektrik tarifeleri baz alınarak hesaplanır. Ancak fiyatı etkileyen asıl faktör, <strong>şarjın hızı (AC veya DC)</strong> ve istasyonun altyapı maliyetidir. Operatörler, yüksek hızlı DC şarj istasyonları kurarken çok ciddi altyapı ve trafo yatırımları yaparlar. Bu nedenle aynı operatörün DC (hızlı) şarj tarifesi, AC (normal) şarj tarifesine göre her zaman daha yüksektir.
            </p>

            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-4">AC Şarj (Alternatif Akım) Nedir? Neden Daha Ekonomiktir?</h3>
            <p>
              AC şarj, şehir şebekesinden gelen alternatif akımın aracın üzerindeki yerleşik şarj cihazı (on-board charger) üzerinden doğru akıma çevrilerek bataryaya iletilmesi işlemidir. 
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Hız:</strong> Genellikle 11 kW ile 22 kW arasında güç sunarlar. Aracın bataryasını doldurması saatler (ortalama 4-8 saat) sürer.</li>
              <li><strong>Kullanım Alanı:</strong> Evler, iş yerleri, oteller, AVM otoparkları ve sokak aralarında uzun süreli park durumlarında tercih edilir.</li>
              <li><strong>Maliyet:</strong> Altyapı kurulumu DC istasyonlara göre çok daha ucuz olduğu için operatörler AC şarj hizmetini daha uygun fiyata sunarlar. Elektrikli aracınızı en ekonomik şarj etme yöntemlerinden biridir.</li>
            </ul>

            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-4">DC Hızlı Şarj (Doğru Akım) Nedir ve Ne Zaman Kullanılmalıdır?</h3>
            <p>
              DC şarj istasyonları, alternatif akımı istasyonun kendi içindeki devasa güç ünitelerinde doğru akıma çevirir ve enerjiyi doğrudan aracın bataryasına gönderir.
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Hız:</strong> 50 kW, 120 kW, 180 kW hatta 350+ kW gibi çok yüksek güç değerlerine ulaşabilirler. Uygun bir araçla 30-40 dakika gibi kısa bir sürede bataryanızı %20'den %80'e kadar doldurabilirsiniz.</li>
              <li><strong>Kullanım Alanı:</strong> Özellikle şehirlerarası yolculuklarda, otoyol dinlenme tesislerinde ve zamanın kısıtlı olduğu anlarda kullanılır.</li>
              <li><strong>Maliyet:</strong> İstasyon kurulum, trafo ve bakım maliyetleri çok yüksek olduğu için kW birim fiyatı AC şarja kıyasla daha pahalıdır.</li>
            </ul>

            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-4">Elektrikli Araç Şarj Maliyeti Nasıl Hesaplanır? (Örnekli Anlatım)</h3>
            <p>
              Aracınızı dışarıdaki ticari bir istasyonda şarj etmenin maliyetini hesaplamak oldukça basittir. İhtiyacınız olan formül şudur: <strong>Şarj Edilen Enerji Miktarı (kWh) x İstasyonun kW Birim Fiyatı (₺)</strong>
            </p>
            <p className="bg-gray-50 dark:bg-slate-800/50 p-4 rounded-lg mt-2 border border-gray-200 dark:border-slate-700">
              <strong>Örnek Senaryo:</strong> Aracınızın batarya kapasitesi 60 kWh olsun. Şarj istasyonuna geldiğinizde bataryanız %20 dolulukta, hedefiniz ise %80'e kadar şarj etmek. 
              <br/><br/>
              İhtiyacınız olan enerji = 60 kWh x %60 = <strong>36 kWh</strong><br/>
              Tercih ettiğiniz DC istasyonunun güncel fiyatı: <strong>14.50 ₺ / kWh</strong><br/>
              Toplam Ödenecek Tutar = 36 kWh x 14.50 ₺ = <strong>522 ₺</strong>
            </p>

            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-4">Şarj Ağları Arasında Fiyat Karşılaştırması Yapmanın Avantajları</h3>
            <p>
              Uzun yola çıkmadan önce ŞarjRota platformunu kullanarak güzergahınızdaki farklı operatörlerin güncel tarifelerini inceleyebilirsiniz. Bazen aynı dinlenme tesisinde bulunan farklı markalara ait istasyonlar arasında kW başına ciddi fiyat farkları (örn: kW başına 2-3 TL) olabilmektedir. Tam şarjda bu fark cebinizde 150-200 TL'ye kadar tasarruf etmenizi sağlayabilir. En güncel AC ve DC şarj fiyatlarını bu sayfadan takip edebilir, bütçe dostu rotalar planlayabilirsiniz.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-auto border-t border-gray-200 dark:border-slate-800/50 bg-white dark:bg-[#02040a]">
        <Footer />
      </div>
    </div>
  );
}
