import { motion } from 'framer-motion';
import { BookOpen, Clock, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';

const GUIDES = [
  {
    id: 'sarj-istasyonu-isgal-cezasi',
    title: 'Şarj İstasyonu İşgal Cezası ve Ücretleri Nelerdir?',
    excerpt: 'Elektrikli aracınızı şarj ettikten sonra istasyonu terk etmezseniz ne olur? 2024 güncel işgal ücretleri ve cezaları hakkında bilmeniz gereken her şey.',
    date: '24 Mayıs 2024',
    readTime: '3 dk',
    category: 'Mevzuat & Ücretler',
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
];

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#030712] font-['Inter'] transition-colors flex flex-col">
      <SEO 
        title="Elektrikli Araç Rehberi ve Blog | ŞarjRota"
        description="Elektrikli araç şarj istasyonları, cezalar, şarj süreleri ve EV dünyasından güncel haberler hakkında uzman rehber yazıları."
      />
      
      <div className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-6"
          >
            Elektrikli Araç Rehberi
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            Elektrikli araç kullanıcıları için hazırladığımız güncel rehberler, mevzuat değişiklikleri ve şarj ipuçları.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {GUIDES.map((guide, i) => (
            <motion.div 
              key={guide.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-slate-900/60 border border-gray-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col"
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={guide.image} 
                  alt={guide.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {guide.category}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-4">
                  <span className="flex items-center gap-1"><BookOpen size={14} /> {guide.date}</span>
                  <span className="flex items-center gap-1"><Clock size={14} /> {guide.readTime}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {guide.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 mb-6 flex-1">
                  {guide.excerpt}
                </p>
                <Link 
                  to={`/rehber/${guide.id}`}
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-colors mt-auto"
                >
                  Devamını Oku <ChevronRight size={18} className="ml-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-auto border-t border-gray-200 dark:border-slate-800/50 bg-white dark:bg-[#02040a]">
        <Footer />
      </div>
    </div>
  );
}
