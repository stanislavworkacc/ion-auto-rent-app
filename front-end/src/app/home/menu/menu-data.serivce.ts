import {Injectable, signal, WritableSignal} from "@angular/core";
import {MenuSection} from "./menu-enums";

@Injectable({
  providedIn: 'root'
})
export class MenuDataService {
  public socialMarks: WritableSignal<{
    icon: string,
    count: number,
    description: string,
    value: string
  }[]> = signal([]);
  public carsMarks: WritableSignal<{
    icon: string,
    count: number,
    description: string,
    value: string
  }[]> = signal([]);

  public profilePages: WritableSignal<{
    value: string,
    icon: string,
    label: string,
    iconClass: string
  }[]> = signal([]);

  public menuItems: WritableSignal<{
    value: string,
    icon: string,
    label: string
  }[]> = signal([]);

  public selectedMenuChip: WritableSignal<{ value: string, icon: string, label: string, iconClass:string }> = signal(null);

  setProfilePageItems(options: { value: string, icon: string, label: string }[]): void {
    this.menuItems.set(options)
  }

  getProfilePageItems(): { value: string; icon: string; label: string }[] {
    return this.menuItems();
  }

  setProfilePages(options: { value: string, icon: string, label: string, iconClass: string }[]): void {
    this.profilePages.set(options)
  }

  getProfilePages(): { value: string; icon: string; label: string, iconClass: string }[] {
    return this.profilePages();
  }

  setSocialMarks(marks: { value: string, icon: string, count: number, description: string }[]): void {
    this.socialMarks.set(marks);
  }

  getSocialMarks(): { icon: string; count: number; description: string; value: string }[] {
    return this.socialMarks();
  }

  setCarsMarks(marks: { value: string, icon: string, count: number, description: string }[]): void {
    this.carsMarks.set(marks);
  }

  getCarsMarks(): { value: string, icon: string, count: number, description: string }[] {
    return this.carsMarks();
  }
}
