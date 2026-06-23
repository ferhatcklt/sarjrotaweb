import { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
  title: 'Uygulamayı İndir | ŞarjRota',
  description: 'ŞarjRota mobil uygulamasını iOS ve Android için indirin. Elektrikli araç şarj planlamanızı cebinizde taşıyın.',
  alternates: { canonical: 'https://www.sarjrota.com.tr/indir' },
};

export default function Page() {
  return <PageClient />;
}
