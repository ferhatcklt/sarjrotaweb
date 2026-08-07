'use client';

import Link from 'next/link';
import { FileText, ChevronLeft, AlertTriangle } from 'lucide-react';
import { Footer } from '@/components/Footer';
// import { SEO } // SEO removed - use Next.js metadata;

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#030712] font-['Inter'] transition-colors flex flex-col">
      <div className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16">
        <Link href="/" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-8 font-medium transition-colors">
          <ChevronLeft className="w-5 h-5 mr-1" />
          Anasayfaya Dön
        </Link>
        
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 sm:p-12 transition-colors">
          <div className="flex items-center gap-3 mb-8 pb-8 border-b border-slate-100 dark:border-slate-800">
            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Kullanım Şartları</h1>
              <p className="text-slate-500 dark:text-slate-400 mt-1">Son güncellenme: 18 Mayıs 2026</p>
            </div>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="lead text-lg text-slate-600 dark:text-slate-300 mb-8">
              Lütfen ŞarjRota web sitesini ve uygulamasını kullanmadan önce bu kullanım şartlarını dikkatlice okuyunuz. Sitemizi veya uygulamamızı kullanarak bu şartları kabul etmiş sayılırsınız.
            </p>

            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mt-8 mb-4">1. Hizmetin Niteliği</h2>
            <p className="mb-4 text-slate-600 dark:text-slate-300 leading-relaxed">
              ŞarjRota, elektrikli araç kullanıcılarına referans amaçlı şarj istasyonu rotaları oluşturan bir optimizasyon servisidir. Sistem tarafından sağlanan menzil, süre, mesafe ve istasyon bilgileri <strong>tahmini verilerdir</strong>. Gerçek yol koşulları, trafik, hava durumu, sürüş tarzı ve cihaz farklılıkları sebebiyle sonuçlar sapma gösterebilir.
            </p>

            {/* Sorumluluk Reddi - Vurgulu Kutu */}
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-xl p-6 my-8">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-xl font-semibold text-amber-900 dark:text-amber-300 mb-3">2. Sorumluluk Reddi (Disclaimer)</h2>
                  <p className="mb-3 text-amber-800 dark:text-amber-200/80 leading-relaxed">
                    ŞarjRota, sunulan rotaların veya şarj istasyonlarının %100 doğruluğunu veya o an çalışır durumda olduğunu <strong>garanti edemez</strong>. Yola çıkmadan önce:
                  </p>
                  <ul className="list-disc pl-6 mb-3 text-amber-800 dark:text-amber-200/80 space-y-2">
                    <li>Menzil planlamanızı yaparken mutlaka güvenlik payı (marj) bırakın.</li>
                    <li>Şarj istasyonlarının (ZES, Trugo, Eşarj, Tesla vb.) güncel durumlarını ilgili sağlayıcının kendi resmi uygulamasından teyit edin.</li>
                    <li>Tahmini maliyet hesaplamaları ortalama kWh fiyatlarına dayalıdır; gerçek fiyatlar farklılık gösterebilir.</li>
                  </ul>
                  <p className="text-amber-800 dark:text-amber-200/80 leading-relaxed font-semibold">
                    Yolda kalma, maddi hasar, zaman kaybı veya herhangi bir dolaylı/doğrudan zarar durumunda ŞarjRota ve geliştiricileri sorumlu tutulamaz. 
                    Kullanıcı, hizmeti tamamen kendi sorumluluğunda kullanmayı kabul eder.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mt-8 mb-4">3. Veri Doğruluğu ve Güncellik</h2>
            <p className="mb-4 text-slate-600 dark:text-slate-300 leading-relaxed">
              Şarj istasyonu verileri, çeşitli açık kaynaklardan ve kullanıcı katkılarıyla derlenmektedir. İstasyonların konumları, çalışma saatleri, konnektör tipleri ve fiyatlandırmaları zaman içinde değişiklik gösterebilir. ŞarjRota, bu verilerin her an güncel ve eksiksiz olduğunu taahhüt etmez.
            </p>

            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mt-8 mb-4">4. Fikri Mülkiyet Hakları</h2>
            <p className="mb-4 text-slate-600 dark:text-slate-300 leading-relaxed">
              ŞarjRota üzerinde yer alan tasarım, algoritma, arayüz, logolar ve yazılım kodları ŞarjRota'ya aittir ve izinsiz kopyalanamaz. Ancak kullanılan harita altlıkları (OpenStreetMap) ve istasyon verileri, ilgili kuruluşların lisanslarına (örneğin ODbL) tabidir.
            </p>

            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mt-8 mb-4">5. Kullanıcı Davranışları</h2>
            <p className="mb-4 text-slate-600 dark:text-slate-300 leading-relaxed">
              Kullanıcılar sistemi kötüye kullanamaz (örneğin otomatize edilmiş aşırı bot istekleri atmak, sistem API'sini tersine mühendislik ile yetkisiz kopyalamak). Bu tarz durumlarda IP adresiniz sistemden uzaklaştırılabilir (Rate Limit ve IP Ban).
            </p>

            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mt-8 mb-4">6. Çerezler, İzleme ve Hata Raporlama</h2>
            <p className="mb-4 text-slate-600 dark:text-slate-300 leading-relaxed">
              Bu web sitesi ve mobil uygulamamız, kullanıcı deneyimini iyileştirmek ve hataları tespit etmek için zorunlu çerezler (Local Storage), analitik araçlar (Google Analytics, Firebase) ve hata raporlama servisleri (Crashlytics) kullanmaktadır. 
              Siteye ilk girişte gösterilen çerez onay bildirimi aracılığıyla tercihlerinizi belirleyebilirsiniz. Mobil uygulamamızda toplanan hata raporları anonim olup kişisel veri içermez. 
              Detaylı bilgi için <Link href="/gizlilik" className="text-blue-600 dark:text-blue-400 underline">Gizlilik Politikamızı</Link> inceleyiniz.
            </p>

            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mt-8 mb-4">7. Hizmet Kesintileri</h2>
            <p className="mb-4 text-slate-600 dark:text-slate-300 leading-relaxed">
              ŞarjRota, bakım, güncelleme veya teknik sorunlar nedeniyle hizmeti önceden haber vermeksizin geçici olarak durdurabilir. Bu durumlardan kaynaklanan zararlardan sorumlu tutulamaz.
            </p>

            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mt-8 mb-4">8. ŞarjRota Pro (Premium Abonelik) Şartları</h2>
            <ul className="mb-4 text-slate-600 dark:text-slate-300 leading-relaxed list-disc pl-6 space-y-2">
              <li><strong>Abonelik Seçenekleri:</strong> Uygulama içerisinde aylık, yıllık veya ömür boyu (tek seferlik ödeme) premium seçenekleri sunulmaktadır.</li>
              <li><strong>Ödeme:</strong> Ödemeler, satın alma işleminin onaylanması ile birlikte iTunes / Google Play hesabınızdan tahsil edilecektir.</li>
              <li><strong>Otomatik Yenileme:</strong> Aylık ve yıllık abonelikler, mevcut dönemin bitiminden en az 24 saat önce otomatik yenileme kapatılmadığı sürece otomatik olarak yenilenir.</li>
              <li><strong>Yenileme Ücreti:</strong> Mevcut dönemin bitimine 24 saat kala, hesabınızdan yenileme ücreti tahsil edilecek ve yenileme maliyeti belirlenecektir.</li>
              <li><strong>Abonelik Yönetimi:</strong> Kullanıcılar aboneliklerini yönetebilir ve satın alma işleminden sonra cihazlarındaki Hesap Ayarları'na giderek otomatik yenilemeyi kapatabilirler.</li>
              <li><strong>İptal:</strong> Aktif abonelik dönemi boyunca mevcut aboneliğin iptaline izin verilmez. İptal işlemi, bir sonraki fatura döneminden itibaren geçerli olur.</li>
              <li><strong>Deneme Sürümü:</strong> Ücretsiz deneme süresinin kullanılmayan kısımları (eğer sunulmuşsa), kullanıcı bir abonelik satın aldığında kaybedilecektir.</li>
            </ul>

            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mt-8 mb-4">9. Değişiklikler</h2>
            <p className="mb-4 text-slate-600 dark:text-slate-300 leading-relaxed">
              ŞarjRota önceden haber vermeksizin sistemin işleyişini, algoritmasını veya bu kullanım şartlarını değiştirme hakkını saklı tutar. Güncel şartlar bu sayfada yayınlanır.
            </p>

            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mt-8 mb-4">10. Uygulanacak Hukuk</h2>
            <p className="mb-4 text-slate-600 dark:text-slate-300 leading-relaxed">
              Bu kullanım şartları Türkiye Cumhuriyeti kanunlarına tabidir. Olası uyuşmazlıklarda Türkiye Cumhuriyeti mahkemeleri yetkilidir.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
