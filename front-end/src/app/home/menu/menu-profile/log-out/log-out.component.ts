import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {IonButton, IonIcon} from "@ionic/angular/standalone";
import {RippleBtnComponent} from "../../../../shared/components/buttons/ripple-btn/ripple-btn.component";

@Component({
  selector: 'log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.scss'],
  standalone: true,
    imports: [
        IonButton,
        IonIcon,
        RippleBtnComponent
    ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogOutComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
