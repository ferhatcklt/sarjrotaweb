import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import { useAppStore } from './store/useAppStore';
import { Navbar } from './components/Navbar';
import CookieConsent from './components/CookieConsent';

// Harita sayfasını sadece ziyaret edildiğinde yükle (Lazy Loading)
// Bu sayede Leaflet ve react-leaflet anasayfa bundle'ına dahil olmaz.
const MapPage = lazy(() => import('./pages/MapPage'));

// Harita yüklenirken gösterilecek şık bir loader
const MapPageLoader = () => (
  <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-slate-900 transition-colors">
    <div className="w-12 h-12 border-4 border-blue-200 dark:border-blue-900 border-t-blue-600 dark:border-t-blue-500 rounded-full animate-spin mb-4"></div>
    <p className="text-slate-600 dark:text-slate-400 font-medium font-sans animate-pulse">Harita yükleniyor, lütfen bekleyin...</p>
  </div>
);

function App() {
  const { theme } = useAppStore();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 pt-16 flex flex-col">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route 
              path="/harita" 
              element={
                <Suspense fallback={<MapPageLoader />}>
                  <MapPage />
                </Suspense>
              } 
            />
            <Route path="/gizlilik-politikasi" element={<PrivacyPolicy />} />
            <Route path="/gizlilik" element={<PrivacyPolicy />} />
            <Route path="/kullanim-sartlari" element={<TermsOfService />} />
          </Routes>
        </main>
        <CookieConsent />
      </div>
    </BrowserRouter>
  );
}

export default App;
