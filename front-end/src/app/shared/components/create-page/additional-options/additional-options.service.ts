import {computed, Injectable, Signal} from "@angular/core";
import {AdditionalChips} from "./additional-options.enums";

@Injectable({
  providedIn: 'root'
})
export class AdditionalOptionsService {
  public additionalChips: Signal<any> = computed( () => [
    {
      label: AdditionalChips.AIR_CONDITIONER,
      value: 'Кондиціонер',
      isVisible: true,
      callback: () => {}
    },
    {
      label: AdditionalChips.AIR_CONDITIONER,
      value: 'Салон',
      isVisible: true,
      callback: () => {}
    },
    {
      label: AdditionalChips.AIR_CONDITIONER,
      value: 'Палітра салону',
      isVisible: true,
      callback: () => {}
    },
    {
      label: AdditionalChips.AIR_CONDITIONER,
      value: 'Дитяче крісло',
      isVisible: true,
      callback: () => {}
    },
    {
      label: AdditionalChips.AIR_CONDITIONER,
      value: 'Підсилювач керма',
      isVisible: true,
      callback: () => {}
    },
    {
      label: AdditionalChips.AIR_CONDITIONER,
      value: 'Фари',
      isVisible: true,
      callback: () => {}
    },
    {
      label: AdditionalChips.AIR_CONDITIONER,
      value: 'Запасне колесо',
      isVisible: true,
      callback: () => {}
    },
    {
      label: AdditionalChips.AIR_CONDITIONER,
      value: 'Підігрів сидінь',
      isVisible: true,
      callback: () => {}
    },
    {
      label: AdditionalChips.AIR_CONDITIONER,
      value: 'Вентиляція сидінь',
      isVisible: true,
      callback: () => {}
    },
    {
      label: AdditionalChips.AIR_CONDITIONER,
      value: 'Пам\'ять сидінь',
      isVisible: true,
      callback: () => {}
    },
    {
      label: AdditionalChips.AIR_CONDITIONER,
      value: 'Електросклопідйомники',
      isVisible: true,
      callback: () => {}
    },
  ]);
}
