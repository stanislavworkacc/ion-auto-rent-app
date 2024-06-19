import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {PrivacyPolicyComponent} from "../privacy-policy/privacy-policy.component";
import {IonButton, IonCard, IonCardContent, IonIcon} from "@ionic/angular/standalone";

@Component({
  selector: 'app-apple-ios',
  templateUrl: './apple-ios.component.html',
  styleUrls: ['./apple-ios.component.scss'],
  standalone: true,
    imports: [
      IonIcon,
      IonButton,
      IonCard,
      IonCardContent,
      PrivacyPolicyComponent
    ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppleIosComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
