import {computed, inject, Injectable, Signal, signal, WritableSignal} from "@angular/core";
import {ModalController} from "@ionic/angular/standalone";
import {SelectModalComponent} from "../../filters/modals/select-modal/select-modal.component";

@Injectable({
  providedIn: 'root'
})
export class TechnicalCharacteristicsService {
  private modalCtrl: ModalController = inject(ModalController);

  fuelTypes: WritableSignal<{ name: string, value: number }[]> = signal([]);
  selectedFuelType: WritableSignal<{ name: string, value: number }> = signal({ name: '', value: null });
  fuelType: Signal<any> = computed(() => this.selectedFuelType());

  transMissions: WritableSignal<{ name: string, value: number }[]> = signal([]);
  selectedTransMission: WritableSignal<{ name: string, value: number }> = signal({ name: '', value: null });
  transMission: Signal<any> = computed(() => this.selectedFuelType());

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
}
