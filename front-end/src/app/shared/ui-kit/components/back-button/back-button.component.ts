import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {IonButton, IonIcon} from "@ionic/angular/standalone";

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonIcon
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BackButtonComponent  implements OnInit {

  @Input() navigateBack!: () => void;
  constructor() { }

  ngOnInit() {}

}
