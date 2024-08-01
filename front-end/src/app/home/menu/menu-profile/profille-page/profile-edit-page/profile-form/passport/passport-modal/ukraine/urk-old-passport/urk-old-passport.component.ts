import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {IonIcon} from "@ionic/angular/standalone";

@Component({
  selector: 'urk-old-passport',
  templateUrl: './urk-old-passport.component.html',
  styleUrls: ['./urk-old-passport.component.scss'],
  standalone: true,
  imports: [
    IonIcon
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UrkOldPassportComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
