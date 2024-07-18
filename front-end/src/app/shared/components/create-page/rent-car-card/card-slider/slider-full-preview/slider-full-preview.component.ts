import {ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  ModalController
} from "@ionic/angular/standalone";

@Component({
  selector: 'slider-full-preview',
  templateUrl: './slider-full-preview.component.html',
  styleUrls: ['./slider-full-preview.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton
  ]
})
export class SliderFullPreviewComponent  implements OnInit {

  private modalCtrl: ModalController = inject(ModalController);

  closeModal() {
    this.modalCtrl.dismiss();
  }

  ngOnInit() {}

}
