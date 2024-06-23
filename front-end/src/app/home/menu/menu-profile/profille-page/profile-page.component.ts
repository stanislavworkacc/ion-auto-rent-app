import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal
} from '@angular/core';
import {
  IonAvatar,
  IonBackButton, IonBadge, IonButton,
  IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol,
  IonContent, IonGrid,
  IonHeader, IonIcon, IonItem, IonLabel, IonList,
  IonModal, IonRow, IonSearchbar, IonTitle,
  IonToolbar,
} from "@ionic/angular/standalone";
import {BackButtonComponent} from "../../../../shared/ui-kit/components/back-button/back-button.component";
import {NavController, Platform} from "@ionic/angular";
import {ProfileMenuItem} from "../../menu-enums";
import {LogOutComponent} from "../log-out/log-out.component";
import {NotificationsPreviewComponent} from "../notifications-preview/notifications-preview.component";
import {RouterOutlet} from "@angular/router";
import {MenuDataService} from "../../menu-data.serivce";
import {ProfileGreetingsComponent} from "../../profile-greetings/profile-greetings.component";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
  standalone: true,
  imports: [
    IonModal,
    IonContent,
    BackButtonComponent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonAvatar,
    IonButton,
    IonSearchbar,
    IonBadge,
    IonCol,
    IonGrid,
    IonRow,
    LogOutComponent,
    NotificationsPreviewComponent,
    RouterOutlet,
    ProfileGreetingsComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePage implements OnInit {

  private navCtrl: NavController = inject(NavController);
  private menuDataService: MenuDataService = inject(MenuDataService);
  public platform: Platform = inject(Platform);

  public menuItems: WritableSignal<{ value: string, icon: string, label: string }[]> = signal([]);
  public ProfileMenuItem = ProfileMenuItem;

  get dataService() {
    return this.menuDataService;
  }

  goBack(): void {
    this.navCtrl.back()
  }

  setMenuItems(): void {
    this.menuItems.set([
      {value: ProfileMenuItem.PROFILE, icon: 'wallet-outline', label: 'Рахунок'},
      {value: ProfileMenuItem.PREMIUM, icon: 'trending-up-outline', label: 'Преміум'},
      {value: ProfileMenuItem.RATING, icon: 'bar-chart-outline', label: 'Рейтинг'},
      {value: ProfileMenuItem.PROMO_CODE, icon: 'qr-code-outline', label: 'Промо-код'},
      {value: ProfileMenuItem.PRIVACY_POLICY, icon: 'document-lock-outline', label: 'Захист даних'},
      {value: ProfileMenuItem.EDIT, icon: 'person-circle-outline', label: 'Редагувати'},
    ]);
  }


  openProfilePage(page: { value: string, icon: string, label: string }): void {
    switch (page.value) {
      case ProfileMenuItem.EDIT: {
        this.navCtrl.navigateForward('home/menu/edit')
      }
    }
  }

  ngOnInit(): void {
    this.setMenuItems();
  }
}
