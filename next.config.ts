import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Eski Vite rotalarını Next.js'e yönlendir
  async redirects() {
    return [
      {
        source: '/rehber',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/rehber/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
      {
        source: '/gizlilik',
        destination: '/gizlilik-politikasi',
        permanent: true,
      },
      {
        source: '/blog/marka/:brandSlug',
        destination: '/blog/:brandSlug-sarj-istasyonlari',
        permanent: true,
      },
    ];
  },

  // Harici görsel domainleri
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.tile.openstreetmap.org',
      },
    ],
  },

  // Tailwind v4 için
  transpilePackages: [],
};

export default nextConfig;
