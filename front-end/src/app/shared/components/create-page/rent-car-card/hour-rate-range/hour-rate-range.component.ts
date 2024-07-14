import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { IonInput, IonLabel} from "@ionic/angular/standalone";

@Component({
  selector: 'hour-rate-range',
  templateUrl: './hour-rate-range.component.html',
  styleUrls: ['./hour-rate-range.component.scss'],
  standalone: true,
  imports: [
    IonLabel,
    IonInput,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HourRateRangeComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
