import {computed, Injectable, signal, Signal, WritableSignal} from "@angular/core";
import {AdditionalChips} from "./additional-options.enums";

@Injectable({
  providedIn: 'root'
})
export class AdditionalOptionsService {
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
      callback: () => {}
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

    if (selectedChip.selected) {
      selectedChip.callback();
    }

    this.chipsArray.set(updatedChipsArray);
  }
}
