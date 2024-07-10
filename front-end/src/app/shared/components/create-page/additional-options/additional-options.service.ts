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
      label: AdditionalChips.CONTROL_CLIMATE,
      value: '',
      selected: false,
      callback: async () => await this.initControlClimate()
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
      callback: async () => await this.initSalonColors()
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
      callback: async () => await this.initLightsSelection()
    },
    {
      label: AdditionalChips.OPTICS,
      value: '',
      selected: false,
      callback: async () => await this.initOpticsSelection()
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
      cssClass: 'wide-alert',
      inputs: [
        { type: 'radio', label: 'Шкіра', value: JSON.stringify({ value: 'leather', label: 'Шкіра' }), checked: true },
        { type: 'radio', label: 'Тканина', value: JSON.stringify({ value: 'fabric', label: 'Тканина' }) },
        { type: 'radio', label: 'Алькантара', value: JSON.stringify({ value: 'alcantara', label: 'Алькантара' }) },
        { type: 'radio', label: 'Штучна шкіра', value: JSON.stringify({ value: 'syntheticLeather', label: 'Штучна шкіра' }) },
        { type: 'radio', label: 'Велюр', value: JSON.stringify({ value: 'velour', label: 'Велюр' }) },
        { type: 'radio', label: 'Комбінований', value: JSON.stringify({ value: 'combined', label: 'Комбінований' }) }
      ],
      buttons: [
        { text: 'Скасувати',
          role: 'cancel',
          handler: () => this.resetInitialChip(AdditionalChips.SALON)
        },
        {
          text: 'Ок',
          handler: (data): void => {
            const selectedOption = JSON.parse(data);
            this.setChipValue(selectedOption, AdditionalChips.SALON)
          }
        }
      ]
    });

    await alert.present();
  }

  async initSalonColors(): Promise<void> {
    const alert: HTMLIonAlertElement = await this.alertCtrl.create({
      header: 'Колір салону',
      cssClass: 'wide-alert',
      inputs: [
        { type: 'radio', label: 'Темний', value: JSON.stringify({ value: 'dark', label: 'Темний' }), checked: true },
        { type: 'radio', label: 'Світлий', value: JSON.stringify({ value: 'light', label: 'Світлий' }) },
        { type: 'radio', label: 'Коричневий', value: JSON.stringify({ value: 'brown', label: 'Коричневий' }) },
        { type: 'radio', label: 'Червоний', value: JSON.stringify({ value: 'red', label: 'Червоний' }) },
      ],
      buttons: [
        { text: 'Скасувати',
          role: 'cancel',
          handler: () => this.resetInitialChip(AdditionalChips.SALON_COLOR)
        },
        {
          text: 'Ок',
          handler: (data): void => {
            const selectedOption = JSON.parse(data);
            this.setChipValue(selectedOption, AdditionalChips.SALON_COLOR)
          }
        }
      ]
    });

    await alert.present();
  }

  async initControlClimate(): Promise<void> {
    const alert: HTMLIonAlertElement = await this.alertCtrl.create({
      header: 'Клімат-контроль',
      cssClass: 'wide-alert',
      inputs: [
        { type: 'radio', label: 'Клімат-контроль 1-зонний', value: JSON.stringify({ value: 'oneZoneClimate', label: 'Клімат-контроль 1-зонний' }), checked: true },
        { type: 'radio', label: 'Клімат-контроль 2-зонний', value: JSON.stringify({ value: 'twoZoneClimate', label: 'Клімат-контроль 2-зонний' }) },
        { type: 'radio', label: 'Клімат-контроль багатозонний', value: JSON.stringify({ value: 'manyZoneClimate', label: 'Клімат-контроль багатозонний' }) },
      ],
      buttons: [
        { text: 'Скасувати',
          role: 'cancel',
          handler: () => this.resetInitialChip(AdditionalChips.CONTROL_CLIMATE)
        },
        {
          text: 'Ок',
          handler: (data): void => {
            const selectedOption = JSON.parse(data);
            this.setChipValue(selectedOption, AdditionalChips.CONTROL_CLIMATE);
          }
        }
      ]
    });

    await alert.present();
  }

  async initLightsSelection(): Promise<void> {
    const alert: HTMLIonAlertElement = await this.alertCtrl.create({
      header: 'Фари',
      cssClass: 'wide-alert',
      inputs: [
        { type: 'radio', label: 'Ксенонові/Біксенонові', value: JSON.stringify({ value: 'xenon', label: 'Ксенонові/Біксенонові' }), checked: true },
        { type: 'radio', label: 'Світлодіодні (LED)', value: JSON.stringify({ value: 'led', label: 'Світлодіодні' }) },
        { type: 'radio', label: 'Лазерні', value: JSON.stringify({ value: 'laser', label: 'Лазерні' }) },
        { type: 'radio', label: 'Галогенні', value: JSON.stringify({ value: 'halogen', label: 'Галогенні' }) },
        { type: 'radio', label: 'Матричні', value: JSON.stringify({ value: 'matrix', label: 'Матричні' }) },
      ],
      buttons: [
        { text: 'Скасувати',
          role: 'cancel',
          handler: () => this.resetInitialChip(AdditionalChips.LIGHTS)
        },
        {
          text: 'Ок',
          handler: (data): void => {
            const selectedOption = JSON.parse(data);
            this.setChipValue(selectedOption, AdditionalChips.LIGHTS);
          }
        }
      ]
    });

    await alert.present();
  }

  async initOpticsSelection(): Promise<void> {
    const alert: HTMLIonAlertElement = await this.alertCtrl.create({
      header: 'Оптика',
      cssClass: 'wide-alert',
      inputs: [
        { type: 'checkbox', label: 'Денні ходові вогні', value: JSON.stringify({ value: 'dayLights', label: 'Денні ходові вогні' }), checked: true },
        { type: 'checkbox', label: 'Датчик світла', value: JSON.stringify({ value: 'sensorLight', label: 'Датчик світла' }) },
        { type: 'checkbox', label: 'Омивач фар', value: JSON.stringify({ value: 'lightsWasher', label: 'Омивач фар' }) },
        { type: 'checkbox', label: 'Система адаптивного освітлення', value: JSON.stringify({ value: 'adaptiveLights', label: 'Система адаптивного освітлення' }) },
        { type: 'checkbox', label: 'Система управління дальнім світлом', value: JSON.stringify({ value: 'distantLights', label: 'Система управління дальнім світлом' }) },
      ],
      buttons: [
        { text: 'Скасувати',
          role: 'cancel',
          handler: () => this.resetInitialChip(AdditionalChips.OPTICS)
        },
        {
          text: 'Ок',
          handler: (data): void => {
            const selectedOptions = data.map(option => JSON.parse(option));
            this.setChipValue(null, AdditionalChips.OPTICS, selectedOptions);
          }
        }
      ]
    });

    await alert.present();
  }

  setChipValue(selectedOption, label: string, optionsArray?): void {
    const chips = this.chipsArray().map((chip) => {
      if(chip.label === label && !optionsArray && selectedOption) {
        return { ...chip, value: selectedOption.label }
      }

      if(chip.label === label && optionsArray) {
        return { ...chip, value: optionsArray }
      }
      return chip;
    })

    this.chipsArray.set(chips)
  }

  resetInitialChip(label): void {
    const updatedChipsArray = this.chipsArray().map(chip => {
      if (chip.label === label) {
        return { ...chip, selected: false };
      }
      return chip;
    });

    this.chipsArray.set(updatedChipsArray);
  }
}
