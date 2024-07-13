import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon
} from "@ionic/angular/standalone";
import {BookmarkRateComponent} from "./bookmark-rate/bookmark-rate.component";

@Component({
  selector: 'rent-car-card',
  templateUrl: './rent-car-card.component.html',
  styleUrls: ['./rent-car-card.component.scss'],
  standalone: true,
  imports: [
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonIcon,
    BookmarkRateComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RentCarCardComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
