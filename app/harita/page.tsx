import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Canlı Harita ve Rota Oluşturucu | ŞarjRota',
  description: 'Elektrikli aracınız için rota oluşturun. Tüm şarj ağlarını, güncel fiyatları, topografya ve hava durumu etkilerini hesaba katarak en iyi rotayı bulun.',
  alternates: {
    canonical: 'https://www.sarjrota.com.tr/harita',
  },
};

import MapWrapper from './MapWrapper';

export default function HaritaPage() {
  return <MapWrapper />;
}
