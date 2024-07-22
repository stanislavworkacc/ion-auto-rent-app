import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {IonIcon, IonLabel} from "@ionic/angular/standalone";
import {
  CompaniesMarqueeComponent
} from "../../../auth/authorizator/auth-form-wrapper/companies-marquee/companies-marquee.component";

@Component({
  selector: 'dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonLabel,
    CompaniesMarqueeComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardHeaderComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
