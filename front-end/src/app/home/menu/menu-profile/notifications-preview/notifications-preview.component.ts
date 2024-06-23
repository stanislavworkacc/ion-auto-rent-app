import {ChangeDetectionStrategy, Component, inject, Input, OnInit} from '@angular/core';
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

  socialMarks = [
    {icon: 'notifications-outline', count: 3, description: 'Системні повідомлення', value: 'notifications'},
    {icon: 'chatbubbles-outline', count: 3, description: 'Вхідні повідомлення', value: 'chat'},
    {icon: 'heart-outline', count: 2, description: 'Вподобайки', value: 'likes'},
    {icon: 'heart-dislike-outline', count: 2, description: 'Дизлайки', value: 'dislikes'}
  ];

  carsMarks = [
    {icon: 'car-outline', count: 4, description: 'Транспортні засоби', value: 'car'},
    {icon: 'checkmark-circle-outline', count: 4, description: 'Здано в оренду', value: 'checkmark'}
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
