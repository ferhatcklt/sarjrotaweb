import { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
  title: 'Kullanım Şartları | ŞarjRota',
  description: 'ŞarjRota kullanım şartları ve koşulları. Platformumuzu kullanmadan önce lütfen okuyunuz.',
  alternates: { canonical: 'https://www.sarjrota.com.tr/kullanim-sartlari' },
};

export default function Page() {
  return <PageClient />;
}
