import { describe, it, expect, beforeEach } from 'vitest';
import { useAppStore } from '../store/useAppStore';

describe('useAppStore', () => {
  beforeEach(() => {
    // Her testten önce store'u sıfırla
    useAppStore.setState({
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
      selectingMode: 'start',
      isMobileSidebarOpen: false,
    });
  });

  it('başlangıç noktasını doğru set etmeli', () => {
    const location = { lat: 41.0, lng: 29.0, name: 'İstanbul' };
    useAppStore.getState().setStartLocation(location);

    expect(useAppStore.getState().startLocation).toEqual(location);
  });

  it('bitiş noktasını doğru set etmeli', () => {
    const location = { lat: 39.92, lng: 32.85, name: 'Ankara' };
    useAppStore.getState().setEndLocation(location);

    expect(useAppStore.getState().endLocation).toEqual(location);
  });

  it('araç seçimini doğru güncellemeli', () => {
    const vehicle = {
      id: '1',
      brand: 'Tesla',
      model: 'Model 3',
      rangeKm: 400,
      batteryCapacityKWh: 60,
      averageConsumptionKWhPer100Km: 15,
    };
    useAppStore.getState().setSelectedVehicle(vehicle);

    expect(useAppStore.getState().selectedVehicle).toEqual(vehicle);
  });

  it('istasyon markasını toggle edebilmeli', () => {
    const { toggleStationBrand } = useAppStore.getState();

    toggleStationBrand('ZES');
    expect(useAppStore.getState().selectedStationBrands).toContain('ZES');

    toggleStationBrand('Trugo');
    expect(useAppStore.getState().selectedStationBrands).toEqual(['ZES', 'Trugo']);

    // Tekrar tıklandığında kaldırmalı
    toggleStationBrand('ZES');
    expect(useAppStore.getState().selectedStationBrands).toEqual(['Trugo']);
  });

  it('rota verisini doğru kaydetmeli', () => {
    const route = [{ lat: 41.0, lng: 29.0 }, { lat: 39.92, lng: 32.85 }];
    const stops = [{ brand: 'ZES', latitude: 40.5, longitude: 30.5 }];
    const summary = {
      totalDistanceKm: 450,
      estimatedDurationHours: 4.5,
      chargeTimeHours: 0.5,
      totalJourneyHours: 5.0,
      chargeStopsCount: 1,
      arrivalChargePercentage: 35,
    };

    useAppStore.getState().setRouteData(route, stops, summary);

    const state = useAppStore.getState();
    expect(state.route).toEqual(route);
    expect(state.stops).toEqual(stops);
    expect(state.routeSummary).toEqual(summary);
    expect(state.selectedAlternativeIndex).toBe(0);
  });

  it('mobil sidebar toggle çalışmalı', () => {
    expect(useAppStore.getState().isMobileSidebarOpen).toBe(false);

    useAppStore.getState().toggleMobileSidebar();
    expect(useAppStore.getState().isMobileSidebarOpen).toBe(true);

    useAppStore.getState().closeMobileSidebar();
    expect(useAppStore.getState().isMobileSidebarOpen).toBe(false);
  });
});
