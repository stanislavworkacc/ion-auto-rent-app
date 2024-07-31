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
import {MenuPage, MenuSection, ProfileMenuItem} from "./menu-enums";
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

  public selectedMenuChip: WritableSignal<{ value: string, icon: string, label: string, iconClass:string }> = this.dataService.selectedMenuChip;

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

  setProfilePages(): void {
    this.dataService.setProfilePages([
      {value: MenuPage.PROFILE, icon: '/assets/icon/user-menu-icon.png', label: 'Мій профіль', iconClass: 'h-[18px] w-[18px]',},
      {value: MenuPage.PROFILE, icon: '/assets/icon/card-balance.png', label: 'Баланс', iconClass: 'h-[18px] w-[18px]',},
      {value: ProfileMenuItem.PRIVACY_POLICY, icon: '/assets/icon/privacy-blu2.png', label: 'Захист даних', iconClass: 'h-[20px] w-[20px]'},
      {value: MenuPage.NOTIFICATIONS, icon: '/assets/icon/notification_2.png', label: 'Сповіщення', iconClass: 'h-[20px] w-[20px]'},
      {value: MenuPage.HELP, icon: 'assets/icon/support_blue.png', label: 'Допомога', iconClass: 'h-[20px] w-[20px]'},
      {value: MenuPage.SETTINGS, icon: '/assets/icon/settings-menu-icon.png', label: 'Налаштування', iconClass: 'h-[18px] w-[18px]'},
      {value: MenuSection.CAR_PARK, icon: '/assets/icon/car-parks-blue.png', label: 'Автопарк',iconClass: 'h-[18px] w-[18px]'},
      {value: MenuPage.CREATE, icon: '/assets/icon/plus-blue.png', label: 'Додати', iconClass: 'h-[20px] w-[20px]'},
      // {value: MenuPage.NEWS, icon: '/assets/icon/news-menu-ico.png', label: 'Новини', iconClass: 'h-[18px] w-[18px]'},
      // {value: MenuPage.SALE, icon: '/assets/icon/sale-menu-ico.png', label: 'Акції', iconClass: 'h-[20px] w-[20px]'},
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
      {icon: '/assets/icon/all-cars-ico.png', count: 4, description: '', value: 'car'},
      {icon: '/assets/icon/car-in-rent-ico.png', count: 1, description: '', value: 'in-rent'},
    ])
  }

  setSignals(): void {
    this.setProfilePages();
    this.setSocialMarks();
    this.setCarsMarks();
  }

  ngOnInit(): void {
    this.setSignals();
  }

  chipChangeSubscription(): void  {
    if(this.selectedMenuChip()?.value === MenuSection.PROFILE) {
      this.navCtrl.navigateForward(['/home/menu/profile'])
    }
    if(this.selectedMenuChip()?.value === MenuSection.CAR_PARK) {
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

