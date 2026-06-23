import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  name?: string;
  type?: string;
  image?: string;
  url?: string;
}

export function SEO({ 
  title, 
  description, 
  name = "ŞarjRota", 
  type = "website",
  image = "https://www.sarjrota.com.tr/hero.jpg",
  url
}: SEOProps) {
  const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : "https://www.sarjrota.com.tr");
  const fullImageUrl = image.startsWith('http') ? image : `https://www.sarjrota.com.tr${image.startsWith('/') ? '' : '/'}${image}`;

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={currentUrl} />
      
      {/* OpenGraph tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content={name} />
      
      {/* Twitter tags */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
    </Helmet>
  );
}
