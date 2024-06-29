import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {IonBadge, IonButton, IonButtons, IonIcon, IonLabel} from "@ionic/angular/standalone";

@Component({
  selector: 'app-header-parks',
  templateUrl: './header-parks.component.html',
  styleUrls: ['./header-parks.component.scss'],
  standalone: true,
  imports: [
    IonBadge,
    IonIcon,
    IonLabel,
    IonButton,
    IonButtons
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderParksComponent  implements OnInit {

  @Input() create: () => void
  constructor() { }

  ngOnInit() {}

}
