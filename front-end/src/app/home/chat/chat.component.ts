import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonRouterOutlet,
  IonSearchbar,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";
import {ConversationsListComponent} from "./conversations-list/conversations-list.component";
import {RouterOutlet} from "@angular/router";

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
    IonIcon,
    ConversationsListComponent,
    IonRouterOutlet,
    RouterOutlet
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
