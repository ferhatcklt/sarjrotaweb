import { Link } from 'PLACEHOLDER_ROUTER';
import { Navigation } from 'lucide-react';

export default function BlogCTA() {
  return (
    <div className="not-prose my-10 relative overflow-hidden rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-blue-100 dark:border-slate-700 p-5 md:p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
      <div className="absolute top-0 left-0 w-2 h-full bg-blue-500"></div>
      
      <div className="flex-1 text-center md:text-left pl-2">
        <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-1">
          Yola çıkmadan önce rotanızı planlayın ⚡️
        </h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base">
          Aracınızın gerçek menziline göre en uygun istasyonları saniyeler içinde bulun.
        </p>
      </div>
      
      <div className="flex-shrink-0 w-full md:w-auto">
        <Link 
          to="/harita" 
          className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-medium transition-colors"
        >
          Rota Oluştur <Navigation size={18} />
        </Link>
      </div>
    </div>
  );
}
