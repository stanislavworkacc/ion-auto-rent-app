import {ChangeDetectionStrategy, Component, inject, input, InputSignal, OnInit} from '@angular/core';
import {
    IonAccordion,
    IonAccordionGroup, IonAlert,
    IonBadge,
    IonButton, IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle, IonChip, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonItem, IonLabel,
    IonList, IonProgressBar, IonThumbnail, IonToolbar, ModalController
} from "@ionic/angular/standalone";
import {NgClass, NgForOf} from "@angular/common";
import {HeaderParksComponent} from "./header-parks/header-parks.component";
import {CreateParkModalComponent} from "./create-park-modal/create-park-modal.component";
import {MenuDataService} from "../../menu-data.serivce";
import {NavController, Platform} from "@ionic/angular";
import {BackButtonComponent} from "../../../../shared/ui-kit/components/back-button/back-button.component";
import {MenuPage, MenuSection} from "../../menu-enums";
import {RentCarCardComponent} from "../../../../shared/components/create-page/rent-car-card/rent-car-card.component";

@Component({
  selector: 'app-all-parks',
  templateUrl: './all-parks.component.html',
  styleUrls: ['./all-parks.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonList,
    IonItem,
    IonThumbnail,
    IonLabel,
    IonContent,
    NgForOf,
    IonButton,
    IonIcon,
    IonProgressBar,
    IonChip,
    IonBadge,
    NgClass,
    IonAccordionGroup,
    IonAccordion,
    HeaderParksComponent,
    IonAlert,
    IonButtons,
    BackButtonComponent,
    IonHeader,
    IonToolbar,
    IonFab,
    IonFabButton,
    RentCarCardComponent
  ]
})
export class AllParksComponent  implements OnInit {

  private modalCtrl: ModalController = inject(ModalController);
  private navCtrl: NavController = inject(NavController);
  private menuDataService: MenuDataService = inject(MenuDataService);
  public platform: Platform = inject(Platform);

  get dataService() {
    return this.menuDataService;
  }

  parkings = [
    { label: 'Car Parking 1',
      location: 'Location 1',
      contact: '+1234567890',
      schedule: '24/7',
      freeCars: 10
    },
    { label: 'Car Parking 2',
      location: 'Location 2',
      contact: '+1234567890',
      schedule: '24/7',
      freeCars: 3
    },
    { label: 'Car Parking 3',
      location: 'Location 3',
      contact: '+1234567890',
      schedule: '24/7',
      freeCars: 2
    },
    { label: 'Car Parking 4',
      location: 'Location 4',
      contact: '+1234567890',
      schedule: '24/7',
      freeCars: 5
    },
  ];

  selectParking(): void {
    this.navCtrl.navigateForward(['home/menu/car-park/all-cars'])
  }
  async openModal(): Promise<void> {
    const modal: HTMLIonModalElement = await this.modalCtrl.create({
      component: CreateParkModalComponent,
      cssClass: 'auth-modal',
      initialBreakpoint: 0.9,
      breakpoints: [0, 0.9]
    });

    await modal.present();
  }

  navigateBack(): void {
    this.navCtrl.navigateBack(['home/menu']);
    this.dataService.selectedMenuChip.set({value: MenuPage.PROFILE, icon: '/assets/icon/user-menu-icon.png', label: 'Мій профіль', iconClass: 'h-[18px] w-[18px]'});
  }

  async createPark() {
    await this.openModal()
  }
  ngOnInit() {}

}
