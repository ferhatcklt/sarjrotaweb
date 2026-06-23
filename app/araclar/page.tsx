import { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
  title: 'Desteklenen Elektrikli Araçlar | ŞarjRota',
  description: 'ŞarjRota tarafından desteklenen tüm elektrikli araçları, menzil ve batarya bilgilerini görüntüleyin.',
  alternates: { canonical: 'https://www.sarjrota.com.tr/araclar' },
};

export default function Page() {
  return <PageClient />;
}
