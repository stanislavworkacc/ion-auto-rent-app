import {computed, inject, Injectable, Signal, signal, WritableSignal} from "@angular/core";
import {ModalController} from "@ionic/angular/standalone";

@Injectable({
  providedIn: 'root'
})
export class TechnicalCharacteristicsService {
  private modalCtrl: ModalController = inject(ModalController);

  fuelTypes: WritableSignal<{ name: string, value: number }[]> = signal([]);
  selectedFuelType: WritableSignal<{ name: string, value: number }> = signal({ name: '', value: null });
  fuelType: Signal<any> = computed(() => this.selectedFuelType());
}
