import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';

// Harita sayfasını sadece ziyaret edildiğinde yükle (Lazy Loading)
// Bu sayede Leaflet ve react-leaflet anasayfa bundle'ına dahil olmaz.
const MapPage = lazy(() => import('./pages/MapPage'));

// Harita yüklenirken gösterilecek şık bir loader
const MapPageLoader = () => (
  <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-50">
    <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
    <p className="text-slate-600 font-medium font-sans animate-pulse">Harita yükleniyor, lütfen bekleyin...</p>
  </div>
);

function App() {
  return (
    <BrowserRouter>
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
