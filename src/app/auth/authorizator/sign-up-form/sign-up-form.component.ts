import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {SwitcherComponent} from "../../../shared/ui-kit/components/switcher/switcher.component";

@Component({
  selector: 'sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    SwitcherComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpFormComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
