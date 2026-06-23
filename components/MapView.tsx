'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import {
  MapContainer, TileLayer, Marker, Popup,
  useMapEvents, Polyline, useMap,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useAppStore } from '@/store/useAppStore';
import { X, Menu } from 'lucide-react';

// API'den gelen dinamik şarj tarifeleri (useAppStore üzerinden alınacak)
const DEFAULT_PRICE = 14.00;

// Leaflet default icon fix
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:       'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:     'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Zorunlu şarj durağı — büyük mavi pin + durak numarası
const makeStopIcon = (index: number) => new L.DivIcon({
  className: '',
  html: `<div style="position:relative;">
    <div style="
      width:40px;height:40px;border-radius:50% 50% 50% 0;
      background:linear-gradient(135deg,#2563eb,#1d4ed8);border:3px solid #fff;
      box-shadow:0 3px 12px rgba(37,99,235,0.5);
      transform:rotate(-45deg);display:flex;align-items:center;justify-content:center;">
      <span style="transform:rotate(45deg);font-size:15px;font-weight:800;color:#fff;line-height:1;">${index + 1}</span>
    </div>
    <div style="
      position:absolute;top:-4px;right:-4px;width:16px;height:16px;
      background:#facc15;border-radius:50%;border:2px solid #fff;
      display:flex;align-items:center;justify-content:center;
      font-size:9px;line-height:1;">⚡</div>
  </div>`,
  iconSize:   [40, 40],
  iconAnchor: [20, 40],
  popupAnchor:[0, -42],
});

// Yakın istasyon için küçük gri pin (bilgi amaçlı)
const nearbyIcon = new L.DivIcon({
  className: '',
  html: `<div style="
    width:18px;height:18px;border-radius:50%;
    background:#94a3b8;border:2px solid #fff;
    box-shadow:0 1px 4px rgba(0,0,0,0.25);
    display:flex;align-items:center;justify-content:center;">
    <span style="font-size:9px;line-height:1;">⚡</span>
  </div>`,
  iconSize:   [18, 18],
  iconAnchor: [9, 9],
  popupAnchor:[0, -12],
});

// Başlangıç (yeşil) pin
const startIcon = new L.DivIcon({
  className: '',
  html: `<div style="width:18px;height:18px;border-radius:50%;
    background:#22c55e;border:3px solid #fff;
    box-shadow:0 2px 6px rgba(0,0,0,0.4);"></div>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

// Varış (kırmızı) pin
const endIcon = new L.DivIcon({
  className: '',
  html: `<div style="width:18px;height:18px;border-radius:50%;
    background:#ef4444;border:3px solid #fff;
    box-shadow:0 2px 6px rgba(0,0,0,0.4);"></div>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

// Alternatif rota renkleri
const ALT_COLORS = ['#0ea5e9', '#8b5cf6', '#f97316'];

// ── Haritayı rota bounds'una otomatik fit et ──
const BoundsHandler = () => {
  const map = useMap();
  const { route } = useAppStore();

  useEffect(() => {
    if (route.length < 2) return;
    const bounds = L.latLngBounds(route.map(p => [p.lat, p.lng] as [number, number]));
    map.fitBounds(bounds, { padding: [48, 48] });
  }, [route, map]);

  return null;
};

// ── Harita tıklama işleyicisi ──
const MapClickHandler = () => {
  const { selectingMode, setStartLocation, setEndLocation, setSelectingMode, closeMobileSidebar } = useAppStore();

  useMapEvents({
    click(e) {
      closeMobileSidebar();
      if (selectingMode === 'start') {
        setStartLocation({ lat: e.latlng.lat, lng: e.latlng.lng });
        setSelectingMode('end'); // Başlangıç seçildi, otomatik olarak varış moduna geç
      } else if (selectingMode === 'end') {
        setEndLocation({ lat: e.latlng.lat, lng: e.latlng.lng });
        setSelectingMode(null); // İkisi de seçildi, modu kapat
        
        // Eğer araç seçili değilse menüyü otomatik aç
        const { selectedVehicle } = useAppStore.getState();
        if (!selectedVehicle) {
          useAppStore.getState().toggleMobileSidebar();
        }
      }
      // selectingMode null ise → tıklama hiçbir şey yapmaz
    },
  });

  return null;
};

// ── Ana harita bileşeni ──
export const MapView = () => {
  const {
    startLocation,
    endLocation,
    route,
    stops,
    nearbyStations,
    alternatives,
    selectedAlternativeIndex,
    isMobileSidebarOpen,
    toggleMobileSidebar,
    routeSummary,
    selectingMode,
    setSelectingMode,
    prices,
  } = useAppStore();

  const getPrice = (brand?: string) => {
    if (!brand || !prices) return DEFAULT_PRICE;
    const brandKey = Object.keys(prices).find(k => k.toLowerCase() === brand.toLowerCase());
    if (brandKey) return prices[brandKey].dc; // Genelde DC fiyatı gösterilir
    return DEFAULT_PRICE;
  };

  const defaultCenter: [number, number] = [39.0, 35.0];
  const activePositions = route.map(p => [p.lat, p.lng] as [number, number]);

  // Türkiye Sınırları (Güneybatı ve Kuzeydoğu köşeleri)
  const TURKEY_BOUNDS: L.LatLngBoundsLiteral = [
    [35.8, 25.6], // Güneybatı
    [42.1, 44.8], // Kuzeydoğu
  ];

  // Yakın istasyonlar arasından zorunlu durakları çıkar (çift pin önleme)
  const stopIds = new Set(stops.map(s => s.id?.toString()));
  const nearbyOnly = nearbyStations.filter(s => !stopIds.has(s.id?.toString()));

  return (
    <div className="flex-1 h-full w-full relative z-0">
      <MapContainer
        center={defaultCenter}
        zoom={6}
        minZoom={5}
        maxBounds={TURKEY_BOUNDS}
        maxBoundsViscosity={1.0}
        className="w-full h-full"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapClickHandler />
        <BoundsHandler />

        {/* ── Alternatif rotalar (pasif, soluk) ── */}
        {alternatives.map((alt) => {
          if (alt.index === selectedAlternativeIndex) return null;
          const positions = alt.path.map(p => [p.lat, p.lng] as [number, number]);
          return (
            <Polyline
              key={`alt-${alt.index}`}
              positions={positions}
              color={ALT_COLORS[alt.index % ALT_COLORS.length]}
              weight={4}
              opacity={0.35}
              dashArray="8 6"
            />
          );
        })}

        {/* ── Aktif rota (kalın, parlak) ── */}
        {activePositions.length > 0 && (
          <>
            <Polyline positions={activePositions} color="#000" weight={7} opacity={0.12} />
            <Polyline
              positions={activePositions}
              color={ALT_COLORS[selectedAlternativeIndex % ALT_COLORS.length]}
              weight={5}
              opacity={0.95}
            />
          </>
        )}

        {/* ── Yakın istasyonlar (gri, küçük bilgi pinleri) ── */}
        {nearbyOnly.map((station, i) => {
          const lat = station.latitude ?? station.location?.lat;
          const lng = station.longitude ?? station.location?.lng;
          if (!lat || !lng) return null;
          const ac  = station.acConnectorCount  ?? 0;
          const dc  = station.dcConnectorCount  ?? 0;
          const hpc = station.hpcConnectorCount ?? 0;
          const connectors = [ac > 0 && `AC×${ac}`, dc > 0 && `DC×${dc}`, hpc > 0 && `HPC×${hpc}`]
            .filter(Boolean).join('  ');
          const maxPowerText = station.maxPowerKw ? `⚡ Max Güç: ${station.maxPowerKw} kW` : '';
          return (
            <Marker key={`nearby-${station.id ?? i}`} position={[lat, lng]} icon={nearbyIcon}>
              <Popup minWidth={160}>
                <div style={{ lineHeight: 1.5 }}>
                  <strong style={{ fontSize: 12 }}>🔌 {station.name || 'İstasyon'}</strong><br />
                  <span style={{ color: '#666', fontSize: 11 }}>{station.brand}</span>
                  {connectors && <><br /><span style={{ fontSize: 10 }}>{connectors}</span></>}
                  {maxPowerText && <><br /><span style={{ fontSize: 10, color: '#b45309', fontWeight: 600 }}>{maxPowerText}</span></>}
                  <br />
                  <span style={{ fontSize: 11, color: '#059669', fontWeight: 600 }}>
                    💰 {getPrice(station.brand).toFixed(2)} TL/kWh
                  </span>
                </div>
              </Popup>
            </Marker>
          );
        })}
        {/* ── Zorunlu şarj durakları (sarı, büyük ⚡ pinler) ── */}
        {stops.map((stop, i) => {
          const lat = stop.latitude ?? stop.location?.lat;
          const lng = stop.longitude ?? stop.location?.lng;
          if (!lat || !lng) return null;
          const ac  = stop.acConnectorCount  ?? 0;
          const dc  = stop.dcConnectorCount  ?? 0;
          const hpc = stop.hpcConnectorCount ?? 0;
          const connectors = [ac > 0 && `AC×${ac}`, dc > 0 && `DC×${dc}`, hpc > 0 && `HPC×${hpc}`]
            .filter(Boolean).join('  ');
          const maxPowerText = stop.maxPowerKw ? `⚡ Max Güç: ${stop.maxPowerKw} kW` : '';
          return (
            <Marker key={`stop-${stop.id ?? i}`} position={[lat, lng]} icon={makeStopIcon(i)} zIndexOffset={1000}>
              <Popup minWidth={180}>
                <div style={{ lineHeight: 1.5 }}>
                  <strong style={{ fontSize: 13, color: '#1d4ed8' }}>🔋 Durak #{i + 1}: {stop.name || 'Şarj İstasyonu'}</strong><br />
                  <span style={{ color: '#666', fontSize: 12 }}>Marka: {stop.brand}</span><br />
                  {connectors && <><span style={{ fontSize: 11 }}>{connectors}</span><br/></>}
                  {maxPowerText && <><span style={{ fontSize: 11, color: '#b45309', fontWeight: 600 }}>{maxPowerText}</span><br/></>}
                  <span style={{ fontSize: 11, color: '#059669', fontWeight: 600 }}>
                    💰 {getPrice(stop.brand).toFixed(2)} TL/kWh
                  </span><br/>
                  {stop.arrivalChargePercentage !== undefined && (
                    <span style={{ fontSize: 12, fontWeight: 'bold', color: '#047857' }}>
                      ⚡ Tahmini Kalan Şarj: %{stop.arrivalChargePercentage}
                    </span>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}

        {/* ── Başlangıç pin ── */}
        {startLocation && (
          <Marker position={[startLocation.lat, startLocation.lng]} icon={startIcon}>
            <Popup><strong>🟢 Başlangıç</strong></Popup>
          </Marker>
        )}

        {/* ── Varış pin ── */}
        {endLocation && (
          <Marker position={[endLocation.lat, endLocation.lng]} icon={endIcon}>
            <Popup><strong>🔴 Varış</strong></Popup>
          </Marker>
        )}
      </MapContainer>

      {/* ── YÜZEN UI (FLOATING UI) ── */}
      
      {/* 1. Seçim Modu Yönerge Banner'ı */}
      {selectingMode && !isMobileSidebarOpen && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] w-[90%] max-w-sm">
          <div className="bg-slate-900/90 backdrop-blur-md text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center justify-between border border-slate-700/50">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full animate-pulse ${selectingMode === 'start' ? 'bg-emerald-400' : 'bg-red-400'}`} />
              <span className="font-medium text-sm">
                {selectingMode === 'start' ? 'Haritadan BAŞLANGIÇ seçin' : 'Haritadan VARIŞ seçin'}
              </span>
            </div>
            <button 
              onClick={() => setSelectingMode(null)}
              className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      {/* 2. Mini Rota Kartı (Menü kapalıyken ve seçim modu yokken üstte görünür) */}
      {!isMobileSidebarOpen && !selectingMode && (
        <div className="md:hidden absolute top-4 left-1/2 -translate-x-1/2 z-[1000] w-[90%] max-w-sm">
          <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200 dark:border-slate-800 overflow-hidden">
            <div className="p-3 flex items-center justify-between border-b border-gray-100 dark:border-slate-800">
              <span className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider">Rota Planlayıcı</span>
              <button
                onClick={toggleMobileSidebar}
                className="p-1.5 bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 rounded-lg hover:bg-brand-100 dark:hover:bg-brand-900/50 transition-colors"
              >
                <Menu size={18} />
              </button>
            </div>
            
            <div className="p-3 flex gap-3 relative">
              <div className="flex flex-col items-center justify-between py-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <div className="w-0.5 h-6 bg-gray-200 dark:bg-slate-700" />
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
              </div>
              
              <div className="flex-1 flex flex-col gap-2">
                <button 
                  onClick={() => setSelectingMode('start')}
                  className="w-full text-left px-3 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl text-sm text-gray-700 dark:text-slate-300 truncate"
                >
                  {startLocation ? `${startLocation.lat.toFixed(3)}, ${startLocation.lng.toFixed(3)}` : 'Başlangıç seç...'}
                </button>
                <button 
                  onClick={() => setSelectingMode('end')}
                  className="w-full text-left px-3 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl text-sm text-gray-700 dark:text-slate-300 truncate"
                >
                  {endLocation ? `${endLocation.lat.toFixed(3)}, ${endLocation.lng.toFixed(3)}` : 'Varış seç...'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Mobil: Rota özet pill (haritanın altında) ── */}
      {routeSummary && (
        <div className="md:hidden absolute bottom-6 left-1/2 -translate-x-1/2 z-[1000] bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl px-5 py-3 flex gap-5 text-sm border border-gray-100">
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-400 uppercase">Mesafe</span>
            <span className="font-bold text-brand-700">{routeSummary.totalDistanceKm} km</span>
          </div>
          <div className="w-px bg-gray-200" />
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-400 uppercase">Toplam</span>
            <span className="font-bold text-brand-700">
              {(() => {
                const h = (routeSummary as any).totalJourneyHours ?? routeSummary.estimatedDurationHours;
                const hours = Math.floor(h);
                const mins  = Math.round((h - hours) * 60);
                return hours > 0 ? `${hours}s ${mins}dk` : `${mins}dk`;
              })()}
            </span>
          </div>
          <div className="w-px bg-gray-200" />
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-400 uppercase">Şarj</span>
            <span className="font-bold text-amber-600">{routeSummary.chargeStopsCount}×⚡</span>
          </div>
        </div>
      )}
    </div>
  );
};
