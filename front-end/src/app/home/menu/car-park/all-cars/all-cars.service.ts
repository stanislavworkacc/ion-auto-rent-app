import {Injectable, signal, WritableSignal} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AllCarsService {

  allCars: WritableSignal<{
    title: string,
    subtitle: string,
    content: string,
    img: string }[]>
    = signal([]);

  setAllCars(cars: { title: string, subtitle: string, content: string, img: string }[]): void {
    this.allCars.set(cars)
  }

  getAllCars(): { title: string, subtitle: string, content: string, img: string }[] {
    return this.allCars();
  }
}
