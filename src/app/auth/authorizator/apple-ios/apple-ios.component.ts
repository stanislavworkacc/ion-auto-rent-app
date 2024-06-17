import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {PrivacyPolicyComponent} from "../privacy-policy/privacy-policy.component";

@Component({
  selector: 'app-apple-ios',
  templateUrl: './apple-ios.component.html',
  styleUrls: ['./apple-ios.component.scss'],
  standalone: true,
    imports: [
        IonicModule,
        PrivacyPolicyComponent
    ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppleIosComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
