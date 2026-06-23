import { Metadata } from 'next';
import BlogPageClient from './BlogPageClient';

export const metadata: Metadata = {
  title: 'Elektrikli Araç Blog | ŞarjRota',
  description: 'Elektrikli araç şarj istasyonları, cezalar, şarj süreleri ve EV dünyasından güncel haberler hakkında uzman blog yazıları.',
  alternates: {
    canonical: 'https://www.sarjrota.com.tr/blog',
  },
};

import { Suspense } from 'react';

export default function BlogPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">Yükleniyor...</div>}>
      <BlogPageClient />
    </Suspense>
  );
}
