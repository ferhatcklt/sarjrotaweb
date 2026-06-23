import { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
  title: 'Gizlilik Politikası | ŞarjRota',
  description: 'ŞarjRota gizlilik politikası. Kişisel verilerinizin nasıl toplandığı, işlendiği ve korunduğunu öğrenin.',
  alternates: { canonical: 'https://www.sarjrota.com.tr/gizlilik-politikasi' },
};

export default function Page() {
  return <PageClient />;
}
