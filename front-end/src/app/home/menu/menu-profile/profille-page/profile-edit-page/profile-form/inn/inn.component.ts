import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {IonIcon, IonLabel, IonText} from "@ionic/angular/standalone";

@Component({
  selector: 'inn-code',
  templateUrl: './inn.component.html',
  styleUrls: ['./inn.component.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonLabel, IonText
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InnComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
