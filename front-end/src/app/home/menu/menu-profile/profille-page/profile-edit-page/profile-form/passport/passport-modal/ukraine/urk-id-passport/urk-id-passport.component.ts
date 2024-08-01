import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {IonIcon} from "@ionic/angular/standalone";

@Component({
  selector: 'urk-id-passport',
  templateUrl: './urk-id-passport.component.html',
  styleUrls: ['./urk-id-passport.component.scss'],
  standalone: true,
  imports: [
    IonIcon,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UrkIdPassportComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
