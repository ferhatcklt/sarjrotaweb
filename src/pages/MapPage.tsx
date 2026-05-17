import { Sidebar } from '../components/Sidebar';
import { MapView } from '../components/MapView';
import { useAppStore } from '../store/useAppStore';
import { useEffect } from 'react';

export default function MapPage() {
  const { isMobileSidebarOpen, closeMobileSidebar } = useAppStore();

  // Haritaya girince body scroll'u kapat (mobil uyum için)
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="flex flex-1 w-full overflow-hidden bg-gray-100 dark:bg-slate-900 font-sans relative transition-colors duration-300">
      {/* ── Desktop: Sidebar sabit sol panel ── */}
      <div className="hidden md:flex w-80 h-full shrink-0 z-10 shadow-2xl">
        <Sidebar />
      </div>

      {/* ── Mobil: Overlay sidebar ── */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden transition-opacity duration-300"
          onClick={closeMobileSidebar}
        />
      )}
      <div
        className={`
          fixed top-0 left-0 h-full w-[85vw] max-w-sm z-50
          transform transition-transform duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)]
          md:hidden shadow-2xl
          ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <Sidebar />
      </div>

      {/* ── Harita: tüm ekranı kaplar ── */}
      <MapView />
    </div>
  );
}
