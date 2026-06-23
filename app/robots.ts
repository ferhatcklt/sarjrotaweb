import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/assets/', '/src/'],
      crawlDelay: 1,
    },
    sitemap: 'https://www.sarjrota.com.tr/sitemap.xml',
  };
}
