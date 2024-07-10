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
      label: AdditionalChips.MULTIMEDIA,
      value: '',
      selected: false,
      callback: async () => await this.initMultimediaSelection()
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
      callback: async () => await this.initHeatedSeatsSelection()
    },
    {
      label: AdditionalChips.SEAT_VENTILATION,
      value: '',
      selected: false,
      callback: async () => await this.initSeatsVentilation()
    },
    {
      label: AdditionalChips.SEAT_MEMORY,
      value: '',
      selected: false,
      callback: async () => await this.initSeatsMemory()
    },
    {
      label: AdditionalChips.WINDOW_LIFTS,
      value: '',
      selected: false,
      callback: async () => await this.initWindowLifts()
    },
    {
      label: AdditionalChips.PARKING_ASSIST,
      value: '',
      selected: false,
      callback: async () => await this.initParkingAssists()
    },
    {
      label: AdditionalChips.AIRBAGS,
      value: '',
      selected: false,
      callback: async () => await this.initAirbagsSelection()
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
    await this.initSingleSelection('Матеріали салону',
      [
        { label: 'Шкіра', value: 'leather', checked: true },
        { label: 'Тканина', value: 'fabric' },
        { label: 'Алькантара', value: 'alcantara' },
        { label: 'Штучна шкіра', value: 'syntheticLeather' },
        { label: 'Велюр', value: 'velour' },
        { label: 'Комбінований', value: 'combined' }
      ],
      AdditionalChips.SALON
    );
  }

  async initSalonColors(): Promise<void> {
    await this.initSingleSelection('Колір салону',
      [
        { label: 'Темний', value: 'dark', checked: true },
        { label: 'Світлий', value: 'light' },
        { label: 'Коричневий', value: 'brown' },
        { label: 'Червоний', value: 'red' }
      ],
      AdditionalChips.SALON_COLOR
    );
  }

  async initControlClimate(): Promise<void> {
    await this.initSingleSelection('Клімат-контроль',
      [
        { label: 'Клімат-контроль 1-зонний', value: 'oneZoneClimate', checked: true },
        { label: 'Клімат-контроль 2-зонний', value: 'twoZoneClimate' },
        { label: 'Клімат-контроль багатозонний', value: 'manyZoneClimate' }
      ],
      AdditionalChips.CONTROL_CLIMATE
    );
  }

  async initLightsSelection(): Promise<void> {
   await this.initSingleSelection('Фари',
      [
        { label: 'Ксенонові/Біксенонові', value: 'xenon', checked: true },
        { label: 'Світлодіодні (LED)', value: 'led' },
        { label: 'Лазерні', value: 'laser' },
        { label: 'Галогенні', value: 'halogen' },
        { label: 'Матричні', value: 'matrix' }
      ],
      AdditionalChips.LIGHTS
    );
  }

  async initOpticsSelection(): Promise<void> {
    await this.initMultiSelection(
      'Оптика',
      [
        { label: 'Денні ходові вогні', value: 'dayLights' },
        { label: 'Датчик світла', value: 'sensorLight' },
        { label: 'Омивач фар', value: 'lightsWasher' },
        { label: 'Система адаптивного освітлення', value: 'adaptiveLights' },
        { label: 'Система управління дальнім світлом', value: 'distantLights' }
      ],
      AdditionalChips.OPTICS
    );
  }

  async initHeatedSeatsSelection(): Promise<void> {
    await this.initMultiSelection('Підігрів сидінь',
      [
        { label: 'Передні', value: 'forwardHeatedSeats' },
        { label: 'Задні', value: 'backHeatedSeats' }
      ],
      AdditionalChips.HEATED_SEATS
    );
  }

  async initSeatsVentilation(): Promise<void> {
    await this.initMultiSelection('Вентиляція сидінь',
      [
        { label: 'Передні', value: 'forwardVentilationSeats' },
        { label: 'Задні', value: 'backVentilationSeats' }
      ],
      AdditionalChips.SEAT_VENTILATION
    );
  }

  async initSeatsMemory(): Promise<void> {
    await this.initMultiSelection('Пам\'ять сидінь',
      [
        { label: 'Водійське сидіння', value: 'driverMemorySeat' },
        { label: 'Передні', value: 'forwardMemorySeat' },
        { label: 'Задні', value: 'backMemorySeat' }
      ],
      AdditionalChips.SEAT_MEMORY
    );
  }

  async initWindowLifts(): Promise<void> {
    await this.initMultiSelection('Склопідйомники',
      [
        { label: 'Передні', value: 'forwardWindowLifts' },
        { label: 'Задні', value: 'backWindowLifts' }
      ],
      AdditionalChips.WINDOW_LIFTS
    );
  }

  async initParkingAssists(): Promise<void> {
    await this.initMultiSelection('Система паркування',
      [
        { label: 'Парктронік передній', value: 'forwardParktronick' },
        { label: 'Парктронік задній', value: 'backParktronick' },
        { label: 'Камера переднього виду', value: 'forwardCamera' },
        { label: 'Камера заднього виду', value: 'backCamera' },
        { label: 'Камера 360', value: 'camera360' },
        { label: 'Система автоматичного паркування', value: 'autoSystemParking' }
      ],
      AdditionalChips.PARKING_ASSIST
    );
  }

  async initAirbagsSelection(): Promise<void> {
    await this.initMultiSelection('Подушки безпеки',
      [
        { label: 'Водія', value: 'driverAirbag' },
        { label: 'Колін водія', value: 'driverKneesAirbag' },
        { label: 'Пасажира', value: 'passengerAirbag' },
        { label: 'Між водієм та пасажиром', value: 'beetwenAirbag' },
        { label: 'Бічні задні', value: 'backSideAirbag' },
        { label: 'Бічні передні', value: 'forwardSideAirbag' },
        { label: 'Віконні', value: 'windowAirbag' }
      ],
      AdditionalChips.AIRBAGS
    );
  }

  async initMultimediaSelection(): Promise<void> {

  }

  async initMultiSelection(header: string, options, chipType: string): Promise<void> {
    const alert: HTMLIonAlertElement = await this.alertCtrl.create({
      header: header,
      cssClass: 'wide-alert',
      inputs: options.map(option => ({
        type: 'checkbox',
        label: option.label,
        value: JSON.stringify({ value: option.value, label: option.label })
      })),
      buttons: [
        { text: 'Скасувати', role: 'cancel', handler: () => this.resetInitialChip(chipType) },
        {
          text: 'Ок',
          handler: (data): void => {
            const selectedOptions = data.map(option => JSON.parse(option));
            this.setChipValue(null, chipType, selectedOptions);
          }
        }
      ]
    });

    await alert.present();
  }

  async initSingleSelection(header: string, options: { label: string; value: string; checked?: boolean }[], chipType: string): Promise<void> {
    const alert: HTMLIonAlertElement = await this.alertCtrl.create({
      header: header,
      cssClass: 'wide-alert',
      inputs: options.map(option => ({
        type: 'radio',
        label: option.label,
        value: JSON.stringify({ value: option.value, label: option.label }),
        checked: option.checked || false
      })),
      buttons: [
        { text: 'Скасувати', role: 'cancel', handler: () => this.resetInitialChip(chipType) },
        {
          text: 'Ок',
          handler: (data): void => {
            const selectedOption = JSON.parse(data);
            this.setChipValue(selectedOption, chipType);
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
