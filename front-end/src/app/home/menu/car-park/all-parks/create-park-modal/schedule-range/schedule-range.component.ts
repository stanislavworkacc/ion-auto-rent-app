import {ChangeDetectionStrategy, Component, Input, OnInit, signal, WritableSignal} from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonDatetimeButton, IonFooter,
  IonHeader,
  IonLabel,
  IonModal, IonText,
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
    IonText
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleRangeComponent  implements OnInit {

  @Input({ required: false }) parkScheduler: WritableSignal<{ open: string, close: string }> = signal({ open: '08:00', close: '18:00' });
  constructor() { }

  ngOnInit() {}

}
