import { Link } from 'react-router-dom';
import { ShieldCheck, ChevronLeft } from 'lucide-react';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#030712] font-['Inter'] transition-colors flex flex-col">
      <SEO 
        title="Gizlilik Politikası | ŞarjRota"
        description="ŞarjRota gizlilik politikası, verilerinizin nasıl işlendiği ve korunduğu hakkında detaylı bilgiler içerir."
      />
      <div className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16">
        <Link to="/" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-8 font-medium transition-colors">
          <ChevronLeft className="w-5 h-5 mr-1" />
          Anasayfaya Dön
        </Link>
        
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 sm:p-12 transition-colors">
          <div className="flex items-center gap-3 mb-8 pb-8 border-b border-slate-100 dark:border-slate-800">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Gizlilik Politikası</h1>
              <p className="text-slate-500 dark:text-slate-400 mt-1">Son güncellenme: 18 Mayıs 2026</p>
            </div>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="lead text-lg text-slate-600 dark:text-slate-300 mb-8">
              ŞarjRota olarak ("Biz", "Sistem" veya "ŞarjRota"), gizliliğinize büyük önem veriyoruz. 
              Bu Gizlilik Politikası, web sitemizi ve mobil uygulamamızı kullanırken toplanan bilgilerin nasıl kullanıldığını ve korunduğunu açıklamaktadır.
            </p>

            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mt-8 mb-4">1. Toplanan Bilgiler</h2>
            <p className="mb-4 text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>Konum Verileri:</strong> Rota planlaması yapabilmeniz için başlangıç ve varış noktalarınızı işlemekteyiz. Bu veriler yalnızca anlık rota hesaplaması için kullanılır ve sunucularımızda sizinle ilişkilendirilerek kalıcı olarak <strong>saklanmaz</strong>.
            </p>
            <p className="mb-4 text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>Araç Tercihleri:</strong> Hesaplama sırasında seçtiğiniz elektrikli araç marka, model ve şarj tipi verileri, rotanızdaki uygun istasyonları bulmak için anonim olarak işlenir.
            </p>
            <p className="mb-4 text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>Cihaz ve Kullanım Verileri:</strong> Hizmet kalitemizi artırmak amacıyla IP adresi, tarayıcı türü, işletim sistemi ve anonim kullanım istatistikleri toplanabilir.
            </p>

            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mt-8 mb-4">2. Verilerin Kullanımı</h2>
            <p className="mb-4 text-slate-600 dark:text-slate-300 leading-relaxed">
              Toplanan anonim veriler şu amaçlarla kullanılır:
            </p>
            <ul className="list-disc pl-6 mb-4 text-slate-600 dark:text-slate-300 space-y-2">
              <li>Talep ettiğiniz şarj rotası optimizasyon hizmetini sağlamak.</li>
              <li>Sistem performansını iyileştirmek ve olası hataları tespit etmek.</li>
              <li>Trafik yoğunluğu ve şarj istasyonu taleplerini anonim olarak analiz etmek.</li>
            </ul>

            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mt-8 mb-4">3. Çerezler ve Analitik Araçlar</h2>
            <p className="mb-4 text-slate-600 dark:text-slate-300 leading-relaxed">
              Web sitemizde aşağıdaki çerez ve izleme teknolojileri kullanılmaktadır:
            </p>
            <ul className="list-disc pl-6 mb-4 text-slate-600 dark:text-slate-300 space-y-2">
              <li><strong>Zorunlu Çerezler:</strong> Seçtiğiniz araç modeli, tercih edilen tema (koyu/açık mod) ve filtre ayarlarını cihazınızda hatırlamak için <em>Local Storage</em> kullanılır. Bu veriler yalnızca tarayıcınızda saklanır ve sunucularımıza gönderilmez.</li>
              <li><strong>Google Analytics (GA4):</strong> Site trafiğini ve kullanım istatistiklerini anonim olarak analiz etmek amacıyla Google Analytics 4 (Ölçüm ID: G-5RKDXVG4PP) kullanılmaktadır. Google Analytics, tarayıcı çerezleri ve benzer teknolojiler aracılığıyla anonim ziyaretçi verileri toplar. Google'ın veri işleme politikalarına <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">buradan</a> ulaşabilirsiniz.</li>
              <li><strong>Cloudflare Web Analytics:</strong> Sayfa yükleme performansını ölçmek için Cloudflare Web Analytics kullanılabilir. Bu hizmet çerez kullanmaz ve kişisel veri toplamaz.</li>
            </ul>
            <p className="mb-4 text-slate-600 dark:text-slate-300 leading-relaxed">
              Sitemize ilk girişinizde çerez tercihlerinizi belirleyebileceğiniz bir bildirim gösterilir. "Sadece Zorunlular" seçeneğini tercih ederseniz, Google Analytics çerezleri devre dışı bırakılır. Tarayıcı ayarlarınızdan da çerezleri silebilir veya engelleyebilirsiniz.
            </p>

            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mt-8 mb-4">4. Veri Paylaşımı ve Üçüncü Taraflar</h2>
            <p className="mb-4 text-slate-600 dark:text-slate-300 leading-relaxed">
              Kişisel verilerinizi kesinlikle reklam veya pazarlama amacıyla satmıyoruz. Ancak, sistemin temel fonksiyonlarını çalıştırabilmek adına harita ve yol tarifi altyapısı sunan (örneğin OSRM - Open Source Routing Machine ve OpenStreetMap) hizmet sağlayıcılarına anonim koordinat verileri gönderilmektedir.
            </p>

            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mt-8 mb-4">5. Veri Güvenliği</h2>
            <p className="mb-4 text-slate-600 dark:text-slate-300 leading-relaxed">
              Veri iletimi sırasında SSL/TLS şifreleme yöntemleri kullanıyoruz. Sunucularımız (Hetzner altyapısı) güncel güvenlik standartlarıyla korunmaktadır. API erişimleri, API Key doğrulaması ve Rate Limiting mekanizmalarıyla korunmaktadır.
            </p>

            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mt-8 mb-4">6. Kullanıcı Hakları (KVKK / GDPR)</h2>
            <p className="mb-4 text-slate-600 dark:text-slate-300 leading-relaxed">
              6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) ve Avrupa Genel Veri Koruma Tüzüğü (GDPR) kapsamında aşağıdaki haklara sahipsiniz:
            </p>
            <ul className="list-disc pl-6 mb-4 text-slate-600 dark:text-slate-300 space-y-2">
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme.</li>
              <li>İşlenmişse buna ilişkin bilgi talep etme.</li>
              <li>Verilerin silinmesini veya yok edilmesini isteme.</li>
              <li>Analitik çerezleri reddetme (çerez onay ekranından veya tarayıcı ayarlarından).</li>
            </ul>

            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mt-8 mb-4">7. Sorumluluk Reddi</h2>
            <p className="mb-4 text-slate-600 dark:text-slate-300 leading-relaxed">
              ŞarjRota tarafından sağlanan şarj istasyonu konumları, fiyatları ve menzil hesaplamaları <strong>tahmini</strong> nitelikte olup, bilgilendirme amaçlıdır. 
              Gerçek koşullarla farklılık gösterebilir. Yolda kalma, yanlış yönlendirme veya herhangi bir maddi/manevi zarar durumunda ŞarjRota sorumlu tutulamaz.
            </p>

            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mt-8 mb-4">8. İletişim</h2>
            <p className="mb-4 text-slate-600 dark:text-slate-300 leading-relaxed">
              Gizlilik politikamız ile ilgili sorularınız veya veri silme talepleriniz için <strong>info@sarjrota.com.tr</strong> adresinden bizimle iletişime geçebilirsiniz.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
