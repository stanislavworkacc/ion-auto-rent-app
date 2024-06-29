import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {
  IonAccordion,
  IonAccordionGroup,
  IonCard,
  IonCardContent,
  IonIcon,
  IonItem,
  IonLabel
} from "@ionic/angular/standalone";

@Component({
  selector: 'car-parks-description',
  templateUrl: './car-parks-description.component.html',
  styleUrls: ['./car-parks-description.component.scss'],
  standalone: true,
  imports: [
    IonAccordion,
    IonAccordionGroup,
    IonCard,
    IonCardContent,
    IonIcon,
    IonItem,
    IonLabel
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarParksDescriptionComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
