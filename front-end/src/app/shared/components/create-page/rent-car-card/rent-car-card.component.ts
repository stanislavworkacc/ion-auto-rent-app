import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle} from "@ionic/angular/standalone";

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
    IonCardContent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RentCarCardComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
