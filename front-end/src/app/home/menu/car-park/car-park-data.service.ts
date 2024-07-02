import {computed, Injectable, Signal, signal, WritableSignal} from "@angular/core";
import {MenuSection} from "../menu-enums";
import {SelectedSegment} from "./car-park.enums";

@Injectable({
  providedIn: 'root'
})
export class CarParkDataService {

  public options: WritableSignal<{
    value: string,
    icon: string,
    label: string,
    isVisible: boolean
  }[]> = signal([]);

  public selectedSegment: WritableSignal<string> = signal(SelectedSegment.ALL);

  public routes: WritableSignal<string[]> = signal([]);
  public excludedRoutes: Signal<string[]> = computed(() => this.routes());

  public newRoutes: WritableSignal<{ url: string, label: string }[]> = signal([]);
  public additionalRoutes: Signal<{ url: string, label: string }[]> = computed(() => this.newRoutes());

  setOptions(options: { value: string, icon: string, label: string, isVisible: boolean }[]): void {
    this.options.set(options)
  }

  getOptions(): { value: string; icon: string; label: string }[] {
    return this.options();
  }
}
