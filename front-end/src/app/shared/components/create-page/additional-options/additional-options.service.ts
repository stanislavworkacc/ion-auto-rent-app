import {computed, Injectable, Signal} from "@angular/core";
import {AdditionalChips} from "./additional-options.enums";

@Injectable({
  providedIn: 'root'
})
export class AdditionalOptionsService {
  public additionalChips: Signal<any> = computed( () => [
    {
      label: AdditionalChips.AIR_CONDITIONER,
      value: '',
      isVisible: true,
      callback: () => {}
    },
    {
      label: AdditionalChips.SALON,
      value: '',
      isVisible: true,
      callback: () => {}
    },
    {
      label: AdditionalChips.SALON_COLOR,
      value: '',
      isVisible: true,
      callback: () => {}
    },
    {
      label: AdditionalChips.BABY_SEAT,
      value: '',
      isVisible: true,
      callback: () => {}
    },
    {
      label: AdditionalChips.STEER_HYDRO,
      value: '',
      isVisible: true,
      callback: () => {}
    },
    {
      label: AdditionalChips.LIGHTS,
      value: '',
      isVisible: true,
      callback: () => {}
    },
    {
      label: AdditionalChips.WHEEL,
      value: '',
      isVisible: true,
      callback: () => {}
    },
    {
      label: AdditionalChips.HEATED_SEATS,
      value: '',
      isVisible: true,
      callback: () => {}
    },
    {
      label: AdditionalChips.SEAT_VENTILATION,
      value: '',
      isVisible: true,
      callback: () => {}
    },
    {
      label: AdditionalChips.SEAT_MEMORY,
      value: '',
      isVisible: true,
      callback: () => {}
    },
    {
      label: AdditionalChips.WINDOW_LIFTS,
      value: '',
      isVisible: true,
      callback: () => {}
    },
  ]);
}
