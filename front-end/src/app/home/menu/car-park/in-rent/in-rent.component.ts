import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {InRentAllSegmentComponent} from "../in-rent-all-segment/in-rent-all-segment.component";
import {IonButton, IonContent, IonIcon, IonLabel} from "@ionic/angular/standalone";
import {BackButtonComponent} from "../../../../shared/ui-kit/components/back-button/back-button.component";

@Component({
  selector: 'in-rent',
  templateUrl: './in-rent.component.html',
  styleUrls: ['./in-rent.component.scss'],
  standalone: true,
    imports: [
        InRentAllSegmentComponent,
        IonContent,
        BackButtonComponent,
        IonButton,
        IonIcon,
        IonLabel
    ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InRentComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
