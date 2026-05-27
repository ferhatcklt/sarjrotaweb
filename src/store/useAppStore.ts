import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Location {
  lat: number;
  lng: number;
  name?: string;
}

export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  rangeKm: number;
  batteryCapacityKWh: number;
  averageConsumptionKWhPer100Km?: number;
}

export interface Station {
  id?: string;
  brand: string;
  location?: Location;   // mock uyumu
  latitude?: number;     // API'den gelen
  longitude?: number;    // API'den gelen
  isFastCharge?: boolean;
  name?: string;
  acConnectorCount?: number;
  dcConnectorCount?: number;
  hpcConnectorCount?: number;
  maxPowerKw?: number;
  arrivalChargePercentage?: number;
}

export interface RouteAlternative {
  index: number;
  path: Location[];
  stops: Station[];
  nearbyStations: Station[];
  totalDistanceKm: number;
  estimatedDurationHours: number;
  chargeTimeHours: number;
  totalJourneyHours: number;
  chargeStopsCount: number;
  arrivalChargePercentage?: number;
  estimatedCost?: number;
}

export interface RouteSummary {
  totalDistanceKm: number;
  estimatedDurationHours: number;
  chargeTimeHours: number;
  totalJourneyHours: number;
  chargeStopsCount: number;
  arrivalChargePercentage?: number;
  estimatedCost?: number;
}

interface AppState {
  startLocation: Location | null;
  endLocation: Location | null;
  selectedVehicle: Vehicle | null;
  selectedStationBrands: string[];

  // Sistem Önbelleği (Caching)
  allVehicles: Vehicle[] | null;
  allBrands: string[] | null;
  allStations: Station[] | null;

  // Rota verisi
  route: Location[];
  stops: Station[];
  nearbyStations: Station[];
  routeSummary: RouteSummary | null;

  // Alternatif rotalar
  alternatives: RouteAlternative[];
  selectedAlternativeIndex: number;

  // Harita seçim modu
  selectingMode: 'start' | 'end' | null;

  // Mobil sidebar
  isMobileSidebarOpen: boolean;

  // Tema
  theme: 'light' | 'dark';
  toggleTheme: () => void;

  setStartLocation: (loc: Location | null) => void;
  setEndLocation: (loc: Location | null) => void;
  setSelectedVehicle: (vehicle: Vehicle | null) => void;
  toggleStationBrand: (brand: string) => void;
  
  // Önbellek setters
  setAllVehicles: (vehicles: Vehicle[]) => void;
  setAllBrands: (brands: string[]) => void;
  setAllStations: (stations: Station[]) => void;
  setRouteData: (route: Location[], stops: Station[], summary: RouteSummary, alternatives?: RouteAlternative[], nearbyStations?: Station[]) => void;
  selectAlternative: (index: number) => void;
  setSelectingMode: (mode: 'start' | 'end' | null) => void;
  toggleMobileSidebar: () => void;
  closeMobileSidebar: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      startLocation: null,
      endLocation: null,
      selectedVehicle: null,
      selectedStationBrands: [],
      
      allVehicles: null,
      allBrands: null,
      allStations: null,
      route: [],
      stops: [],
      nearbyStations: [],
      routeSummary: null,
      alternatives: [],
      selectedAlternativeIndex: 0,
      selectingMode: 'start' as 'start' | 'end' | null,
      isMobileSidebarOpen: false,
      theme: 'light',

      toggleTheme: () => {
        const newTheme = get().theme === 'light' ? 'dark' : 'light';
        set({ theme: newTheme });
        if (newTheme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },

      setStartLocation: (loc) => set({ startLocation: loc }),
      setEndLocation: (loc) => set({ endLocation: loc }),
      setSelectedVehicle: (vehicle) => set({ selectedVehicle: vehicle }),
      setSelectingMode: (mode) => set({ selectingMode: mode }),

      toggleStationBrand: (brand) => set((state) => ({
        selectedStationBrands: state.selectedStationBrands.includes(brand)
          ? state.selectedStationBrands.filter((b) => b !== brand)
          : [...state.selectedStationBrands, brand],
      })),

      setAllVehicles: (vehicles) => set({ allVehicles: vehicles }),
      setAllBrands: (brands) => set({ allBrands: brands }),
      setAllStations: (stations) => set({ allStations: stations }),

      setRouteData: (route, stops, summary, alternatives = [], nearbyStations = []) =>
        set({ route, stops, routeSummary: summary, alternatives, selectedAlternativeIndex: 0, nearbyStations }),

      selectAlternative: (index) => {
        const { alternatives } = get();
        const alt = alternatives.find(a => a.index === index);
        if (!alt) return;
        set({
          selectedAlternativeIndex: index,
          route: [...alt.path],
          stops: [...alt.stops],
          nearbyStations: [...(alt.nearbyStations ?? [])],
          routeSummary: {
            totalDistanceKm:        alt.totalDistanceKm,
            estimatedDurationHours: alt.estimatedDurationHours,
            chargeTimeHours:        alt.chargeTimeHours ?? 0,
            totalJourneyHours:      alt.totalJourneyHours ?? alt.estimatedDurationHours,
            chargeStopsCount:       alt.chargeStopsCount,
            arrivalChargePercentage: alt.arrivalChargePercentage,
            estimatedCost:          alt.estimatedCost,
          },
        });
      },

      toggleMobileSidebar: () => set((s) => ({ isMobileSidebarOpen: !s.isMobileSidebarOpen })),
      closeMobileSidebar: () => set({ isMobileSidebarOpen: false }),
    }),
    {
      name: 'sarjrota-storage',
      // Temayı ve önbelleğe alınmış sistem verilerini sakla (sayfa yenilendiğinde veritabanına gidilmesin)
      partialize: (state) => ({ 
        theme: state.theme,
        allVehicles: state.allVehicles,
        allBrands: state.allBrands,
        allStations: state.allStations
      }),
    }
  )
);
