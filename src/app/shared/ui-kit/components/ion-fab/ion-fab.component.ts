import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-fab',
  templateUrl: './ion-fab.component.html',
  styleUrls: ['./ion-fab.component.scss'],
  standalone: true,
  imports: [
    IonicModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IonFabComponent  implements OnInit {


  ngOnInit() {}
}
