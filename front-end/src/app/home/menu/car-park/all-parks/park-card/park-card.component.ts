import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle, IonCardTitle, IonIcon
} from "@ionic/angular/standalone";

@Component({
  selector: 'park-card',
  templateUrl: './park-card.component.html',
  styleUrls: ['./park-card.component.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonIcon
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParkCardComponent  implements OnInit {

  @Input() selectParking: () => void;
  @Input() parking;
  constructor() { }

  ngOnInit() {}

}
