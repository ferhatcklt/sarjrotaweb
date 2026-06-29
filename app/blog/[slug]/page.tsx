import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BLOG_POSTS, getBlogPost } from '@/data/blogPosts';
import BlogArticleClient from './BlogArticleClient';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

interface Props {
  params: Promise<{ slug: string }>;
}

// Marka slug'ları
const BRAND_SLUGS = [
  'zes', 'esarj', 'trugo', 'tesla', 'voltrun', 'sharznet',
  'astor', 'ovolt', 'neva', 'wat-mobilite', 'en-yakit',
  'aksa-sarj', 'rst-chargepoint',
];

// Build zamanında bulunamayan slug'lar runtime'da da çalışsın
export const dynamicParams = true;

// Statik blog + marka slug'larını build sırasında üret
export async function generateStaticParams() {
  const blogSlugs = BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));

  const brandSlugs = BRAND_SLUGS.map((brand) => ({
    slug: `${brand}-sarj-istasyonlari`,
  }));

  return [...blogSlugs, ...brandSlugs];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  // Marka sayfası mı?
  if (slug.endsWith('-sarj-istasyonlari')) {
    const brandSlug = slug.replace('-sarj-istasyonlari', '');
    
    const formattedBrandNames: Record<string, string> = {
      'zes': 'ZES',
      'esarj': 'Eşarj',
      'trugo': 'Trugo',
      'tesla': 'Tesla',
      'voltrun': 'Voltrun',
      'sharznet': 'Sharz.net',
      'astor': 'Astor Şarj',
      'ovolt': 'Ovolt',
      'neva': 'Neva Şarj',
      'wat-mobilite': 'WAT Mobilite',
      'en-yakit': 'En Yakıt',
      'aksa-sarj': 'Aksa Şarj',
      'rst-chargepoint': 'RST Chargepoint',
    };

    const formattedName = formattedBrandNames[brandSlug] || (brandSlug.charAt(0).toUpperCase() + brandSlug.slice(1));
    const title = `${formattedName} Şarj İstasyonları, Fiyatları ve Konumları 2026 | ŞarjRota`;
    const description = `${formattedName} elektrikli araç (EV) şarj istasyonu sayısı, AC/DC soket bilgileri, 2026 güncel şarj fiyatları ve ödeme sistemleri hakkında detaylı bilgi.`;
    const canonical = `https://www.sarjrota.com.tr/blog/${slug}`;
    const openGraph = {
      type: 'article',
      images: [`/blog-images/${brandSlug}-sarj-istasyonlari.jpg`],
    };

    try {
      const res = await fetch(`${API_BASE}/api/Stations/brands/${brandSlug}/statistics`, { next: { revalidate: 3600 } });
      if (res.ok) {
        await res.json();
        return {
          title,
          description,
          openGraph,
          alternates: { canonical },
        };
      }
    } catch {}

    return {
      title,
      description,
      openGraph,
      alternates: { canonical },
    };
  }

  // Normal blog yazısı
  const post = getBlogPost(slug);
  if (!post) return { title: 'Sayfa Bulunamadı | ŞarjRota' };

  return {
    title: post.seoTitle,
    description: post.seoDescription,
    openGraph: {
      type: 'article',
      images: [post.image],
    },
    alternates: { canonical: `https://www.sarjrota.com.tr/blog/${slug}` },
  };
}

export default async function BlogSlugPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  const isBrandPage = slug.endsWith('-sarj-istasyonlari');

  // Normal blog yazısı bulunamazsa 404
  if (!isBrandPage && !post) {
    notFound();
  }

  return <BlogArticleClient slug={slug} />;
}
