import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle, IonContent, IonIcon, IonItem, IonLabel,
  IonList, IonProgressBar, IonThumbnail
} from "@ionic/angular/standalone";
import {NgForOf} from "@angular/common";

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
    IonProgressBar
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
