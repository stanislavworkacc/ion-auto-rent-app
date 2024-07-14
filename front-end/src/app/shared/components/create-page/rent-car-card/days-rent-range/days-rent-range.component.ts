import {ChangeDetectionStrategy, Component, inject, Input, OnInit, signal, WritableSignal} from '@angular/core';
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {SetRangePriceModalComponent} from "./set-range-price-modal/set-range-price-modal.component";
import {AlertController, IonAlert, ModalController} from "@ionic/angular/standalone";
import {ThousandSeparatorPipe} from "../../../../pipes/thousand.pipe";

@Component({
  selector: 'days-rent-range',
  templateUrl: './days-rent-range.component.html',
  styleUrls: ['./days-rent-range.component.scss'],
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    ThousandSeparatorPipe,
    IonAlert,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DaysRentRangeComponent  implements OnInit {

  @Input() ranges: WritableSignal<{ label: string, value: number | null }[]> = signal([]);

  private modalCtrl: ModalController = inject(ModalController);
  private alertCtrl: AlertController = inject(AlertController);

  private isAlertShown = false;

  async setRangePrice(range): Promise<void> {
    if (!this.isAlertShown) {
      const alert = await this.priceAlert();

      alert.onWillDismiss().then(async () => {
        this.isAlertShown = true;
        await this.showModal(range);
      });
    } else {
      await this.showModal(range);
    }
  }

  async showModal(range): Promise<void> {
    const modal = await this.modalCtrl.create({
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

    const { data } = await modal.onWillDismiss();
    if (data && data.updatedRanges) {
      this.ranges.set(data.updatedRanges)
    }
  }

  async priceAlert(): Promise<HTMLIonAlertElement> {
    const alert = await this.alertCtrl.create({
      header: 'Ціни оренди',
      message: 'Вкажіть ціну за один день оренди в межах зазначених періодів, враховуючи поточний попит та тенденції на ринку. Орендарі мають змогу обрати відповідний період оренди згідно з їхніми потребами та сценаріями використання.',
      buttons: ['Більше не показувати', 'Зрозуміло']
    });

    await alert.present();
    return alert;
  }
  ngOnInit() {}

}
