import {ChangeDetectionStrategy, Component, Input, OnInit, signal, WritableSignal} from '@angular/core';
import {IonButton, IonContent, IonHeader, IonInput, IonLabel, IonText, IonToolbar} from "@ionic/angular/standalone";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-set-range-price-modal',
  templateUrl: './set-range-price-modal.component.html',
  styleUrls: ['./set-range-price-modal.component.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonContent,
    IonLabel,
    IonText,
    IonInput,
    FormsModule,
    IonButton
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SetRangePriceModalComponent  implements OnInit {

  @Input() range: { label: string, value: number | null };
  @Input() ranges: WritableSignal<{ label: string, value: number | null }[]> = signal([]);
  onInputChange(val) {
    const updatedRanges = this.ranges().map((range: { label: string, value: number | null }) => {
      if (range.label === this.range.label) {
        return { ...range, value: val };
      }
      return range;
    });

    this.ranges.set(updatedRanges);
  }

  ngOnInit() {}

}
