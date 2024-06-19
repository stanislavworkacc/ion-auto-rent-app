import {ChangeDetectionStrategy, Component, input, InputSignal, OnInit} from '@angular/core';
import {PrivacyPolicyComponent} from "../privacy-policy/privacy-policy.component";
import {IonButton, IonCard, IonCardContent, IonIcon} from "@ionic/angular/standalone";

@Component({
  selector: 'app-google-sso',
  templateUrl: './google-sso.component.html',
  styleUrls: ['./google-sso.component.scss'],
  standalone: true,
  imports: [
    PrivacyPolicyComponent,
    IonIcon,
    IonButton,
    IonCard,
    IonCardContent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoogleSsoComponent  implements OnInit {

  public isLogin: InputSignal<boolean> = input(false);

  signInWithGoogle(): void {
  }
  constructor() { }

  ngOnInit() {}

}
