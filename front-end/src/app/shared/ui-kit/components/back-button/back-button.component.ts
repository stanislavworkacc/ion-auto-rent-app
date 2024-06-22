import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {IonButton, IonIcon, IonLabel, IonText, IonTitle} from "@ionic/angular/standalone";
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonIcon,
    IonText,
    IonTitle,
    IonLabel
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BackButtonComponent implements OnInit {

  @Input() navigateBack!: () => void;
  @Input() styles: string;

  constructor() {
  }

  ngOnInit() {
  }

}
