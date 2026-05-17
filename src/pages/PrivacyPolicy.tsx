import { Link } from 'react-router-dom';
import { ShieldCheck, ChevronLeft } from 'lucide-react';
import { Footer } from '../components/Footer';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 font-medium transition-colors">
          <ChevronLeft className="w-5 h-5 mr-1" />
          Anasayfaya Dön
        </Link>
        
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 sm:p-12">
          <div className="flex items-center gap-3 mb-8 pb-8 border-b border-slate-100">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Gizlilik Politikası</h1>
              <p className="text-slate-500 mt-1">Son güncellenme: {new Date().toLocaleDateString('tr-TR')}</p>
            </div>
          </div>

          <div className="prose prose-slate max-w-none">
            <p className="lead text-lg text-slate-600 mb-8">
              ŞarjRota olarak ("Biz", "Sistem" veya "ŞarjRota"), gizliliğinize büyük önem veriyoruz. 
              Bu Gizlilik Politikası, web sitemizi ve mobil uygulamamızı kullanırken toplanan bilgilerin nasıl kullanıldığını ve korunduğunu açıklamaktadır.
            </p>

            <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">1. Toplanan Bilgiler</h2>
            <p className="mb-4 text-slate-600 leading-relaxed">
              <strong>Konum Verileri:</strong> Rota planlaması yapabilmeniz için başlangıç ve varış noktalarınızı işlemekteyiz. Bu veriler yalnızca anlık rota hesaplaması için kullanılır ve sunucularımızda sizinle ilişkilendirilerek kalıcı olarak <strong>saklanmaz</strong>.
            </p>
            <p className="mb-4 text-slate-600 leading-relaxed">
              <strong>Araç Tercihleri:</strong> Hesaplama sırasında seçtiğiniz elektrikli araç marka, model ve şarj tipi verileri, rotanızdaki uygun istasyonları bulmak için anonim olarak işlenir.
            </p>
            <p className="mb-4 text-slate-600 leading-relaxed">
              <strong>Cihaz ve Kullanım Verileri:</strong> Hizmet kalitemizi artırmak amacıyla IP adresi, tarayıcı türü, işletim sistemi ve anonim kullanım istatistikleri toplanabilir.
            </p>

            <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">2. Verilerin Kullanımı</h2>
            <p className="mb-4 text-slate-600 leading-relaxed">
              Toplanan anonim veriler şu amaçlarla kullanılır:
            </p>
            <ul className="list-disc pl-6 mb-4 text-slate-600 space-y-2">
              <li>Talep ettiğiniz şarj rotası optimizasyon hizmetini sağlamak.</li>
              <li>Sistem performansını iyileştirmek ve olası hataları tespit etmek.</li>
              <li>Trafik yoğunluğu ve şarj istasyonu taleplerini anonim olarak analiz etmek.</li>
            </ul>

            <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">3. Veri Paylaşımı ve Üçüncü Taraflar</h2>
            <p className="mb-4 text-slate-600 leading-relaxed">
              Kişisel verilerinizi kesinlikle reklam veya pazarlama amacıyla satmıyoruz. Ancak, sistemin temel fonksiyonlarını çalıştırabilmek adına harita ve yol tarifi altyapısı sunan (örneğin OSRM - Open Source Routing Machine ve OpenStreetMap) hizmet sağlayıcılarına anonim koordinat verileri gönderilmektedir.
            </p>

            <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">4. Çerezler (Cookies)</h2>
            <p className="mb-4 text-slate-600 leading-relaxed">
              Web sitemizde, seçtiğiniz araç modelini veya filtreleri cihazınızda hatırlamak için "Local Storage" ve zaruri çerezler kullanılabilir. Bu, deneyiminizi hızlandırmak içindir. Tarayıcı ayarlarınızdan çerezleri silebilirsiniz.
            </p>

            <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">5. Veri Güvenliği</h2>
            <p className="mb-4 text-slate-600 leading-relaxed">
              Veri iletimi sırasında SSL/TLS şifreleme yöntemleri kullanıyoruz. Sunucularımız (Hetzner altyapısı) güncel güvenlik standartlarıyla korunmaktadır.
            </p>

            <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">6. İletişim</h2>
            <p className="mb-4 text-slate-600 leading-relaxed">
              Gizlilik politikamız ile ilgili sorularınız veya veri silme talepleriniz için bizimle iletişime geçebilirsiniz.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
