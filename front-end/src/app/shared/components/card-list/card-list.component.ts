import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {RentCarCardComponent} from "../create-page/rent-car-card/rent-car-card.component";

@Component({
  selector: 'card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
  standalone: true,
  imports: [
    RentCarCardComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardListComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
