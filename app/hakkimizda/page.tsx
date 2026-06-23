import { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
  title: 'Hakkımızda | ŞarjRota',
  description: "ŞarjRota hakkında bilgi edinin. Misyonumuz, vizyonumuz ve Türkiye'deki elektrikli araç ekosistemine katkımız.",
  alternates: { canonical: 'https://www.sarjrota.com.tr/hakkimizda' },
};

export default function Page() {
  return <PageClient />;
}
