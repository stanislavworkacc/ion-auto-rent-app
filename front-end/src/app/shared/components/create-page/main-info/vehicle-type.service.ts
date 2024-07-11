import {computed, effect, inject, Injectable, Signal, signal, WritableSignal} from "@angular/core";
import {SelectModalComponent} from "../../filters/modals/select-modal/select-modal.component";
import {ModalController} from "@ionic/angular/standalone";

@Injectable({
  providedIn: 'root'
})
export class VehicleTypeService {
  private modalCtrl: ModalController = inject(ModalController);

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
  selectedType: WritableSignal<{ label: string, value: string, icon: string, category_id: number }> = signal(this.transportTypes()[0]);
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

  bodyTypes: WritableSignal<{ name: string, value: number }[]> = signal([
    { value: 3, name: 'Седан' },
    { value: 2, name: 'Універсал' },
    { value: 5, name: 'Кроссовер' },
    { value: 4, name: 'Хетчбек' },
    { value: 8, name: 'Мінівен' },
    { value: 9, name: 'Пікап' },
    { value: 7, name: 'Кабріолет' },
    { value: 6, name: 'Купе' },
    { value: 252, name: 'Лімузин' },
    { value: 307, name: 'Ліфтбек' },
    { value: 315, name: 'Родстер' },
    { value: 449, name: 'Мікровен' },
    { value: 448, name: 'Фастбек' }
  ]);
  selectedBodyType: WritableSignal<{ name: string, value: number }> = signal({ name: '', value: null });
  bodyType: Signal<{ name: string, value: number }> = computed(() => this.selectedBodyType());
  generateYears(): void {
    const currentYear = new Date().getFullYear();
    const years = [];

    for (let year = currentYear; year >= 1900; year--) {
      years.push({ label: year.toString(), value: year.toString() });
    }

    this.vehicleYears.set(years);
  }

  async initIonModal(data): Promise<any> {
    const modal: HTMLIonModalElement = await this.modalCtrl.create({
      component: SelectModalComponent,
      cssClass: 'auth-modal',
      initialBreakpoint: 1,
      breakpoints: [0, 1],
      componentProps: {
        withSearch: data.withSearch,
        title: data.title,
        items: data.items,
        selectedValue: data.selectedValue,
      }
    });

    await modal.present();
    return modal;
  }
  constructor() {
    this.generateYears();
  }
}
