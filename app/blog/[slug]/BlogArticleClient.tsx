'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Clock, Calendar, Share2, AlertCircle } from 'lucide-react';
import { Footer } from '@/components/Footer';
import AdBanner from '@/components/AdBanner';
import BlogSidebar from '@/components/blog/BlogSidebar';
import BlogCTA from '@/components/blog/BlogCTA';
import ReactMarkdown from 'react-markdown';
import { getBlogPost } from '@/data/blogPosts';
import { getBrandSeoContent, BrandStats } from '@/data/brandContents';
import { useAppStore } from '@/store/useAppStore';
import SarjIstasyonuIsgalCezasi from './content/SarjIstasyonuIsgalCezasi';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

const BLOG_CONTENT_MAP: Record<string, React.ComponentType> = {
  'sarj-istasyonu-isgal-cezasi': SarjIstasyonuIsgalCezasi,
};

interface Props {
  slug: string;
}

function ShareButtons({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-slate-500 font-medium hidden md:inline mr-2">Paylaş:</span>
      <button
        onClick={() => {
          const text = encodeURIComponent(`ŞarjRota Blog'dan okuduğum bu yazıyı seninle de paylaşmak istedim: ${title}`);
          const url = encodeURIComponent(window.location.href);
          window.open(`https://wa.me/?text=${text}%20${url}`, '_blank');
        }}
        className="w-10 h-10 rounded-full bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/50 flex items-center justify-center transition-colors shadow-sm"
        title="WhatsApp'ta Paylaş"
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12.031 0C5.394 0 0 5.394 0 12.031c0 2.12.553 4.162 1.6 5.972L.21 23.364l5.526-1.448A11.954 11.954 0 0012.031 24c6.637 0 12.031-5.394 12.031-12.031S18.668 0 12.031 0zm0 21.986c-1.84 0-3.64-.495-5.22-1.433l-.375-.221-3.882 1.018 1.036-3.785-.243-.387a9.92 9.92 0 01-1.516-5.267c0-5.518 4.49-10.008 10.012-10.008 5.523 0 10.015 4.49 10.015 10.008 0 5.518-4.492 10.008-10.015 10.008zm5.5-7.53c-.302-.15-1.785-.882-2.062-.983-.277-.101-.479-.151-.68.151-.202.302-.782.983-.958 1.184-.176.202-.352.227-.654.076-1.574-.785-2.73-1.637-3.774-3.398-.106-.179-.012-.275.14-.424.135-.133.302-.352.453-.529.151-.176.202-.302.302-.503.1-.202.05-.378-.025-.529-.076-.151-.68-1.64-.932-2.245-.246-.59-.496-.511-.68-.521-.176-.01-.378-.01-.58-.01s-.529.076-.806.378c-.277.302-1.057 1.033-1.057 2.518 0 1.485 1.082 2.92 1.233 3.12.151.202 2.127 3.245 5.148 4.545 1.954.84 2.548.914 3.427.765.986-.168 2.062-.977 2.274-1.815.212-.839.212-1.558.151-1.71-.06-.152-.262-.227-.564-.378z"/></svg>
      </button>
      <button
        onClick={() => {
          const text = encodeURIComponent(`ŞarjRota Blog'dan: ${title}`);
          const url = encodeURIComponent(window.location.href);
          window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
        }}
        className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center transition-colors shadow-sm"
        title="X'te (Twitter) Paylaş"
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
      </button>
      <button
        onClick={() => {
          const url = encodeURIComponent(window.location.href);
          window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
        }}
        className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 flex items-center justify-center transition-colors shadow-sm"
        title="LinkedIn'de Paylaş"
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
      </button>
      <button
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          alert('Bağlantı başarıyla panoya kopyalandı!');
        }}
        className="w-10 h-10 rounded-full bg-gray-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-gray-200 dark:hover:bg-slate-700 flex items-center justify-center transition-colors shadow-sm"
        title="Bağlantıyı Kopyala"
      >
        <Share2 size={16} />
      </button>
    </div>
  );
}

function ArticleWrapper({ title, category, date, readTime, image, children }: {
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#030712] font-['Inter'] transition-colors flex flex-col">
      {/* Hero */}
      <div className="relative w-full h-[50vh] min-h-[400px] flex items-end pb-16">
        <div className="absolute inset-0 z-0">
          <img src={image} alt={title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/60 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6 font-medium transition-colors bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
            <ChevronLeft className="w-4 h-4 mr-1" /> Blog'a Dön
          </Link>
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-300 mb-4">
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full font-bold shadow-lg shadow-blue-900/30">{category}</span>
            <span className="flex items-center gap-1.5"><Calendar size={14} /> {date}</span>
            <span className="flex items-center gap-1.5"><Clock size={14} /> {readTime} okuma</span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-4xl drop-shadow-lg">{title}</h1>
        </div>
      </div>

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="w-full lg:w-2/3">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-200 dark:border-slate-800">
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-800 pb-8 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-xl shadow-md">ŞR</div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">ŞarjRota Editör Ekibi</div>
                    <div className="text-sm text-slate-500">Uzman İçerik Üreticisi</div>
                  </div>
                </div>
                <ShareButtons title={title} />
              </div>
              <article className="max-w-none">{children}</article>
              <div className="mt-10"><BlogCTA /></div>
            </div>
          </div>
          <div className="w-full lg:w-1/3">
            <div className="sticky top-24"><BlogSidebar /></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex justify-center">
        <AdBanner variant="horizontal" />
      </div>

      <div className="mt-auto border-t border-gray-200 dark:border-slate-800/50 bg-white dark:bg-[#02040a]">
        <Footer />
      </div>
    </div>
  );
}

// Marka sayfası bileşeni
function BrandPageContent({ brandSlug }: { brandSlug: string }) {
  const [stats, setStats] = useState<BrandStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { allBrands } = useAppStore();

  useEffect(() => {
    fetch(`${API_BASE}/api/Stations/brands/${brandSlug}/statistics`)
      .then(res => {
        if (!res.ok) throw new Error('Marka bulunamadı');
        return res.json();
      })
      .then(data => setStats(data))
      .catch(err => setError(err.message || 'Bilinmeyen bir hata oluştu'))
      .finally(() => setLoading(false));
  }, [brandSlug]);

  if (loading) return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#030712] pt-24 pb-12 flex justify-center items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error || !stats) return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#030712] pt-24 pb-12 flex flex-col justify-center items-center text-slate-600 dark:text-slate-400">
      <AlertCircle className="h-16 w-16 text-slate-400 dark:text-slate-600 mb-4" />
      <h1 className="text-2xl font-bold mb-2">Hata</h1>
      <p className="mb-6">{error}</p>
      <Link href="/blog" className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">Blog'a Dön</Link>
    </div>
  );

  const title = `${stats.brandName} Şarj İstasyonları, Fiyatları ve 2026 Rehberi`;
  const markdownContent = getBrandSeoContent(stats);
  const imageUrl = `/blog-images/${stats.brandSlug}-sarj-istasyonlari.jpg`;

  // Tarih hesapla
  const brandIndex = (allBrands || []).findIndex(b => {
    const s = b.toString().toLowerCase()
      .replace(/ş/g,'s').replace(/ğ/g,'g').replace(/ı/g,'i')
      .replace(/ö/g,'o').replace(/ç/g,'c').replace(/ü/g,'u')
      .replace(/\s+/g,'-').replace(/[^\w-]+/g,'')
      .replace(/--+/g,'-').replace(/^-+/,'').replace(/-+$/,'');
    return s === brandSlug;
  });
  const baseDate = new Date(2026, 5, 20);
  if (brandIndex >= 0) baseDate.setDate(baseDate.getDate() - brandIndex);
  const formattedDate = baseDate.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <ArticleWrapper title={title} category="Şarj Ağları" date={formattedDate} readTime="3 dk" image={imageUrl}>
      <ReactMarkdown
        components={{
          h1: ({node, ...props}) => <h2 className="relative text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mt-16 mb-6 pl-5 border-l-[3px] border-blue-500"><span {...props} /></h2>,
          h2: ({node, ...props}) => <h2 className="relative text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mt-16 mb-6 pl-5 border-l-[3px] border-blue-500"><span {...props} /></h2>,
          p: ({node, children, ...props}) => {
            const isNote = node?.children?.length === 1 && (node.children[0] as any)?.tagName === 'em';
            if (isNote) return (
              <div className="not-prose my-8 flex items-start gap-3 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30 rounded-xl p-4 text-sm text-amber-800 dark:text-amber-300">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" /></svg>
                <span>{children}</span>
              </div>
            );
            return <p className="text-slate-700 dark:text-slate-300 mb-6 leading-[1.85] text-[17px]" {...props}>{children}</p>;
          },
          ul: ({node, ...props}) => <ul className="not-prose space-y-3 mb-10" {...props} />,
          li: ({children}) => (
            <li className="flex items-start gap-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl p-4 border border-slate-100 dark:border-slate-700/50 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800/60">
              <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mt-0.5 shadow-sm shadow-blue-500/20">
                <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
              </span>
              <div className="flex-1 text-slate-700 dark:text-slate-300 text-[17px] leading-relaxed">{children}</div>
            </li>
          ),
          strong: ({node, ...props}) => <strong className="font-bold text-slate-900 dark:text-white" {...props} />,
          a: ({node, href, children, ...props}) => (
            <a href={href} target="_blank" rel="nofollow noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline underline-offset-2 decoration-blue-300 dark:decoration-blue-700 hover:decoration-blue-500 transition-colors font-medium" {...props}>{children}</a>
          ),
        }}
      >
        {markdownContent}
      </ReactMarkdown>
    </ArticleWrapper>
  );
}

export default function BlogArticleClient({ slug }: Props) {
  // Marka sayfası mı?
  if (slug.endsWith('-sarj-istasyonlari')) {
    const brandSlug = slug.replace('-sarj-istasyonlari', '');
    return <BrandPageContent brandSlug={brandSlug} />;
  }

  // Normal blog yazısı
  const post = getBlogPost(slug);
  if (!post) return null;

  const ContentComponent = BLOG_CONTENT_MAP[slug];

  return (
    <ArticleWrapper title={post.title} category={post.category} date={post.date} readTime={post.readTime} image={post.image}>
      {ContentComponent ? <ContentComponent /> : (
        <p className="text-slate-500 dark:text-slate-400 text-center py-12">Yazı içeriği hazırlanıyor...</p>
      )}
    </ArticleWrapper>
  );
}
