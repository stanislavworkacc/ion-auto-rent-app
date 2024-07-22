import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'search-history',
  templateUrl: './search-history.component.html',
  styleUrls: ['./search-history.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchHistoryComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
