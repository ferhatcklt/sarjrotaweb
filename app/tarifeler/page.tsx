import { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
  title: 'Şarj İstasyonu Fiyatları 2026 | ŞarjRota',
  description: "Türkiye'deki tüm elektrikli araç şarj ağlarının (ZES, Eşarj, Trugo, Tesla) güncel fiyatlarını ve tarifelerini karşılaştırın.",
  alternates: { canonical: 'https://www.sarjrota.com.tr/tarifeler' },
};

export default function Page() {
  return <PageClient />;
}
