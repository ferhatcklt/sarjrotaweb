'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/store/useAppStore';
import type { Vehicle, RouteAlternative } from '@/store/useAppStore';
import { Settings, MapPin, Battery, Info, Search, Plug, X, Moon, Sun, Loader2, ArrowUpDown } from 'lucide-react';
import { useLocationSearch, type SearchResult } from '@/lib/useLocationSearch';

const CONNECTOR_TYPES = [
  { key: 'AC',  label: 'AC',     desc: 'Yavaş / Normal' },
  { key: 'DC',  label: 'DC',     desc: 'Hızlı Şarj'     },
  { key: 'HPC', label: 'DC Max', desc: 'Ultra Hızlı'    },
];

// Marka renk haritası (görsel ayrım için)
// (Silindi, çünkü kullanılmıyor)

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export const Sidebar = () => {
  const {
    startLocation,
    endLocation,
    selectedVehicle,
    selectedStationBrands,
    setSelectedVehicle,
    setStartLocation,
    setEndLocation,
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
    resetRoute,
    route,
    initialChargePercentage,
    setInitialChargePercentage,
  } = useAppStore();

  const [isLoading, setIsLoading]         = useState(false);
  const [vehicleSearch, setVehicleSearch] = useState('');
  const [connectorTypes, setConnectorTypes] = useState<string[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [stationBrands, setStationBrands] = useState<string[]>([]);

  // ── Konum Arama (Geocoding) ──
  const startSearch = useLocationSearch(350);
  const endSearch = useLocationSearch(350);
  const [startInputValue, setStartInputValue] = useState('');
  const [endInputValue, setEndInputValue] = useState('');
  const [showStartResults, setShowStartResults] = useState(false);
  const [showEndResults, setShowEndResults] = useState(false);
  const startDropdownRef = useRef<HTMLDivElement>(null);
  const endDropdownRef = useRef<HTMLDivElement>(null);

  // Haritadan tıklanarak konum seçildiğinde input değerini güncelle
  useEffect(() => {
    if (startLocation && !startSearch.query) {
      setStartInputValue(`${startLocation.lat.toFixed(4)}, ${startLocation.lng.toFixed(4)}`);
    }
  }, [startLocation]);

  useEffect(() => {
    if (endLocation && !endSearch.query) {
      setEndInputValue(`${endLocation.lat.toFixed(4)}, ${endLocation.lng.toFixed(4)}`);
    }
  }, [endLocation]);

  // Dropdown dışına tıklayınca kapat
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (startDropdownRef.current && !startDropdownRef.current.contains(e.target as Node)) {
        setShowStartResults(false);
      }
      if (endDropdownRef.current && !endDropdownRef.current.contains(e.target as Node)) {
        setShowEndResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleStartSearchChange = useCallback((value: string) => {
    setStartInputValue(value);
    startSearch.setQuery(value);
    setShowStartResults(value.length >= 2);
    if (value.length < 2) setShowStartResults(false);
  }, [startSearch]);

  const handleEndSearchChange = useCallback((value: string) => {
    setEndInputValue(value);
    endSearch.setQuery(value);
    setShowEndResults(value.length >= 2);
    if (value.length < 2) setShowEndResults(false);
  }, [endSearch]);

  const handleSelectStartResult = useCallback((result: SearchResult) => {
    setStartInputValue(result.displayName.split(',').slice(0, 2).join(','));
    setStartLocation({ lat: result.lat, lng: result.lng, name: result.displayName });
    setShowStartResults(false);
    startSearch.clear();
    // Başlangıç seçildi, varışa geç
    if (!endLocation) setSelectingMode('end');
  }, [setStartLocation, endLocation, setSelectingMode, startSearch]);

  const handleSelectEndResult = useCallback((result: SearchResult) => {
    setEndInputValue(result.displayName.split(',').slice(0, 2).join(','));
    setEndLocation({ lat: result.lat, lng: result.lng, name: result.displayName });
    setShowEndResults(false);
    endSearch.clear();
    setSelectingMode(null);
  }, [setEndLocation, setSelectingMode, endSearch]);

  // Başlangıç ↔ Varış yer değiştir
  const handleSwapLocations = useCallback(() => {
    const tmpLoc = startLocation;
    const tmpInput = startInputValue;
    setStartLocation(endLocation);
    setEndLocation(tmpLoc);
    setStartInputValue(endInputValue);
    setEndInputValue(tmpInput);
  }, [startLocation, endLocation, startInputValue, endInputValue, setStartLocation, setEndLocation]);

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
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          start: { lat: startLocation.lat, lng: startLocation.lng },
          end:   { lat: endLocation.lat,   lng: endLocation.lng   },
          vehicleId:      selectedVehicle.id,
          preferredBrands: selectedStationBrands,
          connectorTypes,
          initialChargePercentage,
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
        estimatedCost:          alt.estimatedCost,
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
          estimatedCost:          data.estimatedCost,
        },
        mappedAlternatives,
        data.nearbyStations ?? [],
      );
      closeMobileSidebar();
    } catch (error) {
      console.error('Rota hesaplanırken hata:', error);
      alert("Seçilen noktalara araç rotası oluşturulamadı. Lütfen deniz üstü veya karayolu olmayan (ulaşılamaz) bir nokta seçmediğinizden emin olun.");
    } finally {
      setIsLoading(false);
    }
  };

  // Aktif Filtre: Şarj noktası veya marka değiştiğinde otomatik rota hesapla
  useEffect(() => {
    if (startLocation && endLocation && selectedVehicle && routeSummary) {
      handleCalculateRoute();
    }
  }, [connectorTypes, selectedStationBrands, initialChargePercentage]);

  // Yeni: Kullanıcı Haritadan veya Menüden Başlangıç/Varış/Araç seçtiğinde otomatik rota hesapla
  useEffect(() => {
    if (startLocation && endLocation && selectedVehicle) {
      handleCalculateRoute();
    }
  }, [startLocation, endLocation, selectedVehicle]);

  return (
    <div className="w-full bg-white dark:bg-slate-900 h-full shadow-xl flex flex-col z-10 transition-colors duration-300 border-r border-slate-200 dark:border-slate-800">
      {/* Header */}
      <div className="p-6 bg-brand-600 dark:bg-slate-950 text-white shadow-md flex items-start justify-between transition-colors">
        <div>
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo-white.png" alt="ŞarjRota Logo" className="h-10 w-auto object-contain" />
          </Link>
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

      <div className="p-6 flex-1 flex flex-col gap-6 overflow-y-auto custom-scrollbar">

        {/* ── Rota ── */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <MapPin size={16} /> Rota
            </h2>
            {(startLocation || endLocation || route.length > 0) && (
              <button
                onClick={() => {
                  resetRoute();
                  setStartInputValue('');
                  setEndInputValue('');
                  startSearch.clear();
                  endSearch.clear();
                }}
                className="text-xs font-medium text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors"
              >
                Temizle
              </button>
            )}
          </div>
          <div className="flex flex-col gap-3 relative">
            <div className="absolute left-[11px] top-4 bottom-4 w-0.5 bg-gray-200 dark:bg-slate-700" />
            {/* Başlangıç */}
            <div className="flex items-center gap-3 relative z-20" ref={startDropdownRef}>
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all shrink-0 cursor-pointer ${
                  selectingMode === 'start' ? 'bg-brand-500 border-brand-600 scale-110 shadow-md' : 'bg-brand-100 dark:bg-slate-800 border-brand-500 dark:border-brand-600'
                }`}
                onClick={() => setSelectingMode('start')}
              >
                <div className={`w-2 h-2 rounded-full ${selectingMode === 'start' ? 'bg-white' : 'bg-brand-600 dark:bg-brand-400'}`} />
              </div>
              <div className="flex-1 relative">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500 pointer-events-none" />
                  {startSearch.isSearching && (
                    <Loader2 size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-500 animate-spin" />
                  )}
                  <input
                    type="text"
                    placeholder="Başlangıç yaz veya haritadan seç"
                    value={startInputValue}
                    onChange={(e) => handleStartSearchChange(e.target.value)}
                    onFocus={() => {
                      setSelectingMode('start');
                      if (startSearch.results.length > 0) setShowStartResults(true);
                    }}
                    className={`w-full bg-gray-50 dark:bg-slate-800 border rounded-lg pl-9 pr-3 py-2 text-sm text-slate-900 dark:text-white transition-all ${
                      selectingMode === 'start'
                        ? 'border-brand-500 ring-2 ring-brand-200 dark:ring-brand-900/50 bg-brand-50 dark:bg-brand-900/20'
                        : 'border-gray-200 dark:border-slate-700 hover:border-brand-300 dark:hover:border-brand-600'
                    }`}
                  />
                </div>
                {/* Arama Sonuçları Dropdown */}
                {showStartResults && startSearch.results.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl shadow-xl overflow-hidden z-50 backdrop-blur-sm max-h-52 overflow-y-auto">
                    {startSearch.results.map((result, i) => (
                      <button
                        key={`start-${i}-${result.lat}`}
                        onClick={() => handleSelectStartResult(result)}
                        className="w-full text-left px-3 py-2.5 hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-colors flex items-start gap-2.5 border-b border-gray-100 dark:border-slate-700/50 last:border-0"
                      >
                        <MapPin size={14} className="text-brand-500 mt-0.5 shrink-0" />
                        <span className="text-xs text-gray-700 dark:text-slate-300 leading-snug line-clamp-2">{result.displayName}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {/* Yer Değiştir Butonu */}
            {(startLocation || endLocation) && (
              <div className="flex justify-center -my-1 relative z-[15]">
                <button
                  onClick={handleSwapLocations}
                  className="p-1.5 rounded-full bg-gray-100 dark:bg-slate-800 hover:bg-brand-100 dark:hover:bg-brand-900/40 border border-gray-200 dark:border-slate-700 transition-all hover:scale-110 shadow-sm"
                  title="Başlangıç ve varışı değiştir"
                >
                  <ArrowUpDown size={14} className="text-gray-500 dark:text-slate-400" />
                </button>
              </div>
            )}
            {/* Varış */}
            <div className="flex items-center gap-3 relative z-10" ref={endDropdownRef}>
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all shrink-0 cursor-pointer ${
                  selectingMode === 'end' ? 'bg-red-500 border-red-600 scale-110 shadow-md' : 'bg-red-100 dark:bg-slate-800 border-red-500 dark:border-red-800'
                }`}
                onClick={() => setSelectingMode('end')}
              >
                <div className={`w-2 h-2 rounded-full ${selectingMode === 'end' ? 'bg-white' : 'bg-red-600 dark:bg-red-500'}`} />
              </div>
              <div className="flex-1 relative">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500 pointer-events-none" />
                  {endSearch.isSearching && (
                    <Loader2 size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 animate-spin" />
                  )}
                  <input
                    type="text"
                    placeholder="Varış yaz veya haritadan seç"
                    value={endInputValue}
                    onChange={(e) => handleEndSearchChange(e.target.value)}
                    onFocus={() => {
                      setSelectingMode('end');
                      if (endSearch.results.length > 0) setShowEndResults(true);
                    }}
                    className={`w-full bg-gray-50 dark:bg-slate-800 border rounded-lg pl-9 pr-3 py-2 text-sm text-slate-900 dark:text-white transition-all ${
                      selectingMode === 'end'
                        ? 'border-red-500 ring-2 ring-red-200 dark:ring-red-900/50 bg-red-50 dark:bg-red-900/20'
                        : 'border-gray-200 dark:border-slate-700 hover:border-red-300 dark:hover:border-red-600'
                    }`}
                  />
                </div>
                {/* Arama Sonuçları Dropdown */}
                {showEndResults && endSearch.results.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl shadow-xl overflow-hidden z-50 backdrop-blur-sm max-h-52 overflow-y-auto">
                    {endSearch.results.map((result, i) => (
                      <button
                        key={`end-${i}-${result.lat}`}
                        onClick={() => handleSelectEndResult(result)}
                        className="w-full text-left px-3 py-2.5 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-start gap-2.5 border-b border-gray-100 dark:border-slate-700/50 last:border-0"
                      >
                        <MapPin size={14} className="text-red-500 mt-0.5 shrink-0" />
                        <span className="text-xs text-gray-700 dark:text-slate-300 leading-snug line-clamp-2">{result.displayName}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {/* Seçim modu ipucu */}
            {selectingMode && (
              <p className="text-xs text-center animate-pulse mt-1" style={{ color: selectingMode === 'start' ? '#0d9488' : '#ef4444' }}>
                📍 Yazarak arayın veya haritaya tıklayarak {selectingMode === 'start' ? 'başlangıç' : 'varış'} noktasını seçin
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

          {/* Başlangıç Şarjı */}
          {selectedVehicle && (
            <div className="mt-4 p-3 bg-brand-50 dark:bg-brand-900/20 rounded-lg border border-brand-100 dark:border-brand-800/50">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-gray-600 dark:text-slate-300">Yola Çıkış Şarjı</label>
              </div>
              <div className="flex gap-1">
                {[20, 40, 60, 80, 100].map((val) => {
                  const isActive = initialChargePercentage === val;
                  return (
                    <button
                      key={val}
                      onClick={() => setInitialChargePercentage(val)}
                      className={`flex-1 py-1.5 rounded text-xs font-bold transition-all ${
                        isActive
                          ? 'bg-brand-500 text-white shadow-sm'
                          : 'bg-white dark:bg-slate-800 text-gray-500 dark:text-slate-400 hover:bg-brand-100 dark:hover:bg-brand-900/40 border border-gray-200 dark:border-slate-700'
                      }`}
                    >
                      %{val}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
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
      <div className="p-4 border-t border-gray-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-900 flex flex-col gap-3 transition-colors shrink-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] dark:shadow-none z-20">
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
                    <div className="text-[10px] text-gray-400 dark:text-slate-500 flex flex-col items-end gap-0.5 mt-0.5">
                      <span>{alt.chargeStopsCount} mola · Varış: %{alt.arrivalChargePercentage ?? '?'}</span>
                      {alt.estimatedCost !== undefined && alt.estimatedCost > 0 && (
                        <span className="text-emerald-600 dark:text-emerald-400 font-medium">₺{alt.estimatedCost.toLocaleString('tr-TR')}</span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Aktif rota özeti */}
        {routeSummary && (
          <div className="bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-900/50 p-3 rounded-lg text-sm flex flex-col gap-2 relative overflow-hidden">
            <h3 className="font-semibold text-brand-900 dark:text-brand-100 flex items-center gap-1.5 text-sm mb-1">
              <Info size={16} className="text-brand-600 dark:text-brand-400" /> Rota Özeti
            </h3>
            
            <div className="flex flex-col gap-1.5 text-[13px] text-gray-700 dark:text-slate-300">
              <div className="flex justify-between items-center">
                <span className="text-gray-500 dark:text-slate-400">Mesafe</span>
                <span className="font-semibold text-gray-900 dark:text-white">{routeSummary.totalDistanceKm} km</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 dark:text-slate-400">Sürüş Süresi</span>
                <span className="font-semibold text-gray-900 dark:text-white">{formatHours(routeSummary.estimatedDurationHours)}</span>
              </div>

              {routeSummary.chargeTimeHours > 0 ? (
                <>
                  <div className="flex justify-between items-center text-amber-700 dark:text-amber-500">
                    <span>Şarj Bekleme <span className="text-[11px] opacity-80">({routeSummary.chargeStopsCount} mola)</span></span>
                    <span className="font-semibold">+{Math.round(routeSummary.chargeTimeHours * 60)} dk</span>
                  </div>
                  <div className="flex justify-between items-center font-bold text-brand-700 dark:text-brand-400 border-t border-brand-100 dark:border-brand-800/50 pt-1.5 mt-0.5">
                    <span>Toplam Seyahat</span>
                    <span className="text-sm">{formatHours(routeSummary.totalJourneyHours)}</span>
                  </div>
                </>
              ) : (
                <div className="flex justify-between items-center text-emerald-600 dark:text-emerald-400 border-t border-brand-100 dark:border-brand-800/50 pt-1.5 mt-0.5">
                  <span className="font-medium">Şarj İhtiyacı</span>
                  <span className="font-semibold">Yok ✅</span>
                </div>
              )}

              {routeSummary.arrivalChargePercentage !== undefined && (
                <div className="flex justify-between items-center border-t border-brand-100 dark:border-brand-800/50 pt-1.5 mt-0.5">
                  <span className="text-gray-500 dark:text-slate-400">Varış Şarjı</span>
                  <div className="flex items-center gap-2">
                    <span className={`font-bold ${
                      routeSummary.arrivalChargePercentage > 30 ? 'text-emerald-600 dark:text-emerald-400' :
                      routeSummary.arrivalChargePercentage > 15 ? 'text-amber-600 dark:text-amber-400' : 'text-red-600 dark:text-red-400'
                    }`}>
                      %{routeSummary.arrivalChargePercentage}
                    </span>
                  </div>
                </div>
              )}

              {routeSummary.estimatedCost !== undefined && routeSummary.estimatedCost > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 dark:text-slate-400">Tahmini Maliyet</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    ₺{routeSummary.estimatedCost.toLocaleString('tr-TR')}
                  </span>
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
