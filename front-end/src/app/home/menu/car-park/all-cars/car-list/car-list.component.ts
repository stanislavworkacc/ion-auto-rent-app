import {ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit} from '@angular/core';
import {IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem} from "@ionic/angular/standalone";
import {AllCarsService} from "../all-cars.service";
import {NgFor} from "@angular/common";

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss'],
  standalone: true,
  imports: [
    IonItem,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    NgFor
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarListComponent  implements OnInit {

  private allCarsService: AllCarsService = inject(AllCarsService);
  get allCarsData() {
    return this.allCarsService;
  }
  constructor() { }

  ngOnInit() {}

}
