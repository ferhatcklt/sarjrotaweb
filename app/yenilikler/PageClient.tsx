'use client';

import { motion } from 'framer-motion';
import { 
  BotMessageSquare, 
  HeartPulse, 
  Star, 
  BatteryCharging, 
  Users, 
  BarChart3 
} from 'lucide-react';
import { Footer } from '@/components/Footer';
// import { SEO } // SEO removed - use Next.js metadata;

const FEATURES = [
  {
    icon: BotMessageSquare,
    title: 'Yapay Zeka Seyahat Asistanı',
    description: '"İstanbul\'dan Antalya\'ya gitmek istiyorum, bataryam %45" de, yapay zeka sana en uygun rotayı, mola noktalarını ve tahmini maliyeti anlık olarak planlasın.',
    color: 'text-violet-600 dark:text-violet-400',
    bg: 'bg-violet-100 dark:bg-violet-500/20'
  },
  {
    icon: HeartPulse,
    title: 'Batarya Sağlık Takibi',
    description: 'Aracınızın batarya yıpranmasını (SoH) aylık olarak izleyin. Kapasite kaybını grafiklerle görün, aracınızın değerini koruyun.',
    color: 'text-rose-600 dark:text-rose-400',
    bg: 'bg-rose-100 dark:bg-rose-500/20'
  },
  {
    icon: Star,
    title: 'İstasyon Yorumları & Puanlama',
    description: 'Şarj istasyonlarını puanlayın, fotoğraf paylaşın ve diğer sürücülerin deneyimlerini okuyun. Bozuk soketlerden bir daha sürpriz yemeyin.',
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-100 dark:bg-amber-500/20'
  },
  {
    icon: BatteryCharging,
    title: 'Akıllı Şarj Zamanlayıcı',
    description: 'Elektrik tarifelerini analiz edip en ucuz saatte şarj almanız için size bildirim göndersin. Gece tarifesinde şarj edin, aylık yüzlerce TL tasarruf edin.',
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-100 dark:bg-emerald-500/20'
  },
  {
    icon: Users,
    title: 'Grup Seyahat Planlama',
    description: 'Arkadaşlarınızla veya konvoyunuzla aynı rotaya çıkın. Farklı araçların menzillerini birlikte hesaplayıp ortak şarj duraklarında buluşun.',
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-100 dark:bg-blue-500/20'
  },
  {
    icon: BarChart3,
    title: 'Aylık Şarj Maliyet Raporu',
    description: 'Ne kadar km yol yaptınız, kaç kWh harcadınız, toplam ne ödediğinizi aylık raporlarla takip edin. Benzinli araçla karşılaştırmalı tasarruf analizi.',
    color: 'text-cyan-600 dark:text-cyan-400',
    bg: 'bg-cyan-100 dark:bg-cyan-500/20'
  }
];

export default function YeniliklerPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#030712] font-['Inter'] transition-colors flex flex-col">
      
      <div className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-semibold text-sm mb-6 shadow-sm"
          >
            <BotMessageSquare size={16} />
            <span>Çok Yakında ŞarjRota'da</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6"
          >
            Geleceğin Sürüş Deneyimi <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Hazırlanıyor</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
          >
            ŞarjRota'yı sürekli geliştirmeye ve size en iyi deneyimi sunmaya hız kesmeden devam ediyoruz. Yakında yolculuğunuzu bambaşka bir boyuta taşıyacak <strong>yepyeni özelliklerle</strong> tanışacaksınız.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className="bg-white dark:bg-slate-900/60 backdrop-blur-sm border border-gray-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group relative overflow-hidden"
              >
                {/* Coming Soon Badge */}
                <div className="absolute top-4 right-4 bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-gray-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Yakında
                </div>

                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${feature.bg} ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={28} strokeWidth={2} />
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA / Information */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 text-center bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-3xl p-8 max-w-3xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Harika Özellikler Yolda!</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Ekibimiz bu özellikleri sizinle buluşturmak için aralıksız çalışıyor. Elektrikli araç yolculuklarınızı çok daha keyifli ve zahmetsiz hale getirecek güncellemeler için beklemede kalın.
          </p>
          <button 
            disabled 
            className="bg-gray-200 dark:bg-slate-800 text-gray-400 dark:text-gray-500 font-semibold px-8 py-3 rounded-xl cursor-not-allowed"
          >
            Çok Yakında
          </button>
        </motion.div>

      </div>
      
      <div className="mt-auto border-t border-gray-200 dark:border-slate-800/50 bg-white dark:bg-[#02040a]">
        <Footer />
      </div>
    </div>
  );
}
