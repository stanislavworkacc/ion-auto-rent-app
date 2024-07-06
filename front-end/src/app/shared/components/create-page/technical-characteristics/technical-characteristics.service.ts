import {computed, inject, Injectable, Signal, signal, WritableSignal} from "@angular/core";
import {AlertController, ModalController} from "@ionic/angular/standalone";
import {SelectModalComponent} from "../../filters/modals/select-modal/select-modal.component";

@Injectable({
  providedIn: 'root'
})
export class TechnicalCharacteristicsService {
  private modalCtrl: ModalController = inject(ModalController);
  private alertCtrl: AlertController = inject(AlertController);

  fuelTypes: WritableSignal<{ name: string, value: number }[]> = signal([]);
  selectedFuelType: WritableSignal<{ name: string, value: number }> = signal({ name: '', value: null });
  fuelType: Signal<any> = computed(() => this.selectedFuelType());

  transMissions: WritableSignal<{ name: string, value: number }[]> = signal([]);
  selectedTransMission: WritableSignal<{ name: string, value: number }> = signal({ name: '', value: null });
  transMission: Signal<any> = computed(() => this.selectedFuelType());

  isFuelConsumption: WritableSignal<boolean> = signal(false);

  async initIonModal(data, initialBreakpoint?: number): Promise<any> {
    const modal: HTMLIonModalElement = await this.modalCtrl.create({
      component: SelectModalComponent,
      cssClass: 'auth-modal',
      initialBreakpoint: initialBreakpoint,
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

  async presentFuelConsumptionAlert(): Promise<void> {
    const alert: HTMLIonAlertElement = await this.alertCtrl.create({
      header: 'Введіть дані',
      inputs: [
        {
          name: 'city',
          type: 'number',
          placeholder: 'Місто (л/100 км)'
        },
        {
          name: 'highway',
          type: 'number',
          placeholder: 'Шосе (л/100 км)'
        },
        {
          name: 'combined',
          type: 'number',
          placeholder: 'Змішаний (л/100 км)'
        }
      ],
      buttons: [
        {
          text: 'Скасувати',
          handler: (): void => {
            this.isFuelConsumption.set(false)
          }
        },
        {
          text: 'Зберегти',
          handler: (data): void => {
            if(data && (data.city || data.highway || data.combined)) {
              this.isFuelConsumption.set(true)
            } else {
              this.isFuelConsumption.set(false)
            }
          }
        }
      ]
    });

    await alert.present();
  }
}
