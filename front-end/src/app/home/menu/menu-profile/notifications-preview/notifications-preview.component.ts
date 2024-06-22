import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {IonButton, IonIcon} from "@ionic/angular/standalone";

@Component({
  selector: 'notifications-preview',
  templateUrl: './notifications-preview.component.html',
  styleUrls: ['./notifications-preview.component.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonIcon
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationsPreviewComponent implements OnInit {

  @Input() styles: string;

  constructor() {
  }

  ngOnInit() {
  }

}
