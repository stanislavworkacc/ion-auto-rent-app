import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {IonContent, IonHeader, IonIcon, IonLabel, IonToolbar} from "@ionic/angular/standalone";
import {RentCarCardComponent} from "../../../shared/components/create-page/rent-car-card/rent-car-card.component";
import {RippleBtnComponent} from "../../../shared/components/buttons/ripple-btn/ripple-btn.component";
import {CloseBtnComponent} from "../../../shared/ui-kit/components/close-btn/close-btn.component";

@Component({
  selector: 'app-marker-modal',
  templateUrl: './marker-modal.component.html',
  styleUrls: ['./marker-modal.component.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonContent,
    RentCarCardComponent,
    RippleBtnComponent,
    CloseBtnComponent,
    IonLabel,
    IonIcon
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarkerModalComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
