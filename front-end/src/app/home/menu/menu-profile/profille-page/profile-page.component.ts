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
  public platform: Platform = inject(Platform);

  public menuItems: WritableSignal<{ value: string, icon: string, label: string }[]> = signal([]);
  public ProfileMenuItem = ProfileMenuItem;
  public collapsedBreadcrumbs: any[] = [];
  public isBreadCrumbPopoverOpen: boolean = false;

  @ViewChild('popover') popover;

  goBack(): void {
    this.navCtrl.back()
  }

  get breadcrumbsService() {
    return this.breadcrumbs;
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
        this.navCtrl.navigateForward('home/menu/profile/edit')
      }
    }
  }

  async presentPopover(e: Event): Promise<void> {
    const eventDetail = (e as CustomEvent).detail;
    this.collapsedBreadcrumbs = this.breadcrumbsService.buildCollapsedBreadcrumbs(eventDetail.collapsedBreadcrumbs, true);
    this.popover.event = e;
    this.isBreadCrumbPopoverOpen = true;
  }

  ngOnInit(): void {
    this.setMenuItems();
  }
}
