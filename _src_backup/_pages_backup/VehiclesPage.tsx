import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Car, Battery, Zap, Search } from 'lucide-react';
import { Footer } from '../components/Footer';
import { SEO } // SEO removed - use Next.js metadata;
import type { Vehicle } from '../store/useAppStore';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch(`${API_BASE}/api/vehicles`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setVehicles(data);
      })
      .catch(err => console.error('Araçlar yüklenemedi:', err))
      .finally(() => setLoading(false));
  }, []);

  const filteredVehicles = useMemo(() => {
    if (!searchQuery.trim()) return vehicles;
    const lowerQuery = searchQuery.toLowerCase();
    return vehicles.filter(v => 
      v.brand.toLowerCase().includes(lowerQuery) || 
      v.model.toLowerCase().includes(lowerQuery)
    );
  }, [vehicles, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#030712] font-['Inter'] transition-colors flex flex-col">
      <SEO 
        title="Elektrikli Araç Menzil ve Batarya Rehberi | ŞarjRota"
        description="ŞarjRota tarafından desteklenen elektrikli araçların (EV) batarya kapasitelerini, WLTP ve gerçek menzillerini inceleyin."
      />
      
      <div className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">Elektrikli Araçlar</h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            Desteklenen tüm elektrikli araçların detaylı batarya ve menzil bilgileri. Rota hesaplamalarımızda araçların <strong>gerçek menzili</strong> (Fabrika verisinin yaklaşık %90'ı) baz alınmaktadır.
          </p>

          <div className="mt-8 max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Araç ara... (Örn: Tesla, Togg, BMW)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow shadow-sm"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        ) : filteredVehicles.length === 0 ? (
          <div className="text-center py-20 text-slate-500 dark:text-slate-400">
            Aramanıza uygun araç bulunamadı.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredVehicles.map((vehicle, i) => (
              <motion.div
                key={vehicle.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: (i % 20) * 0.05 }}
                className="bg-white dark:bg-slate-900/60 backdrop-blur-sm border border-gray-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                    <Car size={24} />
                  </div>
                </div>
                
                <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-1">{vehicle.brand}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-6 line-clamp-1">{vehicle.model}</p>

                <div className="mt-auto space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                      <Battery size={16} className="text-emerald-500" />
                      Batarya
                    </span>
                    <span className="font-semibold text-slate-900 dark:text-slate-200">{vehicle.batteryCapacityKWh} kWh</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                      <Zap size={16} className="text-amber-500" />
                      Menzil (WLTP)
                    </span>
                    <span className="font-semibold text-slate-900 dark:text-slate-200">{vehicle.rangeKm} km</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                      <Zap size={16} className="text-blue-500" />
                      Tüketim (WLTP)
                    </span>
                    <span className="font-semibold text-slate-900 dark:text-slate-200">{vehicle.averageConsumptionKWhPer100Km || '?'} kWh/100km</span>
                  </div>
                  <div className="flex items-center justify-between text-sm pt-3 border-t border-gray-100 dark:border-slate-800">
                    <span className="text-slate-500 dark:text-slate-500">Gerçek Menzil</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400">~{Math.round(vehicle.rangeKm * 0.9)} km</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      
      {/* SEO Content Section */}
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 mb-8">
        <div className="bg-white dark:bg-slate-900/40 rounded-3xl p-8 sm:p-12 border border-gray-100 dark:border-slate-800/60 shadow-sm prose prose-slate dark:prose-invert max-w-none">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-6 border-b border-gray-100 dark:border-slate-800 pb-4">
            Elektrikli Araç Menzil ve Batarya Rehberi
          </h2>
          
          <div className="space-y-6 text-slate-600 dark:text-slate-300 leading-relaxed">
            <p className="text-lg">
              Elektrikli araç (EV) devrimi tüm dünyada olduğu gibi Türkiye'de de hız kesmeden devam ediyor. Yeni bir elektrikli otomobil almayı düşünenlerin veya mevcut aracını daha verimli kullanmak isteyenlerin en çok araştırdığı konuların başında <strong>elektrikli araç menzili</strong> ve <strong>batarya kapasitesi</strong> geliyor. ŞarjRota olarak, Tesla, Togg, BMW, Mercedes-Benz, Hyundai ve daha birçok markanın sunduğu en güncel elektrikli otomobillerin teknik verilerini tek bir platformda topladık. Amacımız, elektrikli mobiliteye geçiş sürecinizde size en doğru ve şeffaf bilgiyi sunmaktır.
            </p>
            
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-4">Elektrikli Araç Menzili Nedir ve Neden Önemlidir?</h3>
            <p>
              Elektrikli araç menzili, aracın bataryasının tam dolu (%100) durumundan tamamen boş (%0) durumuna gelene kadar kat edebileceği maksimum mesafeyi ifade eder. İçten yanmalı motorlu araçlardaki "bir depo yakıtla gidilebilecek mesafe" kavramının elektrikli araçlardaki karşılığıdır. Menzil, seyahat planlamalarınızın temelini oluşturur ve özellikle şehirlerarası yolculuklarda "menzil kaygısı" (range anxiety) yaşamamanız için aracınızın kapasitesini iyi tanımanız büyük önem taşır.
            </p>

            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-4">WLTP Menzili ile Gerçek Menzil Arasındaki Farklar Nelerdir?</h3>
            <p>
              Otomobil markalarının kataloglarında gördüğünüz menzil değerleri genellikle <strong>WLTP (Worldwide Harmonised Light Vehicles Test Procedure)</strong> adı verilen uluslararası bir test standartına göre belirlenir. Bu standart, laboratuvar ortamında optimize edilmiş şartlar altında (ideal sıcaklık, düşük rüzgar direnci vb.) elde edilir. 
            </p>
            <p>
              Ancak günlük kullanımda elde edeceğiniz <strong>gerçek menzil</strong> şu faktörlere bağlı olarak WLTP değerinden farklılık gösterebilir:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Hava Durumu:</strong> Özellikle soğuk kış aylarında batarya kimyası gereği performans düşer. Ayrıca kabin ısıtması (kalorifer) ciddi enerji tüketir.</li>
              <li><strong>Sürüş Hızı:</strong> Otoyol hızlarında (120 km/s ve üzeri) aerodinamik direnç arttığı için enerji tüketimi şehir içi kullanıma göre çok daha yüksektir.</li>
              <li><strong>Klima ve Isıtma:</strong> Klima, koltuk ısıtma ve direksiyon ısıtma gibi donanımların aktif kullanımı menzili %10-15 oranında etkileyebilir.</li>
              <li><strong>Sürüş Tarzı:</strong> Agresif hızlanmalar ve ani frenlemeler yerine, reküperasyon (geri kazanım) sistemini aktif kullanarak menzilinizi uzatabilirsiniz.</li>
            </ul>
            <p>
              ŞarjRota algoritması, kullanıcılarına en güvenilir seyahat deneyimini sunmak için rota planlamalarında genellikle <strong>WLTP verisinin yaklaşık %90'ını gerçek menzil</strong> olarak kabul eder. Böylece yolda beklenmedik sürprizlerle karşılaşma riskiniz minimuma iner.
            </p>

            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-4">Batarya Kapasitesi (kWh) Ne Anlama Gelir?</h3>
            <p>
              Batarya kapasitesi, bir elektrikli aracın depolayabileceği toplam elektrik enerjisi miktarını ifade eder ve <strong>kWh (Kilowatt-saat)</strong> birimiyle ölçülür. Tıpkı benzinli bir aracın yakıt deposunun litre cinsinden hacmi gibi düşünebilirsiniz. Örneğin; 60 kWh kapasiteli bir batarya, 90 kWh kapasiteli bir bataryaya göre daha az enerji depolar.
            </p>
            <p>
              Ancak sadece yüksek batarya kapasitesi uzun menzil anlamına gelmez. Aracın aerodinamik yapısı, ağırlığı ve motor verimliliği de <strong>100 km'deki enerji tüketimi (kWh/100km)</strong> değerini belirler. Verimli bir araç, daha küçük bir batarya ile daha uzun mesafe kat edebilir.
            </p>

            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-4">ŞarjRota ile Güvenli ve Kesintisiz Seyahat Planlaması</h3>
            <p>
              Sayfamızda yer alan arama ve filtreleme özelliklerini kullanarak ihtiyaçlarınıza en uygun elektrikli otomobili inceleyebilirsiniz. Elektrikli aracınızı seçtikten sonra, ŞarjRota platformu üzerinden rotanızı oluşturduğunuzda sistemimiz; aracınızın batarya kapasitesini, gerçekçi menzilini ve şarj istasyonlarının konumlarını analiz ederek size en ideal şarj duraklarını otomatik olarak önerir. Elektrikli sürüş deneyiminizi stressiz ve keyifli hale getirmek için verilerimizi sürekli güncelliyoruz.
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
