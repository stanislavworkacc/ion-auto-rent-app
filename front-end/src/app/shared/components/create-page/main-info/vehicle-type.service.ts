import {computed, effect, Injectable, Signal, signal, WritableSignal} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class VehicleTypeService {
  transportTypes: WritableSignal<{ label: string, value: string, icon: string, category_id: number }[]> = signal([
    {
      label: 'Легкові',
      value: 'cars',
      icon: '/assets/icon/car-type-ico.png',
      category_id: 1,
    },
    {
      label: 'Вантажівки',
      value: 'trucks',
      icon: '/assets/icon/truck-type-ico.png',
      category_id: 6,
    },
    {
      label: 'Мотоцикли',
      value: 'motorcycles',
      icon: '/assets/icon/moto-type-ico.png',
      category_id: 2,
    },
    {
      label: 'Автобуси',
      value: 'buses',
      icon: '/assets/icon/bus-type-ico.png',
      category_id: 7,
    },
    {
      label: 'Спецтехніка',
      value: 'special',
      icon: '/assets/icon/tractor-type-ico.png',
      category_id: 4,
    },
    {
      label: 'Причепи',
      value: 'trailers',
      icon: '/assets/icon/trailer-type-ico.png',
      category_id: 5
    },
  ]);
  selectedType: WritableSignal<{ label: string, value: string, icon: string, category_id: number }> = signal({ label: '', value: '', icon: '', category_id: null });
  vehicleType: Signal<{ label: string, value: string, icon: string, category_id: number }> = computed(() => this.selectedType());

  vehicleYears: WritableSignal<{ label: string, value: string }[]> = signal([]);
  selectedYear: WritableSignal<{ label: string, value: string }> = signal({  label: '', value: '' });
  vehicleYear: Signal<{ label: string, value: string }> = computed(() => this.selectedYear());

  vehicleMarks: WritableSignal<{ name: string, value: number }[]> = signal([]);
  selectedVehicleMark: WritableSignal<{ name: string, value: number }> = signal({ name: '', value: null });
  vehicleMark: Signal<{ name: string, value: number }> = computed(() => this.selectedVehicleMark());

  vehicleModels: WritableSignal<{ name: string, value: number }[]> = signal([]);
  selectedVehicleModel: WritableSignal<{ name: string, value: number }> = signal({ name: '', value: null });
  vehicleModel: Signal<{ name: string, value: number }> = computed(() => this.selectedVehicleModel());

  generateYears(): void {
    const currentYear = new Date().getFullYear();
    const years = [];

    for (let year = currentYear; year >= 1900; year--) {
      years.push({ label: year.toString(), value: year.toString() });
    }

    this.vehicleYears.set(years);
  }
  constructor() {
    this.generateYears();

    effect((): void => {
      this.selectedType.set(this.transportTypes()[0]);
    }, { allowSignalWrites: true });
  }
}
