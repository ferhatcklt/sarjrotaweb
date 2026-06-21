export interface BrandStats {
  brandName: string;
  brandSlug: string;
  totalStations: number;
  totalAcConnectors: number;
  totalDcConnectors: number;
  maxPowerKw: number;
  topCities: string[];
  pricing: {
    ac: number;
    dc: number;
    note: string | null;
  } | null;
}

/**
 * Markaların resmi web siteleri.
 * UTM parametreleri ile birlikte kullanılır.
 */
const BRAND_URLS: Record<string, string> = {
  'ZES':              'https://zes.net',
  'Eşarj':            'https://esarj.com',
  'Trugo':            'https://trugo.com.tr',
  'Tesla':            'https://www.tesla.com/tr_tr/supercharger',
  'Voltrun':          'https://voltrun.com',
  'Sharz.net':        'https://sharz.net',
  'Astor':            'https://astorenergy.com.tr',
  'Ovolt':            'https://ovolt.com.tr',
  'Neva':             'https://nevasarj.com.tr',
  'Wat Mobilite':     'https://watmobilite.com',
  'En Yakıt':         'https://enyakit.com',
  'Aksa Şarj':        'https://aksasarj.com.tr',
  'RST Chargepoint':  'https://rstchargepoint.com',
};

/**
 * Marka slug'ına göre UTM'li resmi site linkini döndürür.
 */
const getBrandUrl = (brandName: string): string | null => {
  const baseUrl = BRAND_URLS[brandName];
  if (!baseUrl) return null;
  const utmParams = new URLSearchParams({
    utm_source: 'sarjrota',
    utm_medium: 'blog',
    utm_campaign: 'marka_sayfasi',
    utm_content: brandName.toLowerCase().replace(/[^a-z0-9]/g, '_'),
  });
  return `${baseUrl}?${utmParams.toString()}`;
};

export const getBrandSeoContent = (stats: BrandStats) => {
  const { brandName, totalStations, maxPowerKw, topCities, pricing, totalDcConnectors } = stats;
  const isFastCharge = maxPowerKw >= 120 || totalDcConnectors > 0;
  const officialUrl = getBrandUrl(brandName);
  const officialLink = officialUrl
    ? `[${brandName} resmi web sitesi](${officialUrl})`
    : `${brandName} resmi web sitesi`;
  
  return `
Elektrikli araç sahiplerinin güvenle seyahat edebilmesi için en önemli konulardan biri, yolda kesintisiz ve hızlı şarj imkanı bulabilmektir. Bu noktada **${brandName} elektrikli araç şarj istasyonu** ağı, sürücülere modern ve erişilebilir çözümler sunmaktadır. Türkiye genelinde genişleyen altyapısıyla **${brandName}**, elektrikli aracınızı (EV) şarj ederken zaman kazanmanızı ve yola kaldığınız yerden devam etmenizi sağlar.


## ${brandName} İstasyonları Nerede Bulunur?

Şu an itibarıyla sistemimizde kayıtlı **toplam ${totalStations} adet ${brandName} şarj istasyonu** bulunmaktadır. Özellikle şehirlerarası yolculuklarda stratejik noktalara konumlandırılmış bu istasyonlar sayesinde menzil endişesi (range anxiety) yaşamadan seyahat edebilirsiniz. En çok istasyonun bulunduğu iller arasında ${topCities.join(', ')} gibi lokasyonlar öne çıkmaktadır. **ŞarjRota** haritamızı kullanarak size en yakın ${brandName} AC şarj veya DC hızlı şarj noktasını saniyeler içinde bulabilir ve yol tarifinizi alabilirsiniz.


## AC Şarj ve DC Hızlı Şarj İmkanları

${isFastCharge ? `Zamanın ne kadar kıymetli olduğunun farkında olan ${brandName}, **${maxPowerKw} kW'a varan süper hızlı şarj (DC - Direct Current)** üniteleriyle aracınızın bataryasını çok kısa bir sürede %80 doluluğa ulaştırmayı hedefler.` : `**${brandName} AC (Alternatif Akım) şarj üniteleri**, aracınızı park halindeyken (AVM, otel, otopark) sağlıklı ve güvenli bir şekilde doldurmanız için ideal bir çözümdür.`} 

Ağ genelinde toplam ${stats.totalAcConnectors} adet AC (Tip 2) ve ${stats.totalDcConnectors} adet DC (CCS) soket kullanıma sunulmuştur. Aracınızın batarya kapasitesine (kWh) ve desteklediği maksimum şarj hızına bağlı olarak, ${brandName} istasyonlarında en verimli şarj deneyimini yaşayabilirsiniz.


## ${brandName} Şarj Fiyatları ve 2026 Tarifesi (kWh)

Elektrikli araç şarj ücretleri, istasyonun sunduğu güce (AC veya DC) göre değişiklik göstermektedir. Şeffaf fiyatlandırma politikası sayesinde sürpriz faturayla karşılaşmazsınız. **${brandName} 2026 yılı güncel şarj fiyatları** (kWh başına) aşağıdaki gibidir:

${pricing ? `
* **AC Şarj (22 kW'a kadar):** ${pricing.ac.toFixed(2).replace('.', ',')} ₺ / kWh
* **DC Hızlı Şarj (50 kW ve üzeri):** ${pricing.dc.toFixed(2).replace('.', ',')} ₺ / kWh
${pricing.note ? `* *Not:* ${pricing.note}` : ''}
` : '*Güncel fiyat bilgisi için uygulamanın harita ekranını ziyaret edin.*'}

*Fiyatlara KDV dahildir ve EPDK (Enerji Piyasası Düzenleme Kurumu) mevzuatlarına göre dönem dönem güncellenmektedir. Güncel tarifeler için ${officialLink}'ni ziyaret edebilirsiniz.* 


## Nasıl Ödeme Yapılır? (Ödeme Sistemleri ve Uygulama)

${brandName} istasyonlarında şarj işlemini başlatmak ve ödemenizi gerçekleştirmek oldukça kolaydır. Akıllı telefonunuza indireceğiniz resmi ${brandName} mobil uygulaması üzerinden üyelik oluşturabilir, kredi kartınızı sisteme güvenle kaydedebilirsiniz. 

1. **Uygulama ile Karekod (QR) Okutma:** İstasyon üzerindeki QR kodu okutarak şarjı anında başlatabilirsiniz.
2. **RFID Kart:** Talep etmeniz halinde gönderilen RFID kartı cihaza okutarak temassız şarj imkanından faydalanabilirsiniz.
3. **Kredi Kartı / Masterpass:** Şarj işlemi bittiğinde ücret, kayıtlı kartınızdan otomatik ve güvenli (3D Secure) olarak tahsil edilir. Bazı lokasyonlarda doğrudan kredi kartı ile ödeme yapabileceğiniz pos cihazları da bulunabilmektedir.

Detaylı bilgi ve uygulama indirme bağlantıları için ${officialLink}'ni ziyaret edebilirsiniz.


## Sorumluluk Reddi (Disclaimer)

Bu sayfada yer alan **${brandName} şarj fiyatları, istasyon sayıları, AC/DC soket bilgileri ve lokasyon verileri** tamamen bilgilendirme amaçlıdır. Veriler düzenli olarak güncellense de, anlık cihaz arızaları, bakım çalışmaları veya markanın inisiyatifindeki ani tarife değişiklikleri nedeniyle farklılıklar görülebilir. Kesin ve en güncel veriler için her zaman istasyon üzerindeki ekranları veya ilgili markanın resmi mobil uygulamasını referans alınız. ŞarjRota, doğabilecek mağduriyetlerden yasal olarak sorumlu tutulamaz.
  `.trim();
};
