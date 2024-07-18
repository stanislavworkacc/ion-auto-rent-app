import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {
  IonAvatar,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem, IonLabel,
  IonList, IonNote,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";
import {ActivatedRoute, RouterOutlet} from "@angular/router";
import {BackButtonComponent} from "../../../../shared/ui-kit/components/back-button/back-button.component";
import {NavController} from "@ionic/angular";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {tap} from "rxjs";
import {JsonPipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-conversation-detail',
  templateUrl: './conversation-detail.component.html',
  styleUrls: ['./conversation-detail.component.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonIcon,
    IonTitle,
    IonToolbar,
    RouterOutlet,
    BackButtonComponent,
    JsonPipe,
    IonList,
    IonItem,
    IonAvatar,
    IonLabel,
    IonNote,
    NgForOf,
    NgIf
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConversationDetailComponent  implements OnInit {

  private navCtrl: NavController = inject(NavController);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private destroyRef: DestroyRef = inject(DestroyRef);

  conversation: WritableSignal<any> = signal(null)
  messages = [
    { sender: 'me', text: 'Hi there!', time: '10:00 AM' },
    { sender: 'them', text: 'Hello! How are you?', time: '10:01 AM' },
    { sender: 'me', text: 'I am good, thanks! How about you?', time: '10:02 AM' },
    { sender: 'me', text: 'I am good, thanks! How about you?', time: '10:02 AM' },
    { sender: 'me', text: 'I am good, thanks! How about you?', time: '10:02 AM' },
    { sender: 'them', text: 'Doing great, thanks for asking!', time: '10:03 AM' },
    { sender: 'them', text: 'Doing great, thanks for asking!', time: '10:03 AM' }
  ];

  groupedMessages: any[] = [];

  groupMessages() {
    let currentSender = null;
    let currentGroup = null;

    this.messages.forEach(message => {
      if (message.sender !== currentSender) {
        if (currentGroup) {
          this.groupedMessages.push(currentGroup);
        }
        currentSender = message.sender;
        currentGroup = {
          sender: message.sender,
          messages: [{ text: message.text, time: message.time }],
          showAvatar: true
        };
      } else {
        currentGroup.messages.push({ text: message.text, time: message.time });
        currentGroup.showAvatar = false;
      }
    });

    if (currentGroup) {
      this.groupedMessages.push(currentGroup);
    }
  }
  constructor() { }

  goBack(): void {
    this.navCtrl.back()
  }

  getResolverData(): void {
    this.route.data.pipe(
      takeUntilDestroyed(this.destroyRef),
      tap((data: { conversation: any }) => this.conversation.set(data))
    ).subscribe()
  }
  ngOnInit(): void {
    this.groupMessages()
    this.getResolverData();
  }

}
