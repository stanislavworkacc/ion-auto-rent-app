import {
  ChangeDetectionStrategy,
  Component,
  inject, Input,
  OnInit,
  signal,
  WritableSignal
} from '@angular/core';
import {
  IonButtons,
  IonContent,
  IonHeader, IonItem,
  IonLabel,
  IonList, IonRadio, IonRadioGroup, IonSearchbar,
  IonToolbar,
  ModalController
} from "@ionic/angular/standalone";
import {CloseBtnComponent} from "../../../../ui-kit/components/close-btn/close-btn.component";
import {Platform} from "@ionic/angular";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-select-modal',
  templateUrl: './select-modal.component.html',
  styleUrls: ['./select-modal.component.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonButtons,
    CloseBtnComponent,
    IonLabel,
    IonContent,
    IonList,
    IonRadioGroup,
    IonItem,
    IonRadio,
    IonSearchbar,
    FormsModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectModalComponent  implements OnInit {

  private modalCtrl: ModalController = inject(ModalController);
  public platform: Platform = inject(Platform);

  @Input({ required: true }) withSearch: boolean = false;
  @Input({ required: true }) title: string = '';
  @Input({ required: true }) items: WritableSignal<any>;
  @Input({ required: true }) selectedValue: WritableSignal<any>;

  tempSelection: WritableSignal<any> = signal({});

  closeModal(): void {
    this.modalCtrl.dismiss();
  }

  onSelectChange(value): void {
    this.tempSelection.set(value);
  }

  submitSelection(): void {
    this.selectedValue.set(this.tempSelection());
    this.closeModal();
  }
  ngOnInit() {

  }
}
