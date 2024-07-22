import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {RippleBtnComponent} from "../../../shared/components/buttons/ripple-btn/ripple-btn.component";
import {IonicModule} from "@ionic/angular";
import {
  CompaniesMarqueeComponent
} from "../../../auth/authorizator/auth-form-wrapper/companies-marquee/companies-marquee.component";

@Component({
  selector: 'card-list-filters',
  templateUrl: './card-list-filters.component.html',
  styleUrls: ['./card-list-filters.component.scss'],
  standalone: true,
  imports: [
    RippleBtnComponent,
    IonicModule,
    CompaniesMarqueeComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardListFiltersComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}