import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {IonFabComponent} from "../../shared/ui-kit/components/ion-fab/ion-fab.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    IonFabComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
