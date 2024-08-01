import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {IonIcon, IonLabel, IonText} from "@ionic/angular/standalone";

@Component({
  selector: 'passport',
  templateUrl: './passport.component.html',
  styleUrls: ['./passport.component.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonLabel,
    IonText
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PassportComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
