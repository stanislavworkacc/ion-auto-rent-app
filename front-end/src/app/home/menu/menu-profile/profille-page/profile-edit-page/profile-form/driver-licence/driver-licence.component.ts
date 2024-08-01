import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {IonIcon, IonText} from "@ionic/angular/standalone";

@Component({
  selector: 'driver-licence',
  templateUrl: './driver-licence.component.html',
  styleUrls: ['./driver-licence.component.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonText
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DriverLicenceComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
