import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'bookmark-rate',
  templateUrl: './bookmark-rate.component.html',
  styleUrls: ['./bookmark-rate.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookmarkRateComponent  implements OnInit {

  @Input({ required: true }) rate: string;
  constructor() { }

  ngOnInit() {}

}
