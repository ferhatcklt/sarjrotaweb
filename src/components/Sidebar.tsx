/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo, useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';
import type { Vehicle, RouteAlternative } from '../store/useAppStore';
import { Settings, MapPin, Battery, Zap, Info, Search, Plug, X, Moon, Sun } from 'lucide-react';

const CONNECTOR_TYPES = [
  { key: 'AC',  label: 'AC',     desc: 'Yavaş / Normal' },
  { key: 'DC',  label: 'DC',     desc: 'Hızlı Şarj'     },
  { key: 'HPC', label: 'DC Max', desc: 'Ultra Hızlı'    },
];

// Marka renk haritası (görsel ayrım için)
// (Silindi, çünkü kullanılmıyor)

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const Sidebar = () => {
  const {
    startLocation,
    endLocation,
    selectedVehicle,
    selectedStationBrands,
    setSelectedVehicle,
    toggleStationBrand,
    setRouteData,
    routeSummary,
    alternatives,
    selectedAlternativeIndex,
    selectAlternative,
    closeMobileSidebar,
    selectingMode,
    setSelectingMode,
    theme,
    toggleTheme,
  } = useAppStore();

  const [isLoading, setIsLoading]         = useState(false);
  const [vehicleSearch, setVehicleSearch] = useState('');
  const [connectorTypes, setConnectorTypes] = useState<string[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [stationBrands, setStationBrands] = useState<string[]>([]);

  // API'den araçları ve istasyon markalarını çek
  useEffect(() => {
    fetch(`${API_BASE}/api/vehicles`)
      .then(r => r.json())
      .then(data => setVehicles(data))
      .catch(err => console.error('Araçlar yüklenemedi:', err));

    fetch(`${API_BASE}/api/stations/brands`)
      .then(r => r.json())
      .then(data => setStationBrands(data))
      .catch(err => console.error('Markalar yüklenemedi:', err));
  }, []);



  const filteredVehicles = useMemo(() =>
    vehicles.filter(v =>
      `${v.brand} ${v.model}`.toLowerCase().includes(vehicleSearch.toLowerCase())
    ), [vehicleSearch, vehicles]);

  const toggleConnector = (key: string) =>
    setConnectorTypes(prev =>
      prev.includes(key) ? prev.filter(c => c !== key) : [...prev, key]
    );

  /** Backend'den gelen menzil: fabrika × %90 */
  const effectiveRange = (km: number) => Math.round(km * 0.9);

  /** Ondalık saati "8 s 47 dk" formatına çevirir */
  const formatHours = (h: number) => {
    const hours   = Math.floor(h);
    const minutes = Math.round((h - hours) * 60);
    if (hours === 0)   return `${minutes} dk`;
    if (minutes === 0) return `${hours} s`;
    return `${hours} s ${minutes} dk`;
  };

  const handleCalculateRoute = async () => {
    if (!startLocation || !endLocation || !selectedVehicle) return;

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE}/api/Route/calculate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          start: { lat: startLocation.lat, lng: startLocation.lng },
          end:   { lat: endLocation.lat,   lng: endLocation.lng   },
          vehicleId:      selectedVehicle.id,
          preferredBrands: selectedStationBrands,
          connectorTypes,   // ← AC / DC / HPC filtresi
        }),
      });

      if (!response.ok) throw new Error('API Hatası');

      const data = await response.json();

      // İlk (en iyi) rota
      const mappedRoute = data.path.map((p: any) => ({
        lat: p.latitude,
        lng: p.longitude,
        name: p.name,
      }));

      // Tüm alternatifleri dönüştür
      const mappedAlternatives: RouteAlternative[] = (data.alternatives ?? []).map((alt: any) => ({
        index: alt.index,
        path:  alt.path.map((p: any) => ({ lat: p.latitude, lng: p.longitude })),
        stops: alt.stops,
        nearbyStations: alt.nearbyStations ?? [],
        totalDistanceKm:        alt.totalDistanceKm,
        estimatedDurationHours: alt.estimatedDurationHours,
        chargeTimeHours:        alt.chargeTimeHours ?? 0,
        totalJourneyHours:      alt.totalJourneyHours ?? alt.estimatedDurationHours,
        chargeStopsCount:       alt.chargeStopsCount,
        arrivalChargePercentage: alt.arrivalChargePercentage,
      }));

      setRouteData(
        mappedRoute, data.stops,
        {
          totalDistanceKm:        data.totalDistanceKm,
          estimatedDurationHours: data.estimatedDurationHours,
          chargeTimeHours:        data.chargeTimeHours ?? 0,
          totalJourneyHours:      data.totalJourneyHours ?? data.estimatedDurationHours,
          chargeStopsCount:       data.chargeStopsCount,
          arrivalChargePercentage: data.arrivalChargePercentage,
        },
        mappedAlternatives,
        data.nearbyStations ?? [],
      );
      closeMobileSidebar();
    } catch (error) {
      console.error('Rota hesaplanırken hata:', error);
      alert("Rota hesaplanırken bir hata oluştu. API'nin çalıştığından emin olun.");
    } finally {
      setIsLoading(false);
    }
  };

  // Aktif Filtre: Şarj noktası veya marka değiştiğinde otomatik rota hesapla
  useEffect(() => {
    if (startLocation && endLocation && selectedVehicle && routeSummary) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      handleCalculateRoute();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectorTypes, selectedStationBrands]);

  return (
    <div className="w-80 bg-white dark:bg-slate-900 h-full shadow-xl flex flex-col z-10 overflow-y-auto transition-colors duration-300 border-r border-slate-200 dark:border-slate-800">
      {/* Header */}
      <div className="p-6 bg-brand-600 dark:bg-slate-950 text-white shadow-md flex items-start justify-between transition-colors">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Zap className="text-yellow-300" />
            Şarj Rota
          </h1>
          <p className="text-brand-100 dark:text-slate-400 text-sm mt-1">sarjrota.com.tr</p>
        </div>
        <div className="flex items-center">
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors mr-2"
            title="Temayı Değiştir"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          {/* Mobil kapat butonu */}
          <button
            onClick={closeMobileSidebar}
            className="md:hidden p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col gap-6">

        {/* ── Rota ── */}
        <section>
          <h2 className="text-sm font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <MapPin size={16} /> Rota
          </h2>
          <div className="flex flex-col gap-3 relative">
            <div className="absolute left-[11px] top-4 bottom-4 w-0.5 bg-gray-200 dark:bg-slate-700" />
            {/* Başlangıç */}
            <div
              className="flex items-center gap-3 relative z-10 cursor-pointer group"
              onClick={() => setSelectingMode('start')}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all ${
                selectingMode === 'start' ? 'bg-brand-500 border-brand-600 scale-110 shadow-md' : 'bg-brand-100 dark:bg-slate-800 border-brand-500 dark:border-brand-600'
              }`}>
                <div className={`w-2 h-2 rounded-full ${selectingMode === 'start' ? 'bg-white' : 'bg-brand-600 dark:bg-brand-400'}`} />
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Başlangıç (Tıklayıp haritadan seç)"
                  value={startLocation ? `${startLocation.lat.toFixed(3)}, ${startLocation.lng.toFixed(3)}` : ''}
                  readOnly
                  className={`w-full bg-gray-50 dark:bg-slate-800 border rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white cursor-pointer transition-all ${
                    selectingMode === 'start'
                      ? 'border-brand-500 ring-2 ring-brand-200 dark:ring-brand-900/50 bg-brand-50 dark:bg-brand-900/20'
                      : 'border-gray-200 dark:border-slate-700 hover:border-brand-300 dark:hover:border-brand-600'
                  }`}
                />
              </div>
            </div>
            {/* Varış */}
            <div
              className="flex items-center gap-3 relative z-10 cursor-pointer group"
              onClick={() => setSelectingMode('end')}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all ${
                selectingMode === 'end' ? 'bg-red-500 border-red-600 scale-110 shadow-md' : 'bg-red-100 dark:bg-slate-800 border-red-500 dark:border-red-800'
              }`}>
                <div className={`w-2 h-2 rounded-full ${selectingMode === 'end' ? 'bg-white' : 'bg-red-600 dark:bg-red-500'}`} />
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Varış (Tıklayıp haritadan seç)"
                  value={endLocation ? `${endLocation.lat.toFixed(3)}, ${endLocation.lng.toFixed(3)}` : ''}
                  readOnly
                  className={`w-full bg-gray-50 dark:bg-slate-800 border rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white cursor-pointer transition-all ${
                    selectingMode === 'end'
                      ? 'border-red-500 ring-2 ring-red-200 dark:ring-red-900/50 bg-red-50 dark:bg-red-900/20'
                      : 'border-gray-200 dark:border-slate-700 hover:border-red-300 dark:hover:border-red-600'
                  }`}
                />
              </div>
            </div>
            {/* Seçim modu ipucu */}
            {selectingMode && (
              <p className="text-xs text-center animate-pulse mt-1" style={{ color: selectingMode === 'start' ? '#0d9488' : '#ef4444' }}>
                📍 Haritaya tıklayarak {selectingMode === 'start' ? 'başlangıç' : 'varış'} noktasını seçin
              </p>
            )}
          </div>
        </section>

        <hr className="border-gray-100 dark:border-slate-800" />

        {/* ── Araç Seçimi ── */}
        <section>
          <h2 className="text-sm font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Battery size={16} /> Aracınız
          </h2>

          {/* Arama kutusu */}
          <div className="relative mb-3">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Araç ara… (Tesla, Togg, BMW…)"
              value={vehicleSearch}
              onChange={e => setVehicleSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 dark:border-slate-700 rounded-lg bg-gray-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-500 transition-colors"
            />
          </div>

          <div className="space-y-2 max-h-52 overflow-y-auto pr-1 custom-scrollbar">
            {filteredVehicles.length === 0 ? (
              <p className="text-xs text-gray-400 dark:text-slate-500 text-center py-4">Araç bulunamadı</p>
            ) : filteredVehicles.map(vehicle => (
              <label
                key={vehicle.id}
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                  selectedVehicle?.id === vehicle.id
                    ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20'
                    : 'border-gray-200 dark:border-slate-700 hover:border-brand-300 dark:hover:border-slate-500'
                }`}
              >
                <input
                  type="radio"
                  name="vehicle"
                  checked={selectedVehicle?.id === vehicle.id}
                  onChange={() => setSelectedVehicle(vehicle)}
                  className="text-brand-600 focus:ring-brand-500"
                />
                <div className="flex flex-col leading-tight">
                  <span className="font-medium text-sm text-gray-800 dark:text-slate-200">{vehicle.brand} {vehicle.model}</span>
                  <span className="text-xs text-gray-400 dark:text-slate-500 mt-1">
                    Fabrika: {vehicle.rangeKm} km &nbsp;·&nbsp;
                    <span className="text-brand-600 dark:text-brand-400 font-medium">Gerçek: ~{effectiveRange(vehicle.rangeKm)} km</span>
                  </span>
                </div>
              </label>
            ))}
          </div>
        </section>

        <hr className="border-gray-100 dark:border-slate-800" />

        {/* ── Konnektör Tipi ── */}
        <section>
          <h2 className="text-sm font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Plug size={16} /> Şarj Tipi
          </h2>
          <p className="text-xs text-gray-400 mb-3">Boş bırakırsanız tüm tipler kullanılır.</p>
          <div className="flex gap-2">
            {CONNECTOR_TYPES.map(({ key, label, desc }) => {
              const active = connectorTypes.includes(key);
              return (
                <button
                  key={key}
                  onClick={() => toggleConnector(key)}
                  className={`flex-1 flex flex-col items-center py-2 px-1 rounded-lg border text-xs font-semibold transition-all ${
                    active
                      ? 'bg-brand-600 dark:bg-brand-700 border-brand-600 dark:border-brand-700 text-white shadow-sm'
                      : 'bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-300 hover:border-brand-400 dark:hover:border-slate-500'
                  }`}
                >
                  <span className="text-sm">{label}</span>
                  <span className={`text-[10px] font-normal mt-0.5 ${active ? 'text-brand-100' : 'text-gray-400 dark:text-slate-500'}`}>{desc}</span>
                </button>
              );
            })}
          </div>
        </section>

        <hr className="border-gray-100 dark:border-slate-800" />

        {/* ── İstasyon Markaları ── */}
        <section>
          <h2 className="text-sm font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Settings size={16} /> Tercih Edilen İstasyonlar
          </h2>
          <div className="flex flex-wrap gap-2">
            {stationBrands.map(brandName => {
              const isSelected = selectedStationBrands.includes(brandName);
              return (
                <button
                  key={brandName}
                  onClick={() => toggleStationBrand(brandName)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                    isSelected
                      ? 'bg-brand-600 dark:bg-brand-700 border-brand-600 dark:border-brand-700 text-white'
                      : 'bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-700 text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700'
                  }`}
                >
                  {brandName}
                </button>
              );
            })}
          </div>
        </section>
      </div>

      {/* ── Alt Panel ── */}
      <div className="p-4 border-t border-gray-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-900 flex flex-col gap-3 transition-colors">
        {/* Rota alternatif seçici */}
        {alternatives.length > 1 && (
          <div className="flex flex-col gap-1.5">
            <p className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1">
              Rota Alternatifleri
            </p>
            {alternatives.map((alt) => {
              const colors = ['text-sky-600 border-sky-400 bg-sky-50 dark:bg-sky-900/20 dark:text-sky-400', 'text-violet-600 border-violet-400 bg-violet-50 dark:bg-violet-900/20 dark:text-violet-400', 'text-orange-600 border-orange-400 bg-orange-50 dark:bg-orange-900/20 dark:text-orange-400'];
              const activeColors = ['border-sky-500 bg-sky-100 dark:bg-sky-900/40', 'border-violet-500 bg-violet-100 dark:bg-violet-900/40', 'border-orange-500 bg-orange-100 dark:bg-orange-900/40'];
              const isActive = alt.index === selectedAlternativeIndex;
              return (
                <button
                  key={alt.index}
                  onClick={() => selectAlternative(alt.index)}
                  className={`w-full text-left px-3 py-2 rounded-lg border-2 text-xs transition-all flex items-center justify-between ${isActive ? activeColors[alt.index % 3] : 'border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-gray-300 dark:hover:border-slate-600'} ${colors[alt.index % 3]}`}
                >
                  <span className="font-semibold text-slate-900 dark:text-slate-100">Rota {alt.index + 1}</span>
                  <div className="text-right">
                    <div className="text-gray-600 dark:text-slate-300">{alt.totalDistanceKm} km · {formatHours(alt.totalJourneyHours ?? alt.estimatedDurationHours)}</div>
                    <div className="text-[10px] text-gray-400 dark:text-slate-500">{alt.chargeStopsCount} şarj molası · Varış: %{alt.arrivalChargePercentage ?? '?'}</div>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Aktif rota özeti */}
        {routeSummary && (
          <div className="bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-900/50 p-3 rounded-lg text-sm flex flex-col gap-2">
            <h3 className="font-semibold text-brand-900 dark:text-brand-100 flex items-center gap-1">
              <Info size={16} className="text-brand-600 dark:text-brand-400" /> Rota Özeti
            </h3>
            <div className="grid grid-cols-2 gap-2 text-brand-800 dark:text-brand-200">
              <div className="flex flex-col">
                <span className="text-xs text-brand-600/80 dark:text-brand-400/80 uppercase">Mesafe</span>
                <span className="font-medium">{routeSummary.totalDistanceKm} km</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-brand-600/80 dark:text-brand-400/80 uppercase">Sürüş Süresi</span>
                <span className="font-medium">{formatHours(routeSummary.estimatedDurationHours)}</span>
              </div>

              {routeSummary.chargeTimeHours > 0 && (
                <>
                  <div className="flex flex-col col-span-2 border-t border-brand-200/50 dark:border-brand-800/50 pt-2 mt-0.5">
                    <span className="text-xs text-amber-600/80 dark:text-amber-500/80 uppercase">Şarj Bekleme</span>
                    <span className="font-medium text-amber-700 dark:text-amber-500">
                      +{Math.round(routeSummary.chargeTimeHours * 60)} dk
                      &nbsp;·&nbsp; {routeSummary.chargeStopsCount} durak
                    </span>
                  </div>
                  <div className="flex flex-col col-span-2 bg-brand-100 dark:bg-brand-900/40 rounded-lg px-2 py-1.5">
                    <span className="text-xs text-brand-600/80 dark:text-brand-400/80 uppercase">Toplam Seyahat</span>
                    <span className="font-bold text-brand-900 dark:text-brand-100 text-base">{formatHours(routeSummary.totalJourneyHours)}</span>
                    <span className="text-[10px] text-brand-600/70 dark:text-brand-400/70">Sürüş + Şarj süresi</span>
                  </div>
                </>
              )}

              {routeSummary.chargeTimeHours === 0 && (
                <div className="col-span-2 flex flex-col border-t border-brand-200/50 dark:border-brand-800/50 pt-2 mt-1">
                  <span className="text-xs text-brand-600/80 dark:text-brand-400/80 uppercase">Şarj Molası</span>
                  <span className="font-medium">Bu rotada şarj gerekmez ✅</span>
                </div>
              )}

              {/* Varış Şarj Yüzdesi */}
              {routeSummary.arrivalChargePercentage !== undefined && (
                <div className="col-span-2 flex flex-col border-t border-brand-200/50 dark:border-brand-800/50 pt-2 mt-1">
                  <span className="text-xs text-brand-600/80 dark:text-brand-400/80 uppercase">Varış Şarjı</span>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all ${
                          routeSummary.arrivalChargePercentage > 30 ? 'bg-emerald-500' 
                          : routeSummary.arrivalChargePercentage > 15 ? 'bg-amber-500' 
                          : 'bg-red-500'
                        }`}
                        style={{ width: `${routeSummary.arrivalChargePercentage}%` }}
                      />
                    </div>
                    <span className={`font-bold text-sm ${
                      routeSummary.arrivalChargePercentage > 30 ? 'text-emerald-700 dark:text-emerald-400' 
                      : routeSummary.arrivalChargePercentage > 15 ? 'text-amber-700 dark:text-amber-400' 
                      : 'text-red-700 dark:text-red-400'
                    }`}>
                      %{routeSummary.arrivalChargePercentage}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <button
          onClick={handleCalculateRoute}
          disabled={!startLocation || !endLocation || !selectedVehicle || isLoading}
          className="w-full bg-brand-600 dark:bg-brand-500 text-white py-3 rounded-lg font-semibold hover:bg-brand-700 dark:hover:bg-brand-600 transition-colors disabled:bg-gray-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
        >
          <MapPin size={18} />
          {isLoading ? 'Hesaplanıyor…' : 'Rota Oluştur'}
        </button>
      </div>
    </div>
  );
};
