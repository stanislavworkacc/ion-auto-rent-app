import {computed, inject, Injectable, signal, Signal, WritableSignal} from "@angular/core";
import {AdditionalChips} from "./additional-options.enums";
import {AlertController} from "@ionic/angular/standalone";

@Injectable({
  providedIn: 'root'
})
export class AdditionalOptionsService {
  private alertCtrl: AlertController = inject(AlertController)

  chipsArray: WritableSignal<{ label: string, value: string, selected: boolean, callback: () => void }[]> = signal([
    {
      label: AdditionalChips.AIR_CONDITIONER,
      value: '',
      selected: false,
      callback: () => {}
    },
    {
      label: AdditionalChips.SALON,
      value: '',
      selected: false,
      callback: async () => await this.initSalonSelection()
    },
    {
      label: AdditionalChips.SALON_COLOR,
      value: '',
      selected: false,
      callback: () => {}
    },
    {
      label: AdditionalChips.BABY_SEAT,
      value: '',
      selected: false,
      callback: () => {}
    },
    {
      label: AdditionalChips.STEER_HYDRO,
      value: '',
      selected: false,
      callback: () => {}
    },
    {
      label: AdditionalChips.LIGHTS,
      value: '',
      selected: false,
      callback: () => {}
    },
    {
      label: AdditionalChips.WHEEL,
      value: '',
      selected: false,
      callback: () => {}
    },
    {
      label: AdditionalChips.HEATED_SEATS,
      value: '',
      selected: false,
      callback: () => {}
    },
    {
      label: AdditionalChips.SEAT_VENTILATION,
      value: '',
      selected: false,
      callback: () => {}
    },
    {
      label: AdditionalChips.SEAT_MEMORY,
      value: '',
      selected: false,
      callback: () => {}
    },
    {
      label: AdditionalChips.WINDOW_LIFTS,
      value: '',
      selected: false,
      callback: () => {}
    },
  ])
  public additionalChips: Signal<{ label: string, value: string, selected: boolean, callback: () => void }[]>
    = computed(() => this.chipsArray());

  selectOption(selectedChip: { label: string, value: string, selected: boolean, callback: () => void }): void {
    const updatedChipsArray = this.chipsArray().map(chip => {
      if (chip.label === selectedChip.label) {
        return { ...chip, selected: !chip.selected };
      }
      return chip;
    });

    this.chipsArray.set(updatedChipsArray);

    if(!selectedChip.selected) {
      selectedChip.callback();
    }

    const resetArray = this.chipsArray().map((chip) => {
      if(chip.label === selectedChip.label) {
        return { ...chip, value: '' }
      }

      return chip;
    })

    this.chipsArray.set(resetArray);
  }

  async initSalonSelection(): Promise<void> {
    const alert: HTMLIonAlertElement = await this.alertCtrl.create({
      header: 'Метеріали салону',
      inputs: [
        { type: 'radio', label: 'Шкіра', value: JSON.stringify({ value: 'Leather', label: 'Шкіра' }), checked: true },
        { type: 'radio', label: 'Тканина', value: JSON.stringify({ value: 'Fabric', label: 'Тканина' }) },
        { type: 'radio', label: 'Алькантара', value: JSON.stringify({ value: 'Alcantara', label: 'Алькантара' }) },
        { type: 'radio', label: 'Штучна шкіра', value: JSON.stringify({ value: 'SyntheticLeather', label: 'Штучна шкіра' }) },
        { type: 'radio', label: 'Велюр', value: JSON.stringify({ value: 'Velour', label: 'Велюр' }) },
        { type: 'radio', label: 'Комбінований', value: JSON.stringify({ value: 'Combined', label: 'Комбінований' }) }
      ],
      buttons: [
        { text: 'Скасувати', role: 'cancel' },
        {
          text: 'Ок',
          handler: (data): void => {
            const selectedOption = JSON.parse(data);
            const chips = this.chipsArray().map((chip) => {
              if(chip.label === AdditionalChips.SALON) {
                return { ...chip, value: selectedOption.label }
              }
              return chip;
            })

            this.chipsArray.set(chips)
          }
        }
      ]
    });

    await alert.present();
  }
}
