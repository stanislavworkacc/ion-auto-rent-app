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
  IonCardTitle, IonChip, IonContent, IonIcon, IonItem, IonLabel,
  IonList, IonProgressBar, IonThumbnail, ModalController
} from "@ionic/angular/standalone";
import {NgClass, NgForOf} from "@angular/common";
import {HeaderParksComponent} from "./header-parks/header-parks.component";
import {CarParksDescriptionComponent} from "./car-parks-description/car-parks-description.component";
import {AuthorizatorComponent} from "../../../../auth/authorizator/authorizator.component";
import {CreateParkModalComponent} from "./create-park-modal/create-park-modal.component";
import {MenuDataService} from "../../menu-data.serivce";
import {NavController, Platform} from "@ionic/angular";

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
    CarParksDescriptionComponent,
    IonAlert,
    IonButtons
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

  userCarParkings = [
    { img: 'https://ionicframework.com/docs/img/demos/thumbnail.svg', label: 'Car Parking 1', location: 'Location 1' },
    // { img: 'https://ionicframework.com/docs/img/demos/thumbnail.svg', label: 'Car Parking 2', location: 'Location 2' },
    // { img: 'https://ionicframework.com/docs/img/demos/thumbnail.svg', label: 'Car Parking 3', location: 'Location 3' },
    // { img: 'https://ionicframework.com/docs/img/demos/thumbnail.svg', label: 'Car Parking 4', location: 'Location 4' }
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

  constructor() { }

  ngOnInit() {}

}
