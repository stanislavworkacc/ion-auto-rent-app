import {computed, Injectable, Signal, signal, WritableSignal} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class VehicleTypeService {
  transportTypes: WritableSignal<{ label: string, value: string, callback: () => void }[]> = signal([
    {
      label: 'Легкові',
      value: 'cars',
      callback: (): void => {}
    },
    {
      label: 'Вантажівки',
      value: 'trucks',
      callback: (): void => {}
    },
    {
      label: 'Мотоцикл',
      value: 'motorcycles',
      callback: (): void => {}
    },
    {
      label: 'Автобуси',
      value: 'buses',
      callback: (): void => {}
    },
    {
      label: 'Спецтехніка',
      value: 'special',
      callback: (): void => {}
    },
    {
      label: 'Причепи',
      value: 'trailers',
      callback: (): void => {}
    },
  ]);

  selectedValue: WritableSignal<{ label: string, value: string, callback: () => void }> = signal(
    {
      label: 'Легкові',
      value: 'cars',
      callback: (): void => {}
    }
  )

  vehicleType: Signal<{ label: string, value: string, callback: () => void }> = computed(() => this.selectedValue())
}
