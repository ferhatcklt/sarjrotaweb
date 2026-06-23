import { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
  title: 'Yenilikler ve Güncellemeler | ŞarjRota',
  description: "ŞarjRota'nın en son güncellemeleri, yeni özellikleri ve geliştirmeleri hakkında bilgi alın.",
  alternates: { canonical: 'https://www.sarjrota.com.tr/yenilikler' },
};

export default function Page() {
  return <PageClient />;
}
