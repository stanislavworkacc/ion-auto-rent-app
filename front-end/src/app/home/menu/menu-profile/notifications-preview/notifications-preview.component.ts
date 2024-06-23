import {
  ChangeDetectionStrategy,
  Component,
  inject, input,
  Input,
  InputSignal,
  OnInit,
  signal,
  WritableSignal
} from '@angular/core';
import {
  IonButton, IonButtons,
  IonContent,
  IonIcon,
  IonItem,
  IonList,
  IonPopover,
  PopoverController
} from "@ionic/angular/standalone";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'notifications-preview',
  templateUrl: './notifications-preview.component.html',
  styleUrls: ['./notifications-preview.component.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonIcon,
    NgForOf,
    IonContent,
    IonItem,
    IonList,
    IonPopover,
    IonButtons
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationsPreviewComponent implements OnInit {

  @Input() styles: string;

  socialMarks: InputSignal<{
    icon: string,
    count: number,
    description: string,
    value: string
  }[]> = input([]);

  carsMarks: InputSignal<{
    icon: string,
    count: number,
    description: string,
    value: string
  }[]> = input([]);

  constructor() {
  }

  ngOnInit() {
  }

}
