'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

export function Navbar() {
  const { theme, toggleTheme } = useAppStore();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isMapPage = pathname === '/harita';

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="fixed w-full z-[60] bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" onClick={closeMenu} className="flex items-center gap-2 group hover:opacity-90 transition-opacity">
            <img src="/logo1.png" alt="ŞarjRota Logo" className="h-12 w-auto block dark:hidden group-hover:scale-105 transition-transform" />
            <img src="/logo-white.png" alt="ŞarjRota Logo" className="h-12 w-auto hidden dark:block group-hover:scale-105 transition-transform" />
          </Link>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-4">
              <Link href="/araclar" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Araçlar
              </Link>
              <Link href="/tarifeler" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Tarifeler
              </Link>
              <Link href="/yenilikler" className="relative text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center">
                Yenilikler
                <span className="absolute -top-2.5 -right-5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow-sm">YENİ</span>
              </Link>
              <Link href="/blog" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Blog
              </Link>
              <Link href="/hakkimizda" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
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
                href="/harita"
                className="hidden md:inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-slate-900 dark:bg-blue-600 rounded-full hover:bg-slate-800 dark:hover:bg-blue-700 transition-all duration-200 shadow-sm"
              >
                Uygulamaya Git
              </Link>
            )}

            {/* Mobil Menü Butonu */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 dark:text-slate-300"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobil Menü Açılır Alanı */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 absolute w-full left-0 top-16 shadow-xl z-50">
          <div className="flex flex-col p-4 space-y-4">
            <Link href="/araclar" onClick={closeMenu} className="block text-base font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400">
              Araçlar
            </Link>
            <Link href="/tarifeler" onClick={closeMenu} className="block text-base font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400">
              Tarifeler
            </Link>
            <Link href="/yenilikler" onClick={closeMenu} className="flex items-center gap-2 text-base font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400">
              Yenilikler
              <span className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">YENİ</span>
            </Link>
            <Link href="/blog" onClick={closeMenu} className="block text-base font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400">
              Blog
            </Link>
            <Link href="/hakkimizda" onClick={closeMenu} className="block text-base font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400">
              Hakkımızda
            </Link>
            {!isMapPage && (
              <Link
                href="/harita"
                onClick={closeMenu}
                className="mt-4 flex w-full items-center justify-center px-5 py-3 text-sm font-medium text-white bg-slate-900 dark:bg-blue-600 rounded-xl"
              >
                Uygulamaya Git
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
