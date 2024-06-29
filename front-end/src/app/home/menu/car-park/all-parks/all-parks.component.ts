import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {
  IonAccordion,
  IonAccordionGroup, IonAlert,
  IonBadge,
  IonButton,
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
    IonAlert
  ]
})
export class AllParksComponent  implements OnInit {

  private modalCtrl: ModalController = inject(ModalController);

  userCarParkings = [
    { img: 'https://ionicframework.com/docs/img/demos/thumbnail.svg', label: 'Car Parking 1', location: 'Location 1' },
    { img: 'https://ionicframework.com/docs/img/demos/thumbnail.svg', label: 'Car Parking 2', location: 'Location 2' },
    { img: 'https://ionicframework.com/docs/img/demos/thumbnail.svg', label: 'Car Parking 3', location: 'Location 3' },
    { img: 'https://ionicframework.com/docs/img/demos/thumbnail.svg', label: 'Car Parking 4', location: 'Location 4' }
  ];

  selectParking() {

  }
  async openModal(): Promise<void> {
    const modal: HTMLIonModalElement = await this.modalCtrl.create({
      component: CreateParkModalComponent,
      cssClass: 'auth-modal',
      initialBreakpoint: 0.6,
      breakpoints: [0, 0.6]
    });

    await modal.present();
  }

  constructor() { }

  ngOnInit() {}

}
