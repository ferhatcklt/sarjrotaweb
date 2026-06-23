import { MetadataRoute } from 'next';
import { BLOG_POSTS } from '@/data/blogPosts';

const BRAND_SLUGS = [
  'zes', 'esarj', 'trugo', 'tesla', 'voltrun', 'sharznet',
  'astor', 'ovolt', 'neva', 'wat-mobilite', 'en-yakit',
  'aksa-sarj', 'rst-chargepoint'
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.sarjrota.com.tr';

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: new Date('2026-05-28'), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/harita`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/tarifeler`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/araclar`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/blog`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/indir`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/hakkimizda`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/gizlilik-politikasi`, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${base}/kullanim-sartlari`, changeFrequency: 'monthly', priority: 0.3 },
  ];

  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map(post => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const brandRoutes: MetadataRoute.Sitemap = BRAND_SLUGS.map(slug => ({
    url: `${base}/blog/${slug}-sarj-istasyonlari`,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes, ...brandRoutes];
}
