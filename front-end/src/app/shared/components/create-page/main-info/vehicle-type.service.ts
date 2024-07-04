import {computed, effect, Injectable, Signal, signal, WritableSignal} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class VehicleTypeService {
  transportTypes: WritableSignal<{ label: string, value: string, icon: string }[]> = signal([
    {
      label: 'Легкові',
      value: 'cars',
      icon: '/assets/icon/car-type-ico.png'
    },
    {
      label: 'Вантажівки',
      value: 'trucks',
      icon: '/assets/icon/truck-type-ico.png'
    },
    {
      label: 'Мотоцикли',
      value: 'motorcycles',
      icon: '/assets/icon/moto-type-ico.png'
    },
    {
      label: 'Автобуси',
      value: 'buses',
      icon: '/assets/icon/bus-type-ico.png'
    },
    {
      label: 'Спецтехніка',
      value: 'special',
      icon: '/assets/icon/tractor-type-ico.png'
    },
    {
      label: 'Причепи',
      value: 'trailers',
      icon: '/assets/icon/trailer-type-ico.png'
    },
  ]);

  selectedValue: WritableSignal<{ label: string, value: string, icon: string }> = signal({ label: '', value: '', icon: '' })

  vehicleType: Signal<{ label: string, value: string, icon: string }> = computed(() => this.selectedValue())

  constructor() {
    effect((): void => {
      this.selectedValue.set(this.transportTypes()[0]);
    }, { allowSignalWrites: true });
  }
}
