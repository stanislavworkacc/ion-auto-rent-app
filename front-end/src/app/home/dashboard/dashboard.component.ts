import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {IonFabComponent} from "../../shared/ui-kit/components/ion-fab/ion-fab.component";
import {AuthFormWrapperComponent} from "../../auth/authorizator/auth-form-wrapper/auth-form-wrapper.component";
import {AuthorizatorComponent} from "../../auth/authorizator/authorizator.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    IonFabComponent,
    AuthFormWrapperComponent,
    AuthorizatorComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
