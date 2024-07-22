import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'top-card-list',
  templateUrl: './top-card-list.component.html',
  styleUrls: ['./top-card-list.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopCardListComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
