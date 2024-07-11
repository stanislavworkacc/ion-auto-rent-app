import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {IonBadge, IonIcon} from "@ionic/angular/standalone";
import {NgClass} from "@angular/common";
import {AllCarsService} from "../all-cars.service";

@Component({
  selector: 'app-reviews-page',
  templateUrl: './reviews-page.component.html',
  styleUrls: ['./reviews-page.component.scss'],
  standalone: true,
  imports: [IonIcon, IonBadge, NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewsPageComponent  implements OnInit {

  private allCarsService: AllCarsService = inject(AllCarsService);

  get allCarsData() {
    return this.allCarsService;
  }

  setParkRates(): void {
    this.allCarsData.setRateIcons([
      {
        name: 'car-outline',
        textClass: 'text-[#89a1c8]',
        badgeClass: 'bg-[#89a1c8]',
        badgeText: '2'
      },
      {
        name: 'checkmark-circle-outline',
        textClass: 'text-[#49a66b]',
        badgeClass: 'bg-[#2f9253]',
        badgeText: '2'
      },
      {
        name: 'heart-outline',
        textClass: 'text-[#b5b5b5]',
        badgeClass: 'bg-[#b5b5b5]',
        badgeText: '2'
      },
      {
        name: 'heart-dislike-outline',
        textClass: 'text-[#b5b5b529]',
        badgeClass: 'bg-[#b5b5b5]',
        badgeText: '2'
      },
      {
        name: 'star-half-outline',
        textClass: 'text-[#b5b5b529]',
        badgeClass: 'bg-[#3e4673]',
        badgeText: '4.3'
      }
    ])
  }
  constructor() { }

  ngOnInit(): void {
    this.setParkRates();
  }

}
