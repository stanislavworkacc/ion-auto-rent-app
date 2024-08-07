import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal, ViewChild,
  WritableSignal
} from '@angular/core';
import {
  IonAvatar,
  IonBackButton, IonBadge, IonBreadcrumb, IonBreadcrumbs, IonButton,
  IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol,
  IonContent, IonGrid,
  IonHeader, IonIcon, IonItem, IonLabel, IonList,
  IonModal, IonPopover, IonRow, IonSearchbar, IonTitle,
  IonToolbar,
} from "@ionic/angular/standalone";
import {BackButtonComponent} from "../../../../shared/ui-kit/components/back-button/back-button.component";
import {NavController, Platform} from "@ionic/angular";
import {ProfileMenuItem} from "../../menu-enums";
import {LogOutComponent} from "../log-out/log-out.component";
import {NotificationsPreviewComponent} from "../notifications-preview/notifications-preview.component";
import {RouterOutlet} from "@angular/router";
import {ProfileGreetingsComponent} from "../../profile-greetings/profile-greetings.component";
import {AsyncPipe, JsonPipe, NgForOf} from "@angular/common";
import {BreadcrumbService} from "../../../../shared/services/breadcrumb.service";
import {BreadcrumbLabelPipe} from "../../../../shared/breadcrumb-map-name.pipe";
import {MenuDataService} from "../../menu-data.serivce";
import {StorageService} from "../../../../shared/services/storage.service";

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
    ProfileGreetingsComponent,
    IonBreadcrumbs,
    IonBreadcrumb,
    NgForOf,
    IonPopover,
    AsyncPipe,
    JsonPipe,
    BreadcrumbLabelPipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePage implements OnInit {

  private navCtrl: NavController = inject(NavController);
  private breadcrumbs: BreadcrumbService = inject(BreadcrumbService);
  private menuDataService: MenuDataService = inject(MenuDataService);
  public platform: Platform = inject(Platform);

  public ProfileMenuItem = ProfileMenuItem;
  public collapsedBreadcrumbs: any[] = [];
  public isBreadCrumbPopoverOpen: boolean = false;

  @ViewChild('popover') popover;

  get menuService() {
    return this.menuDataService;
  }

  goBack(): void {
    this.navCtrl.back()
  }

  get breadcrumbsService() {
    return this.breadcrumbs;
  }

  setMenuItems(): void {
    this.menuService.setProfilePageItems([
      {value: ProfileMenuItem.PROFILE, icon: '/assets/icon/card-profile-ico.png', label: 'Баланс'},
      {value: ProfileMenuItem.PREMIUM, icon: '/assets/icon/premium-profile-ico.png', label: 'Преміум'},
      {value: ProfileMenuItem.RATING, icon: '/assets/icon/rating-profile-ico.png', label: 'Рейтинг'},
      {value: ProfileMenuItem.RATING, icon: '/assets/icon/car-rent-profile-ico.png', label: 'Оренди'},
      {value: ProfileMenuItem.PRIVACY_POLICY, icon: '/assets/icon/privacy-profile-ico2.png', label: 'Захист даних'},
      {value: ProfileMenuItem.EDIT, icon: '/assets/icon/profile-edit-ico.png', label: 'Редагувати'},
    ]);
  }


  openProfilePage(page: { value: string, icon: string, label: string }): void {
    switch (page.value) {
      case ProfileMenuItem.EDIT: {
        this.navCtrl.navigateForward('home/menu/edit');
        break;
      }
    }
  }

  async presentPopover(e: Event): Promise<void> {
    const eventDetail = (e as CustomEvent).detail;
    this.collapsedBreadcrumbs = this.breadcrumbsService.buildCollapsedBreadcrumbs(eventDetail.collapsedBreadcrumbs, ['/home']);

    this.popover.event = e;
    this.isBreadCrumbPopoverOpen = true;
  }

  async ngOnInit() {
    this.setMenuItems();
  }
}
