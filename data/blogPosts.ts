export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  seoTitle: string;
  seoDescription: string;
}

/**
 * Blog yazıları burada merkezi olarak yönetilir.
 * Yeni yazı eklemek için bu diziye yeni bir obje eklemen yeterli.
 * Yazının içeriğini ise /src/pages/blog/ klasöründe slug adıyla bir bileşen oluşturarak eklersin.
 */
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'sarj-istasyonu-isgal-cezasi',
    title: 'Şarj İstasyonu İşgal Cezası ve Ücretleri Nelerdir?',
    excerpt: 'Elektrikli aracınızı şarj ettikten sonra istasyonu terk etmezseniz ne olur? 2026 güncel işgal ücretleri ve cezaları hakkında bilmeniz gereken her şey.',
    date: '24 Mayıs 2026',
    readTime: '3 dk',
    category: 'Mevzuat & Ücretler',
    image: '/blog-images/sarj-istasyonu-isgal-cezasi.jpg',
    seoTitle: 'Şarj İstasyonu İşgal Cezası ve Ücretleri (2026) | ŞarjRota Blog',
    seoDescription: 'Elektrikli aracınızı şarj ettikten sonra istasyonu terk etmezseniz ne olur? Eşarj, ZES, Trugo gibi firmaların 2026 işgal ücretleri ve cezalarını öğrenin.',
  },
];

/** Slug'a göre blog yazısını bul */
export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find(p => p.slug === slug);
}
