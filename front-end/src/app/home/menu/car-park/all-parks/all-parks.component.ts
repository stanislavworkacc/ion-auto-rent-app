import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {
  IonAccordion,
  IonAccordionGroup,
  IonBadge,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle, IonChip, IonContent, IonIcon, IonItem, IonLabel,
  IonList, IonProgressBar, IonThumbnail
} from "@ionic/angular/standalone";
import {NgClass, NgForOf} from "@angular/common";
import {HeaderParksComponent} from "./header-parks/header-parks.component";
import {CarParksDescriptionComponent} from "./car-parks-description/car-parks-description.component";

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
    CarParksDescriptionComponent
  ]
})
export class AllParksComponent  implements OnInit {

  userCarParkings = [
    { img: 'https://ionicframework.com/docs/img/demos/thumbnail.svg', label: 'Car Parking 1', location: 'Location 1' },
    { img: 'https://ionicframework.com/docs/img/demos/thumbnail.svg', label: 'Car Parking 2', location: 'Location 2' },
    { img: 'https://ionicframework.com/docs/img/demos/thumbnail.svg', label: 'Car Parking 3', location: 'Location 3' },
    { img: 'https://ionicframework.com/docs/img/demos/thumbnail.svg', label: 'Car Parking 4', location: 'Location 4' }
    // Add more car parkings as needed
  ];

  constructor() { }

  ngOnInit() {}

}
