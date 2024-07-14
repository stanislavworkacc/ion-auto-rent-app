import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'hour-rate-range',
  templateUrl: './hour-rate-range.component.html',
  styleUrls: ['./hour-rate-range.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HourRateRangeComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
