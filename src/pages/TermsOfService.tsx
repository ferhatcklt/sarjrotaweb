import { Link } from 'react-router-dom';
import { FileText, ChevronLeft } from 'lucide-react';
import { Footer } from '../components/Footer';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 font-medium transition-colors">
          <ChevronLeft className="w-5 h-5 mr-1" />
          Anasayfaya Dön
        </Link>
        
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 sm:p-12">
          <div className="flex items-center gap-3 mb-8 pb-8 border-b border-slate-100">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Kullanım Şartları</h1>
              <p className="text-slate-500 mt-1">Son güncellenme: {new Date().toLocaleDateString('tr-TR')}</p>
            </div>
          </div>

          <div className="prose prose-slate max-w-none">
            <p className="lead text-lg text-slate-600 mb-8">
              Lütfen ŞarjRota web sitesini ve uygulamasını kullanmadan önce bu kullanım şartlarını dikkatlice okuyunuz. Sitemizi veya uygulamamızı kullanarak bu şartları kabul etmiş sayılırsınız.
            </p>

            <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">1. Hizmetin Niteliği</h2>
            <p className="mb-4 text-slate-600 leading-relaxed">
              ŞarjRota, elektrikli araç kullanıcılarına referans amaçlı şarj istasyonu rotaları oluşturan bir optimizasyon servisidir. Sistem tarafından sağlanan menzil, süre, mesafe ve istasyon bilgileri <strong>tahmini verilerdir</strong>. Gerçek yol koşulları, trafik, hava durumu, sürüş tarzı ve cihaz farklılıkları sebebiyle sonuçlar sapma gösterebilir.
            </p>

            <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">2. Sorumluluk Reddi (Disclaimer)</h2>
            <p className="mb-4 text-slate-600 leading-relaxed">
              ŞarjRota, sunulan rotaların veya şarj istasyonlarının 100% doğruluğunu veya o an çalışır durumda olduğunu garanti edemez. Yola çıkmadan önce:
            </p>
            <ul className="list-disc pl-6 mb-4 text-slate-600 space-y-2">
              <li>Menzil planlamanızı yaparken mutlaka güvenlik payı (marj) bırakın.</li>
              <li>Şarj istasyonlarının (ZES, Trugo, Eşarj, Tesla vb.) güncel durumlarını ilgili sağlayıcının kendi resmi uygulamasından teyit edin.</li>
              <li>Yolda kalma, maddi hasar veya zaman kaybı gibi durumlardan ŞarjRota sorumlu tutulamaz.</li>
            </ul>

            <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">3. Fikri Mülkiyet Hakları</h2>
            <p className="mb-4 text-slate-600 leading-relaxed">
              ŞarjRota üzerinde yer alan tasarım, algoritma, arayüz, logolar ve yazılım kodları ŞarjRota'ya aittir ve izinsiz kopyalanamaz. Ancak kullanılan harita altlıkları (OpenStreetMap) ve istasyon verileri, ilgili kuruluşların lisanslarına (örneğin ODbL) tabidir.
            </p>

            <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">4. Kullanıcı Davranışları</h2>
            <p className="mb-4 text-slate-600 leading-relaxed">
              Kullanıcılar sistemi kötüye kullanamaz (örneğin otomatize edilmiş aşırı bot istekleri atmak, sistem API'sini tersine mühendislik ile yetkisiz kopyalamak). Bu tarz durumlarda IP adresiniz sistemden uzaklaştırılabilir (Rate Limit ve IP Ban).
            </p>

            <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">5. Değişiklikler</h2>
            <p className="mb-4 text-slate-600 leading-relaxed">
              ŞarjRota önceden haber vermeksizin sistemin işleyişini, algoritmasını veya bu kullanım şartlarını değiştirme hakkını saklı tutar.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
