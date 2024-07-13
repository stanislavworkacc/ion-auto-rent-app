import {ChangeDetectionStrategy, Component, Input, OnInit, signal, WritableSignal} from '@angular/core';
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'days-rent-range',
  templateUrl: './days-rent-range.component.html',
  styleUrls: ['./days-rent-range.component.scss'],
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DaysRentRangeComponent  implements OnInit {

  @Input() ranges: WritableSignal<{ label: string, value: number | null }[]> = signal([]);

  ngOnInit() {}

}
