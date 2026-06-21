import { Suspense } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ChevronLeft, Clock, Calendar, Share2 } from 'lucide-react';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { getBlogPost } from '../data/blogPosts';
import AdBanner from '../components/AdBanner';
import blogContentMap from './blog/index';
import BlogSidebar from './blog/components/BlogSidebar';
import { BrandDetailPage } from './BrandDetailPage';

export default function BlogArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  
  // Eğer slug marka şarj istasyonları formatındaysa, o sayfayı render et
  if (slug?.endsWith('-sarj-istasyonlari')) {
    return <BrandDetailPage />;
  }

  const post = slug ? getBlogPost(slug) : undefined;

  // Yazı bulunamazsa 404'e yönlendir
  if (!post) {
    return <Navigate to="/404" replace />;
  }

  const ContentComponent = blogContentMap[post.slug];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#030712] font-['Inter'] transition-colors flex flex-col">
      <SEO 
        title={post.seoTitle}
        description={post.seoDescription}
        image={post.image}
        type="article"
      />
      
      {/* Premium Hero Section */}
      <div className="relative w-full h-[50vh] min-h-[400px] flex items-end pb-16">
        <div className="absolute inset-0 z-0">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/60 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <Link to="/blog" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6 font-medium transition-colors bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Blog'a Dön
          </Link>
          
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-300 mb-4">
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full font-bold shadow-lg shadow-blue-900/30">
              {post.category}
            </span>
            <span className="flex items-center gap-1.5"><Calendar size={14} /> {post.date}</span>
            <span className="flex items-center gap-1.5"><Clock size={14} /> {post.readTime} okuma</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-4xl drop-shadow-lg">
            {post.title}
          </h1>
        </div>
      </div>

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sol Sütun: İçerik */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-200 dark:border-slate-800">
              
              {/* Yazar ve Paylaş */}
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-800 pb-8 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-xl shadow-md">
                    ŞR
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">ŞarjRota Editör Ekibi</div>
                    <div className="text-sm text-slate-500">Uzman İçerik Üreticisi</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-500 font-medium hidden md:inline mr-2">Paylaş:</span>
                  <button 
                    onClick={() => {
                      const text = encodeURIComponent(`ŞarjRota Blog'dan okuduğum bu yazıyı seninle de paylaşmak istedim: ${post.title}`);
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
                      const text = encodeURIComponent(`ŞarjRota Blog'dan: ${post.title}`);
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
              </div>

              {/* Yazı içeriği: slug'a göre lazy yüklenen bileşen */}
              {ContentComponent ? (
                <Suspense fallback={
                  <div className="flex justify-center py-20">
                    <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                  </div>
                }>
                  <ContentComponent />
                </Suspense>
              ) : (
                <p className="text-slate-500 dark:text-slate-400 text-center py-12">Yazı içeriği hazırlanıyor...</p>
              )}
            </div>
          </div>

          {/* Sağ Sütun: Sticky Sidebar */}
          <div className="w-full lg:w-1/3">
            <div className="sticky top-24">
              <BlogSidebar />
            </div>
          </div>

        </div>
      </div>

      {/* ── REKLAM ALANI ── */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex justify-center">
        <AdBanner variant="horizontal" />
      </div>

      <div className="mt-auto border-t border-gray-200 dark:border-slate-800/50 bg-white dark:bg-[#02040a]">
        <Footer />
      </div>
    </div>
  );
}
