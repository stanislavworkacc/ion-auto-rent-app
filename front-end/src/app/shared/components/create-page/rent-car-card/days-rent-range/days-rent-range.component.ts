import {ChangeDetectionStrategy, Component, inject, Input, OnInit, signal, WritableSignal} from '@angular/core';
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {SetRangePriceModalComponent} from "./set-range-price-modal/set-range-price-modal.component";
import {SelectModalComponent} from "../../../filters/modals/select-modal/select-modal.component";
import {ModalController} from "@ionic/angular/standalone";

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

  private modalCtrl: ModalController = inject(ModalController);

  async setRangePrice(range): Promise<void> {
    const modal: HTMLIonModalElement = await this.modalCtrl.create({
      component: SetRangePriceModalComponent,
      cssClass: 'auth-modal',
      initialBreakpoint: 0.5,
      breakpoints: [0, 0.5],
      componentProps: {
        ranges: this.ranges,
        range,
      }
    });

    await modal.present();

    await modal.onWillDismiss().then((res) => {
      if(res.data.updatedRanges) {
        this.ranges.set(res.data.updatedRanges);
      }
    })
  }
  ngOnInit() {}

}
