import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
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
            <img src="/logo1.png" alt="ŞarjRota Logo" className="h-12 w-auto block dark:hidden group-hover:scale-105 transition-transform" />
            <img src="/logo-white.png" alt="ŞarjRota Logo" className="h-12 w-auto hidden dark:block group-hover:scale-105 transition-transform" />
          </Link>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-4">
              <Link to="/araclar" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Araçlar
              </Link>
              <Link to="/tarifeler" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Tarifeler
              </Link>
              <Link to="/rehber" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Rehber
              </Link>
              <Link to="/hakkimizda" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Hakkımızda
              </Link>
            </div>
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
