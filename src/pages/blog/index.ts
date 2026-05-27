import { lazy } from 'react';

/**
 * Blog yazı içerik bileşenlerinin lazy import haritası.
 * Yeni yazı eklerken:
 * 1. /src/data/blogPosts.ts'ye meta veriyi ekle
 * 2. /src/pages/blog/ altına slug adıyla .tsx dosyası oluştur
 * 3. Bu dosyaya slug → lazy import satırını ekle
 */
const blogContentMap: Record<string, React.LazyExoticComponent<React.ComponentType>> = {
  'sarj-istasyonu-isgal-cezasi': lazy(() => import('./sarj-istasyonu-isgal-cezasi')),
};

export default blogContentMap;
