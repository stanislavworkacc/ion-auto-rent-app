import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {IonicModule} from "@ionic/angular";
import {IonIcon} from "@ionic/angular/standalone";

@Component({
  selector: 'companies-marquee',
  templateUrl: './companies-marquee.component.html',
  styleUrls: ['./companies-marquee.component.scss'],
  standalone: true,
  imports: [
    NgForOf,
    IonIcon
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompaniesMarqueeComponent  implements OnInit {

  companies = [
    { name: 'Company A', icon: 'logo-apple' },
    { name: 'Company B', icon: 'logo-google' },
    { name: 'Company C', icon: 'logo-microsoft' },
    { name: 'Company D', icon: 'logo-facebook' },
    { name: 'Company E', icon: 'logo-twitter' },
    { name: 'Company F', icon: 'logo-amazon' }
  ];
  constructor() { }

  ngOnInit() {}

}
