import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  ViewEncapsulation,
  WritableSignal
} from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon, IonLabel,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {ProfileGreetingsComponent} from "./profile-greetings/profile-greetings.component";
import {SegmentsComponent} from "../../shared/ui-kit/components/segments/segments.component";
import {MenuProfileComponent} from "./menu-profile/menu-profile.component";
import {RouterOutlet} from "@angular/router";
import {LogOutComponent} from "./menu-profile/log-out/log-out.component";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, TranslateModule, IonButtons, IonButton, ProfileGreetingsComponent, SegmentsComponent, IonChip, IonIcon, IonLabel, MenuProfileComponent, RouterOutlet, LogOutComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent implements OnInit {

  private translate: TranslateService = inject(TranslateService);

  public options: WritableSignal<{ value: string, icon: string, label: string }[]> = signal([]);
  public profilePages: WritableSignal<{ value: string, icon: string, label: string }[]> = signal([]);

  switchLanguage(language: string) {
    this.translate.use(language);
  }

  setOptions(): void {
    this.options.set([
      {value: 'profile', icon: 'person-circle-outline', label: 'Профіль'},
      {value: 'carPark', icon: 'car-sport-outline', label: 'Автопарк'},
      {value: 'carPark', icon: 'folder-open-outline', label: 'Файли'},
      {value: 'geo', icon: 'location-outline', label: 'Гео'},
    ]);
  }

  setProfilePages(): void {
    this.profilePages.set([
      {value: 'profile', icon: 'person-circle-outline', label: 'Мій профіль'},
      {value: 'search', icon: 'search-outline', label: 'Пошук'},
      {value: 'sale', icon: 'gift-outline', label: 'Акції'},
      {value: 'create', icon: 'add-circle-outline', label: 'Оголошення'},
      {value: 'news', icon: 'book-outline', label: 'Наші новини'},
      {value: 'settings', icon: 'settings-outline', label: 'Налаштування'},
      {value: 'help', icon: 'information-circle-outline', label: 'Допомога'},
    ]);
  }

  ngOnInit(): void {
    this.setOptions();
    this.setProfilePages();
  }
}

