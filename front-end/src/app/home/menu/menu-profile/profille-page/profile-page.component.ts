import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  InputSignal,
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
  ModalController
} from "@ionic/angular/standalone";
import {BackButtonComponent} from "../../../../shared/ui-kit/components/back-button/back-button.component";
import {NavController, Platform} from "@ionic/angular";
import {MenuPage, ProfileMenuItem} from "../../menu-enums";

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
    IonRow
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePage implements OnInit {

  private modalCtrl: ModalController = inject(ModalController);
  private navCtrl: NavController = inject(NavController);
  public platform: Platform = inject(Platform);

  public menuItems: WritableSignal<{ value: string, icon: string, label: string }[]> = signal([]);
  public ProfileMenuItem = ProfileMenuItem;

  goBack(): void {
    this.navCtrl.back()
  }

  setMenuItems(): void {
    this.menuItems.set([
      {value: 'profile', icon: 'wallet-outline', label: 'Особистий рахунок'},
      {value: 'premium', icon: 'trending-up-outline', label: 'Преміум'},
      {value: 'profile', icon: 'bar-chart-outline', label: 'Рейтинг'},
      {value: 'profile', icon: 'document-lock-outline', label: 'Конфеденційність'},
      {value: 'profile', icon: 'person-circle-outline', label: 'Редагувати профіль'},
    ]);
  }

  ngOnInit(): void {
    this.setMenuItems();
  }
}
