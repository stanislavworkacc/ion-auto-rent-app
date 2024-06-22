import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal
} from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon, IonLabel, IonSearchbar,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {ProfileGreetingsComponent} from "./profile-greetings/profile-greetings.component";
import {SegmentsComponent} from "../../shared/ui-kit/components/segments/segments.component";
import {MenuProfileComponent} from "./menu-profile/menu-profile.component";
import {RouterOutlet} from "@angular/router";
import {LogOutComponent} from "./menu-profile/log-out/log-out.component";
import {NotificationsPreviewComponent} from "./menu-profile/notifications-preview/notifications-preview.component";
import {IonFabComponent} from "../../shared/ui-kit/components/ion-fab/ion-fab.component";
import {SignUpFormComponent} from "../../auth/authorizator/sign-up-form/sign-up-form.component";
import {MenuPage, MenuSection} from "./menu-enums";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, TranslateModule, IonButtons, IonButton, ProfileGreetingsComponent, SegmentsComponent, IonChip, IonIcon, IonLabel, MenuProfileComponent, RouterOutlet, LogOutComponent, IonSearchbar, NotificationsPreviewComponent, IonFabComponent, SignUpFormComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent implements OnInit {

  private translate: TranslateService = inject(TranslateService);

  public options: WritableSignal<{ value: string, icon: string, label: string }[]> = signal([]);
  public selected: WritableSignal<string> = signal('profile');

  public profilePages: WritableSignal<{ value: string, icon: string, label: string }[]> = signal([]);
  public MenuSection = MenuSection;

  switchLanguage(language: string) {
    this.translate.use(language);
  }

  setOptions(): void {
    this.options.set([
      {value: MenuSection.PROFILE, icon: 'person-circle-outline', label: 'Профіль'},
      {value: MenuSection.CAR_PARK, icon: 'car-sport-outline', label: 'Автопарк'},
      {value: MenuSection.FILES, icon: 'folder-open-outline', label: 'Файли'},
      {value: MenuSection.GEO, icon: 'location-outline', label: 'Гео'},
    ]);
  }

  setProfilePages(): void {
    this.profilePages.set([
      {value: MenuPage.PROFILE, icon: 'person-circle-outline', label: 'Мій профіль'},
      {value: MenuPage.SEARCH, icon: 'search-outline', label: 'Пошук'},
      {value: MenuPage.SALE, icon: 'gift-outline', label: 'Акції'},
      {value: MenuPage.CREATE, icon: 'add-circle-outline', label: 'Оголошення'},
      {value: MenuPage.NEWS, icon: 'book-outline', label: 'Наші новини'},
      {value: MenuPage.SETTINGS, icon: 'settings-outline', label: 'Налаштування'},
      {value: MenuPage.HELP, icon: 'information-circle-outline', label: 'Допомога'},
    ]);
  }

  ngOnInit(): void {
    this.setOptions();
    this.setProfilePages();
  }
}

