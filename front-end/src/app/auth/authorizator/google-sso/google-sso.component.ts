import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {PrivacyPolicyComponent} from "../privacy-policy/privacy-policy.component";

@Component({
  selector: 'app-google-sso',
  templateUrl: './google-sso.component.html',
  styleUrls: ['./google-sso.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    PrivacyPolicyComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoogleSsoComponent  implements OnInit {

  signInWithGoogle(): void {
  }
  constructor() { }

  ngOnInit() {}

}
