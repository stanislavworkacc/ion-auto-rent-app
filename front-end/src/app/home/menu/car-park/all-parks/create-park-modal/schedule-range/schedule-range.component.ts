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
    IonCheckbox
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleRangeComponent  implements OnInit {

  @Input({ required: false }) parkScheduler: WritableSignal<{ open: string, close: string }> = signal({ open: '08:00', close: '18:00' });
  constructor() { }

  ngOnInit() {}

}
