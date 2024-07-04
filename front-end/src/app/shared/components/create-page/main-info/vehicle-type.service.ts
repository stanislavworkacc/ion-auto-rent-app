import {computed, effect, Injectable, Signal, signal, WritableSignal} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class VehicleTypeService {
  transportTypes: WritableSignal<{ label: string, value: string }[]> = signal([
    {
      label: 'Легкові',
      value: 'cars',
    },
    {
      label: 'Вантажівки',
      value: 'trucks',
    },
    {
      label: 'Мотоцикл',
      value: 'motorcycles',
    },
    {
      label: 'Автобуси',
      value: 'buses',
    },
    {
      label: 'Спецтехніка',
      value: 'special',
    },
    {
      label: 'Причепи',
      value: 'trailers',
    },
  ]);

  selectedValue: WritableSignal<{ label: string, value: string }> = signal({ label: '', value: '' })

  vehicleType: Signal<{ label: string, value: string }> = computed(() => this.selectedValue())

  constructor() {
    effect((): void => {
      this.selectedValue.set(this.transportTypes()[0]);
    }, { allowSignalWrites: true });
  }
}
