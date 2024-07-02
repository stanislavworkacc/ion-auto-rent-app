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
  constructor() { }

  ngOnInit() {}

}
