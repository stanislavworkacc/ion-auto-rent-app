import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {IonContent, IonHeader, IonIcon, IonSearchbar, IonTitle, IonToolbar} from "@ionic/angular/standalone";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonContent,
    IonTitle,
    IonSearchbar,
    IonIcon
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
