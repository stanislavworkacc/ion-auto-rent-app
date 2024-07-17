import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {IonContent, IonHeader, IonToolbar} from "@ionic/angular/standalone";
import {RentCarCardComponent} from "../../../shared/components/create-page/rent-car-card/rent-car-card.component";

@Component({
  selector: 'app-marker-modal',
  templateUrl: './marker-modal.component.html',
  styleUrls: ['./marker-modal.component.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonContent,
    RentCarCardComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarkerModalComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
