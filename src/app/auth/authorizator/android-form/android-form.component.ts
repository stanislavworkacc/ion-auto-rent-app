import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {PrivacyPolicyComponent} from "../privacy-policy/privacy-policy.component";

@Component({
  selector: 'app-android-form',
  templateUrl: './android-form.component.html',
  styleUrls: ['./android-form.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    PrivacyPolicyComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AndroidFormComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
