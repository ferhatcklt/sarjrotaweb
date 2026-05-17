/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import {
  MapContainer, TileLayer, Marker, Popup,
  useMapEvents, Polyline, useMap,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useAppStore } from '../store/useAppStore';

// Marka bazlı şarj tarifeleri (TL/kWh) — API ile senkron
const CHARGE_PRICES: Record<string, number> = {
  ZES: 14.50, 'Eşarj': 13.50, Trugo: 14.98,
  Tesla: 12.30, Voltrun: 14.00, 'Sharz.net': 14.00, Astor: 14.00,
};
const DEFAULT_PRICE = 14.00;
const getPrice = (brand?: string) =>
  brand && CHARGE_PRICES[brand] ? CHARGE_PRICES[brand] : DEFAULT_PRICE;

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
  } = useAppStore();

  const defaultCenter: [number, number] = [39.0, 35.0];
  const activePositions = route.map(p => [p.lat, p.lng] as [number, number]);

  // Yakın istasyonlar arasından zorunlu durakları çıkar (çift pin önleme)
  const stopIds = new Set(stops.map(s => s.id?.toString()));
  const nearbyOnly = nearbyStations.filter(s => !stopIds.has(s.id?.toString()));

  return (
    <div className="flex-1 h-full w-full relative z-0">
      <MapContainer
        center={defaultCenter}
        zoom={6}
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
          return (
            <Marker key={`nearby-${station.id ?? i}`} position={[lat, lng]} icon={nearbyIcon}>
              <Popup minWidth={160}>
                <div style={{ lineHeight: 1.5 }}>
                  <strong style={{ fontSize: 12 }}>🔌 {station.name || 'İstasyon'}</strong><br />
                  <span style={{ color: '#666', fontSize: 11 }}>{station.brand}</span>
                  {connectors && <><br /><span style={{ fontSize: 10 }}>{connectors}</span></>}
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
          return (
            <Marker key={`stop-${stop.id ?? i}`} position={[lat, lng]} icon={makeStopIcon(i)} zIndexOffset={1000}>
              <Popup minWidth={180}>
                <div style={{ lineHeight: 1.5 }}>
                  <strong style={{ fontSize: 13, color: '#1d4ed8' }}>🔋 Durak #{i + 1}: {stop.name || 'Şarj İstasyonu'}</strong><br />
                  <span style={{ color: '#666', fontSize: 12 }}>Marka: {stop.brand}</span><br />
                  {connectors && <><span style={{ fontSize: 11 }}>{connectors}</span><br/></>}
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

      {/* ── Mobil: Sidebar aç butonu ── */}
      <button
        onClick={toggleMobileSidebar}
        className="md:hidden absolute top-4 left-4 z-[1000] bg-brand-600 text-white rounded-xl shadow-lg px-4 py-2.5 flex items-center gap-2 font-semibold text-sm"
      >
        <span>☰</span>
        {isMobileSidebarOpen ? 'Kapat' : 'Rota Planla'}
      </button>

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
