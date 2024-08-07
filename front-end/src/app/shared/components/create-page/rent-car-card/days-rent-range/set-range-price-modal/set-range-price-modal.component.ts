import {ChangeDetectionStrategy, Component, inject, Input, OnInit, signal, WritableSignal} from '@angular/core';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonLabel,
  IonText, IonTitle,
  IonToolbar,
  ModalController
} from "@ionic/angular/standalone";
import {FormsModule} from "@angular/forms";
import {RippleBtnComponent} from "../../../../buttons/ripple-btn/ripple-btn.component";

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
    IonButton,
    RippleBtnComponent,
    IonTitle
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SetRangePriceModalComponent  implements OnInit {

  private modalCtrl: ModalController = inject(ModalController);

  @Input() range: { label: string, value: number | null };
  @Input() ranges: WritableSignal<{ label: string, value: number | null }[]> = signal([]);
  private updatedRanges: WritableSignal<{ label: string, value: number | null }[]> = signal([]);
  onInputChange(val): void {
    const updatedRanges = this.ranges().map((range: { label: string, value: number | null }) => {
      if (range.label === this.range.label) {
        return { ...range, value: val };
      }
      return range;
    });

    this.updatedRanges.set(updatedRanges);
  }

  onSubmit(): void {
    this.modalCtrl.dismiss({ updatedRanges: this.updatedRanges() })
  }
  ngOnInit() {}

}
