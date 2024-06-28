import {Injectable, signal, WritableSignal} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AllCarsService {

  allCars: WritableSignal<{
    title: string,
    subtitle: string,
    content: string,
    images: string[] }[]>
    = signal([]);

  parkRatesIcons: WritableSignal<{
    name: string,
    textClass: string,
    badgeClass: string,
    badgeText: string }[]>
    = signal([]);

  chips: WritableSignal<{ value: string, label: string, icon: string }[]> = signal([]);
  selectedChip: WritableSignal<{ value: string, label: string, icon: string }> = signal(null);
  setAllCars(cars: { title: string, subtitle: string, content: string, images: string[] }[]): void {
    this.allCars.set(cars)
  }

  getAllCars(): { title: string, subtitle: string, content: string, images: string[] }[] {
    return this.allCars();
  }

  setRateIcons(rates: { name: string, textClass: string, badgeClass: string, badgeText: string }[]): void {
    this.parkRatesIcons.set(rates)
  }

  getRateIcons(): { name: string, textClass: string, badgeClass: string, badgeText: string }[] {
    return this.parkRatesIcons();
  }
}
