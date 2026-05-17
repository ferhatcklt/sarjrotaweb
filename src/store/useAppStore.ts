import { create } from 'zustand';

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
}

export interface RouteSummary {
  totalDistanceKm: number;
  estimatedDurationHours: number;
  chargeTimeHours: number;
  totalJourneyHours: number;
  chargeStopsCount: number;
  arrivalChargePercentage?: number;
}

interface AppState {
  startLocation: Location | null;
  endLocation: Location | null;
  selectedVehicle: Vehicle | null;
  selectedStationBrands: string[];

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

  setStartLocation: (loc: Location | null) => void;
  setEndLocation: (loc: Location | null) => void;
  setSelectedVehicle: (vehicle: Vehicle | null) => void;
  toggleStationBrand: (brand: string) => void;
  setRouteData: (route: Location[], stops: Station[], summary: RouteSummary, alternatives?: RouteAlternative[], nearbyStations?: Station[]) => void;
  selectAlternative: (index: number) => void;
  setSelectingMode: (mode: 'start' | 'end' | null) => void;
  toggleMobileSidebar: () => void;
  closeMobileSidebar: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  startLocation: null,
  endLocation: null,
  selectedVehicle: null,
  selectedStationBrands: [],
  route: [],
  stops: [],
  nearbyStations: [],
  routeSummary: null,
  alternatives: [],
  selectedAlternativeIndex: 0,
  selectingMode: 'start' as 'start' | 'end' | null,
  isMobileSidebarOpen: false,

  setStartLocation: (loc) => set({ startLocation: loc }),
  setEndLocation: (loc) => set({ endLocation: loc }),
  setSelectedVehicle: (vehicle) => set({ selectedVehicle: vehicle }),
  setSelectingMode: (mode) => set({ selectingMode: mode }),

  toggleStationBrand: (brand) => set((state) => ({
    selectedStationBrands: state.selectedStationBrands.includes(brand)
      ? state.selectedStationBrands.filter((b) => b !== brand)
      : [...state.selectedStationBrands, brand],
  })),

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
      },
    });
  },

  toggleMobileSidebar: () => set((s) => ({ isMobileSidebarOpen: !s.isMobileSidebarOpen })),
  closeMobileSidebar: () => set({ isMobileSidebarOpen: false }),
}));
