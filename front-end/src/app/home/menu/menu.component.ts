import {
  ChangeDetectionStrategy,
  Component, effect,
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
import {MenuDataService} from "./menu-data.serivce";
import {FileComponent} from "./file/file.component";
import {NavController} from "@ionic/angular";
import {AuthService} from "../../shared/services/auth-service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, TranslateModule, IonButtons, IonButton, ProfileGreetingsComponent, SegmentsComponent, IonChip, IonIcon, IonLabel, MenuProfileComponent, RouterOutlet, LogOutComponent, IonSearchbar, NotificationsPreviewComponent, IonFabComponent, SignUpFormComponent, FileComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent implements OnInit {

  private translate: TranslateService = inject(TranslateService);
  private menuDataService: MenuDataService = inject(MenuDataService);
  private navCtrl: NavController = inject(NavController);
  private authService: AuthService = inject(AuthService);

  public selectedMenuChip: WritableSignal<string> = this.dataService.selectedMenuChip;

  public MenuSection = MenuSection;

  get dataService() {
    return this.menuDataService;
  }

  get auth() {
    return this.authService;
  }

  switchLanguage(language: string): void {
    this.translate.use(language);
  }

  setOptions(): void {
    this.dataService.setOptions([
      {value: MenuSection.PROFILE, icon: 'person-circle-outline', label: 'Профіль'},
      {value: MenuSection.CAR_PARK, icon: 'car-sport-outline', label: 'Автопарк'},
      {value: MenuSection.FILES, icon: 'folder-open-outline', label: 'Файли'},
      {value: MenuSection.GEO, icon: 'location-outline', label: 'Гео'},
    ]);
  }

  setProfilePages(): void {
    this.dataService.setProfilePages([
      {value: MenuPage.PROFILE, icon: 'person-circle-outline', label: 'Мій профіль'},
      {value: MenuPage.SEARCH, icon: 'search-outline', label: 'Пошук'},
      {value: MenuPage.SALE, icon: 'gift-outline', label: 'Акції'},
      {value: MenuPage.CREATE, icon: 'add-circle-outline', label: 'Оголошення'},
      {value: MenuPage.NEWS, icon: 'book-outline', label: 'Новини'},
      {value: MenuPage.NEWS, icon: 'notifications-circle-outline', label: 'Сповіщення'},
      {value: MenuPage.SETTINGS, icon: 'settings-outline', label: 'Налаштування'},
      {value: MenuPage.HELP, icon: 'information-circle-outline', label: 'Допомога'},
    ]);
  }

  setSocialMarks(): void {
    this.dataService.setSocialMarks([
      {icon: 'notifications-outline', count: 3, description: 'Системні сповіщення', value: 'notifications'},
      {icon: 'chatbubbles-outline', count: 3, description: 'Вхідні повідомлення', value: 'chat'},
      {icon: 'heart-outline', count: 2, description: 'Вподобайки', value: 'likes'},
      {icon: 'heart-dislike-outline', count: 2, description: 'Дизлайки', value: 'dislikes'}
    ])
  }

  setCarsMarks(): void {
    this.dataService.setCarsMarks([
      {icon: 'car-outline', count: 4, description: 'Транспортні засоби', value: 'car'},
      {icon: 'checkmark-circle-outline', count: 4, description: 'Здано в оренду', value: 'checkmark'}
    ])
  }

  setSignals(): void {
    this.setOptions();
    this.setProfilePages();
    this.setSocialMarks();
    this.setCarsMarks();
  }

  ngOnInit(): void {
    this.setSignals();
  }

  chipChangeSubscription(): void  {
    if(this.selectedMenuChip() === MenuSection.FILES) {
      this.navCtrl.navigateForward(['/home/menu/files'])
    }
    if(this.selectedMenuChip() === MenuSection.CAR_PARK) {
      this.navCtrl.navigateForward(['/home/menu/car-park'])
    }
  }

  initLogout() {
    let data;
    this.auth.logout({}).subscribe()
  }
  constructor() {
    effect((): void => {
      this.chipChangeSubscription();
    });
  }
}

