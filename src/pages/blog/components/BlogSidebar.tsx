import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Car, MapPin, ChevronRight, Hash } from 'lucide-react';
import { useAppStore } from '../../../store/useAppStore';
import { BLOG_POSTS } from '../../../data/blogPosts';

const API_BASE = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

// Sistemin ana kategorileri (Hiç yazı olmasa da listede görünmesi için)
const BASE_CATEGORIES = [
  'Şarj Ağları',
  'Mevzuat & Ücretler',
  'Elektrikli Araç Teknolojileri',
  'Şarj İpuçları',
  'Haberler'
];

export default function BlogSidebar() {
  const { allVehicles, setAllVehicles, allBrands, setAllBrands, allStations, setAllStations } = useAppStore();
  const [loading, setLoading] = useState(!allVehicles || !allBrands || !allStations);

  useEffect(() => {
    async function fetchSystemStats() {
      try {
        let fetchCount = 0;
        if (!allVehicles) {
          const res = await fetch(`${API_BASE}/api/vehicles`, { headers: { 'X-Api-Key': API_KEY } });
          const data = await res.json();
          setAllVehicles(data);
          fetchCount++;
        }
        if (!allBrands) {
          const res = await fetch(`${API_BASE}/api/stations/brands`, { headers: { 'X-Api-Key': API_KEY } });
          const data = await res.json();
          setAllBrands(data);
          fetchCount++;
        }
        if (!allStations) {
          const res = await fetch(`${API_BASE}/api/stations`, { headers: { 'X-Api-Key': API_KEY } });
          const data = await res.json();
          setAllStations(data);
          fetchCount++;
        }
        if (fetchCount > 0) {
          console.log("BlogSidebar: Sistem istatistikleri API'den güncellendi ve önbelleğe alındı.");
        }
      } catch (err) {
        console.error('Sistem istatistikleri çekilemedi:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchSystemStats();
  }, [allVehicles, allBrands, allStations, setAllVehicles, setAllBrands, setAllStations]);

  const vehicleCount = allVehicles?.length || 0;
  const brandCount = allBrands?.length || 0;
  // İstasyon sayısını 10'un katına yuvarlayarak daha şık gösterelim (örn: 142 -> 140+)
  const rawStationCount = allStations?.length || 0;
  const stationCount = rawStationCount > 10 ? Math.floor(rawStationCount / 10) * 10 : rawStationCount;

  // Blog yazılarına göre kategorilerin sayısını dinamik olarak hesapla
  const dynamicCategories = useMemo(() => {
    const counts: Record<string, number> = {};
    
    // Önce tüm temel kategorilerin sayısını 0 olarak başlat
    BASE_CATEGORIES.forEach(cat => {
      counts[cat] = 0;
    });

    // Sonra var olan yazıları say
    BLOG_POSTS.forEach(post => {
      if (counts[post.category] !== undefined) {
        counts[post.category]++;
      } else {
        // Eğer BASE_CATEGORIES'de olmayan yeni bir kategori eklenmişse onu da say
        counts[post.category] = 1;
      }
    });

    // Dinamik olarak oluşturulan Marka blog sayfalarını "Şarj Ağları" kategorisine ekle
    if (allBrands && allBrands.length > 0) {
      if (counts['Şarj Ağları'] !== undefined) {
        counts['Şarj Ağları'] += allBrands.length;
      } else {
        counts['Şarj Ağları'] = allBrands.length;
      }
    }

    // Object'i diziye çevir
    return Object.entries(counts).map(([name, count]) => ({
      name,
      count
    }));
  }, [allBrands]);

  return (
    <aside className="space-y-8">
      {/* Minimal & Zengin İstatistikler */}
      <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-6 text-slate-900 dark:text-white">
          <Zap className="text-blue-500 fill-blue-500" size={20} />
          <h3 className="font-bold text-lg">Sistem İstatistikleri</h3>
        </div>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-slate-800/50">
            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
              <Car size={18} className="text-blue-500" />
              <span className="font-medium text-sm">Desteklenen Araç</span>
            </div>
            <span className="font-bold text-slate-900 dark:text-white">{loading ? '...' : vehicleCount}+</span>
          </div>
          
          <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-slate-800/50">
            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
              <Zap size={18} className="text-blue-500" />
              <span className="font-medium text-sm">Şarj Ağı (Marka)</span>
            </div>
            <span className="font-bold text-slate-900 dark:text-white">{loading ? '...' : brandCount}+</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-slate-800/50">
            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
              <MapPin size={18} className="text-blue-500" />
              <span className="font-medium text-sm">Şarj Noktası</span>
            </div>
            <span className="font-bold text-slate-900 dark:text-white">{loading ? '...' : stationCount}+</span>
          </div>
        </div>
        
        <Link 
          to="/harita" 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center transition-colors"
        >
          Haritada Keşfet
        </Link>
      </div>

      {/* Kategoriler */}
      <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
        <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Hash className="text-blue-500" size={20} />
          Kategoriler
        </h3>
        <ul className="space-y-2">
          {dynamicCategories.map((cat, i) => (
            <li key={i}>
              <Link 
                to={`/blog?kategori=${encodeURIComponent(cat.name)}`}
                className={`flex items-center justify-between p-3 rounded-xl transition-colors group ${
                  cat.count === 0 
                    ? 'opacity-60 hover:bg-gray-50/50 dark:hover:bg-slate-800/30' 
                    : 'hover:bg-gray-50 dark:hover:bg-slate-800/50'
                } text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400`}
              >
                <span className="font-medium">{cat.name}</span>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded-md ${
                    cat.count === 0 
                      ? 'bg-gray-50 dark:bg-slate-800/50 text-slate-400 dark:text-slate-500' 
                      : 'bg-gray-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                  }`}>
                    {cat.count}
                  </span>
                  <ChevronRight size={16} className={`-ml-2 transition-all ${cat.count === 0 ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'}`} />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
