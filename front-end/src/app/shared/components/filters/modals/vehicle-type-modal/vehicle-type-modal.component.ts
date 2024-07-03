import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  Signal,
  signal,
  WritableSignal
} from '@angular/core';
import {BackButtonComponent} from "../../../../ui-kit/components/back-button/back-button.component";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon, IonItem,
  IonLabel, IonList, IonRadio, IonRadioGroup,
  IonToolbar,
  ModalController
} from "@ionic/angular/standalone";
import {CloseBtnComponent} from "../../../../ui-kit/components/close-btn/close-btn.component";
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-vehicle-type-modal',
  templateUrl: './vehicle-type-modal.component.html',
  styleUrls: ['./vehicle-type-modal.component.scss'],
  standalone: true,
  imports: [
    BackButtonComponent,
    IonButton,
    IonButtons,
    IonHeader,
    IonIcon,
    IonLabel,
    IonToolbar,
    CloseBtnComponent,
    IonContent,
    IonList,
    IonRadioGroup,
    IonItem,
    NgForOf,
    IonRadio,
    FormsModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VehicleTypeModalComponent  implements OnInit {

  private modalCtrl: ModalController = inject(ModalController);

  transportTypes: WritableSignal<{ label: string, value: string, callback: () => void }[]> = signal([
    {
      label: 'Легкові',
      value: 'cars',
      callback: (): void => {}
    },
    {
      label: 'Вантажівки',
      value: 'trucks',
      callback: (): void => {}
    },
    {
      label: 'Мотоцикл',
      value: 'motorcycles',
      callback: (): void => {}
    },
    {
      label: 'Автобуси',
      value: 'buses',
      callback: (): void => {}
    },
    {
      label: 'Спецтехніка',
      value: 'special',
      callback: (): void => {}
    },
    {
      label: 'Причепи',
      value: 'trailers',
      callback: (): void => {}
    },
  ]);

  selectedValue: WritableSignal<{ label: string, value: string, callback: () => void }> = signal(
    {
      label: 'Легкові',
      value: 'cars',
      callback: (): void => {}
    }
  )

  vehicleType: Signal<{ label: string, value: string, callback: () => void }> = computed(() => this.selectedValue())

  closeModal(): void {
    this.modalCtrl.dismiss();
  }
  ngOnInit() {}

}
