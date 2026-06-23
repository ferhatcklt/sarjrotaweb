'use client';

import { motion } from 'framer-motion';
import { MapPin, BatteryCharging, Cpu, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Footer } from '@/components/Footer';
// import { SEO } // SEO removed - use Next.js metadata;

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#030712] font-['Inter'] transition-colors flex flex-col">
      
      <div className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-6"
          >
            Menzil Endişesine Son Veren Teknoloji
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed"
          >
            ŞarjRota, elektrikli araç (EV) sahipleri için geliştirilmiş akıllı bir rota planlama asistanıdır. Yola çıkmadan önce <strong>aracınızın özelliklerini, haritadaki tüm şarj istasyonlarını, topoğrafik eğimleri ve maliyetleri</strong> analiz eder. Sizin için en uygun şarj duraklarını saniyeler içinde belirler.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <FeatureBlock 
            icon={<MapPin className="text-blue-500 w-8 h-8" />}
            title="Kapsamlı Veritabanı"
            desc="Türkiye'deki ZES, Eşarj, Trugo, Tesla ve diğer tüm şarj operatörlerini tek bir haritada birleştiriyoruz."
            delay={0.2}
          />
          <FeatureBlock 
            icon={<Cpu className="text-emerald-500 w-8 h-8" />}
            title="Yapay Zeka Destekli"
            desc="Sadece harita üzerindeki mesafeye değil; yokuşlara, hız sınırlarına ve bataryanızın dolum eğrisine (DC) göre rota çizer."
            delay={0.3}
          />
          <FeatureBlock 
            icon={<BatteryCharging className="text-amber-500 w-8 h-8" />}
            title="Maliyet Optimizasyonu"
            desc="Seçtiğiniz rotadaki şarj maliyetlerini hesaplar. Hangi istasyonda kaç dakika beklemeniz gerektiğini söyler."
            delay={0.4}
          />
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-slate-900/40 backdrop-blur-sm border border-gray-200 dark:border-slate-800 rounded-3xl p-8 md:p-12 mb-16 shadow-sm"
        >
          <div className="md:w-2/3">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">Vizyonumuz</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              Elektrikli araç devrimi hızlanırken, şarj istasyonu bulma ve "yolda kalır mıyım?" korkusu sürücülerin en büyük engeli. ŞarjRota ekibi olarak vizyonumuz, teknolojiyi kullanarak <strong>elektrikli seyahati benzinli araç kullanmak kadar kolay ve erişilebilir kılmaktır.</strong> Sürekli güncellenen araç kütüphanemiz ve istasyon ağımızla her zaman yanınızdayız.
            </p>
            <Link href="/harita" className="inline-flex items-center text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
              Hemen Rota Oluştur <ChevronRight className="w-5 h-5 ml-1" />
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="mt-auto border-t border-gray-200 dark:border-slate-800/50 bg-white dark:bg-[#02040a]">
        <Footer />
      </div>
    </div>
  );
}

function FeatureBlock({ icon, title, desc, delay }: { icon: React.ReactNode, title: string, desc: string, delay: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm"
    >
      <div className="w-16 h-16 rounded-2xl bg-gray-50 dark:bg-slate-800 flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{title}</h3>
      <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
        {desc}
      </p>
    </motion.div>
  );
}
