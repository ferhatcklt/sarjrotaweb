import { motion } from 'framer-motion';
import { BookOpen, Clock, ChevronRight, X } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { BLOG_POSTS } from '../data/blogPosts';

export default function BlogPage() {
  const [searchParams] = useSearchParams();
  const activeCategory = searchParams.get('kategori');
  
  const filteredPosts = activeCategory 
    ? BLOG_POSTS.filter(post => post.category === activeCategory)
    : BLOG_POSTS;
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#030712] font-['Inter'] transition-colors flex flex-col">
      <SEO 
        title="Elektrikli Araç Blog | ŞarjRota"
        description="Elektrikli araç şarj istasyonları, cezalar, şarj süreleri ve EV dünyasından güncel haberler hakkında uzman blog yazıları."
      />
      
      {/* Premium Blog Hero Section */}
      <div className="relative w-full overflow-hidden bg-slate-900 border-b border-slate-800">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-slate-900 z-10"></div>
          {/* Soyut Arkaplan */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-center md:text-left">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 font-medium text-sm mb-6 shadow-inner"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
              </span>
              En Güncel Elektrikli Araç Trendleri
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white tracking-tight mb-6"
            >
              ŞarjRota <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Blog</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-blue-100/80 max-w-2xl leading-relaxed"
            >
              Elektrikli araç dünyasındaki son gelişmeler, mevzuat değişiklikleri, şarj istasyonu ipuçları ve batarya teknolojilerini uzman yazar kadromuzdan takip edin.
            </motion.p>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 -mt-10 relative z-20">
        
        {/* Aktif Kategori Filtresi */}
        {activeCategory && (
          <div className="mb-8 flex items-center gap-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              <span className="text-blue-600 dark:text-blue-400">"{activeCategory}"</span> kategorisindeki yazılar
            </h2>
            <Link 
              to="/blog"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors text-sm font-medium"
            >
              <X size={14} /> Temizle
            </Link>
          </div>
        )}

        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, i) => (
              <motion.div 
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-slate-900/60 border border-gray-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col"
              >
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {post.category}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-4">
                    <span className="flex items-center gap-1"><BookOpen size={14} /> {post.date}</span>
                    <span className="flex items-center gap-1"><Clock size={14} /> {post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 mb-6 flex-1">
                    {post.excerpt}
                  </p>
                  <Link 
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-colors mt-auto"
                  >
                    Devamını Oku <ChevronRight size={18} className="ml-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-slate-900/50 rounded-3xl border border-dashed border-gray-300 dark:border-slate-700">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Bu kategoride henüz yazı yok</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6">Editörlerimiz bu kategori için yeni içerikler hazırlıyor.</p>
            <Link to="/blog" className="inline-flex bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium transition-colors">
              Tüm Yazılara Dön
            </Link>
          </div>
        )}
      </div>

      <div className="mt-auto border-t border-gray-200 dark:border-slate-800/50 bg-white dark:bg-[#02040a]">
        <Footer />
      </div>
    </div>
  );
}
