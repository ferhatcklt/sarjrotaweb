import { Link, useLocation } from 'react-router-dom';
import { Zap, Moon, Sun } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export function Navbar() {
  const { theme, toggleTheme } = useAppStore();
  const location = useLocation();

  // Harita sayfasındayken uygulamanın Navbar'ı daha sade olabilir, ama şimdilik aynı tutuyoruz
  const isMapPage = location.pathname === '/harita';

  return (
    <nav className="fixed w-full z-[60] bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 group hover:opacity-90 transition-opacity">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-600/20 group-hover:shadow-blue-600/40 transition-shadow">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">ŞarjRota</span>
          </Link>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              aria-label="Toggle Theme"
              title="Temayı Değiştir"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            {!isMapPage && (
              <Link
                to="/harita"
                className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-slate-900 dark:bg-blue-600 rounded-full hover:bg-slate-800 dark:hover:bg-blue-700 transition-all duration-200 shadow-sm"
              >
                Uygulamaya Git
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
