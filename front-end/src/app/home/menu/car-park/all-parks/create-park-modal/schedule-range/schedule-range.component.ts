import {ChangeDetectionStrategy, Component, Input, OnInit, signal, WritableSignal} from '@angular/core';
import {
  IonButton,
  IonButtons, IonCheckbox,
  IonContent,
  IonDatetime,
  IonDatetimeButton, IonFooter,
  IonHeader,
  IonLabel,
  IonModal, IonRadio, IonText,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";
import {JsonPipe} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'schedule-range',
  templateUrl: './schedule-range.component.html',
  styleUrls: ['./schedule-range.component.scss'],
  standalone: true,
  imports: [
    IonDatetime,
    IonDatetimeButton,
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonLabel,
    IonContent,
    IonFooter,
    IonButtons,
    IonButton,
    IonText,
    IonRadio,
    IonCheckbox,
    JsonPipe,
    ReactiveFormsModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleRangeComponent implements OnInit {

  @Input() control: FormGroup;
  @Input() disable: boolean;

  onSchedulerChange(ev, range): void {
    switch (range) {
      case 'open':
        this.control.get('open').setValue(ev);
        break;
      case 'close':
        this.control.get('close').setValue(ev);
        break;
    }
  }

  constructor() {
  }

  ngOnInit() {
  }

}
