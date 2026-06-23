import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import ThemeProvider from './ThemeProvider';
import ApiInterceptorInit from '@/components/ApiInterceptorInit';

export const metadata: Metadata = {
  title: 'Şarj Rota | Elektrikli Araçlar İçin Akıllı Şarj Planlayıcı',
  description: 'Türkiye genelinde elektrikli aracınızın (ZES, Eşarj, Trugo, Tesla) şarj seviyesine ve menziline göre en uygun rotayı ve şarj duraklarını anında hesaplayın.',
  keywords: 'elektrikli araç, şarj istasyonu, rota planlama, Tesla, ZES, Eşarj, Trugo, EV şarj, menzil hesaplama',
  authors: [{ name: 'Şarj Rota' }],
  metadataBase: new URL('https://www.sarjrota.com.tr'),
  openGraph: {
    type: 'website',
    url: 'https://www.sarjrota.com.tr/',
    title: 'Şarj Rota | Elektrikli Araçlar İçin Akıllı Şarj Planlayıcı',
    description: 'Elektrikli aracınızın şarj seviyesine ve menziline göre en uygun rotayı ve şarj duraklarını anında hesaplayın.',
    images: [{ url: '/hero.jpg' }],
    siteName: 'ŞarjRota',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Şarj Rota | Elektrikli Araçlar İçin Akıllı Şarj Planlayıcı',
    description: 'Elektrikli aracınızın şarj seviyesine ve menziline göre en uygun rotayı ve şarj duraklarını anında hesaplayın.',
    images: ['/hero.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  themeColor: '#2563eb',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
        />
        {/* Google Analytics - deferred */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              setTimeout(function() {
                var script = document.createElement('script');
                script.src = "https://www.googletagmanager.com/gtag/js?id=G-5RKDXVG4PP";
                script.async = true;
                document.head.appendChild(script);
                gtag('config', 'G-5RKDXVG4PP');
              }, 3500);
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <ApiInterceptorInit />
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 pt-16 flex flex-col">
              {children}
            </main>
            <CookieConsent />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
