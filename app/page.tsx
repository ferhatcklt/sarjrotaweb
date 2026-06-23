import { Metadata } from 'next';
import LandingPageClient from './LandingPageClient';

export const metadata: Metadata = {
  title: 'Şarj Rota | Elektrikli Araçlar İçin Akıllı Şarj Planlayıcı',
  description: 'Türkiye genelinde elektrikli aracınızın (ZES, Eşarj, Trugo, Tesla) şarj seviyesine ve menziline göre en uygun rotayı ve şarj duraklarını anında hesaplayın.',
  alternates: {
    canonical: 'https://www.sarjrota.com.tr',
  },
};

export default function HomePage() {
  return <LandingPageClient />;
}
