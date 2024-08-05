import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {
  IonDatetime,
  IonDatetimeButton,
  IonIcon, IonInput,
  IonItem,
  IonLabel, IonModal,
  IonRadio,
  IonRadioGroup
} from "@ionic/angular/standalone";

@Component({
  selector: 'urk-old-passport',
  templateUrl: './urk-old-passport.component.html',
  styleUrls: ['./urk-old-passport.component.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonItem,
    IonLabel,
    IonRadio,
    IonRadioGroup,
    IonDatetimeButton,
    IonDatetime,
    IonModal,
    IonInput
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UrkOldPassportComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
