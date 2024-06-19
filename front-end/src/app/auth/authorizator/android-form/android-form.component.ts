import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {PrivacyPolicyComponent} from "../privacy-policy/privacy-policy.component";
import {IonButton, IonCard, IonCardContent, IonIcon} from "@ionic/angular/standalone";

@Component({
  selector: 'app-android-form',
  templateUrl: './android-form.component.html',
  styleUrls: ['./android-form.component.scss'],
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
export class AndroidFormComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
