import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {IonButton, IonIcon} from "@ionic/angular/standalone";

@Component({
  selector: 'log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonIcon
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogOutComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
