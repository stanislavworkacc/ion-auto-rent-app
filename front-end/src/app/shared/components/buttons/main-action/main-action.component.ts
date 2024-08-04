import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {IonButton, IonIcon, IonLabel} from "@ionic/angular/standalone";

@Component({
  selector: 'main-action-btn',
  templateUrl: './main-action.component.html',
  styleUrls: ['./main-action.component.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonIcon,
    IonLabel
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainActionComponent  implements OnInit {

  @Input({ required: true }) title: string;
  @Input({ required: true }) action: () => void;
  constructor() { }

  ngOnInit() {}

}
