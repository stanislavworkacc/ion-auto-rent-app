import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'card-list-filters',
  templateUrl: './card-list-filters.component.html',
  styleUrls: ['./card-list-filters.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardListFiltersComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
