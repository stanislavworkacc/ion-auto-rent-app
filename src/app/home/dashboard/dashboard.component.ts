import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    IonicModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
