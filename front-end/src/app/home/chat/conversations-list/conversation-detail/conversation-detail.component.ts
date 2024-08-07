import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef, ElementRef,
  inject,
  OnInit,
  signal,
  ViewChild,
  WritableSignal
} from '@angular/core';
import {
  IonAvatar, IonButton,
  IonContent, IonFooter,
  IonHeader,
  IonIcon, IonInput,
  IonItem, IonLabel,
  IonList, IonNote, IonSearchbar, IonTextarea,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";
import {ActivatedRoute, RouterOutlet} from "@angular/router";
import {BackButtonComponent} from "../../../../shared/ui-kit/components/back-button/back-button.component";
import {NavController} from "@ionic/angular";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {tap} from "rxjs";
import {JsonPipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {PreviewAttachedFilesComponent} from "./preview-attached-files/preview-attached-files.component";

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
    NgIf,
    IonFooter,
    IonInput,
    IonButton,
    IonTextarea,
    IonSearchbar,
    FormsModule,
    PreviewAttachedFilesComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConversationDetailComponent  implements OnInit {

  private navCtrl: NavController = inject(NavController);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private destroyRef: DestroyRef = inject(DestroyRef);

  conversation: WritableSignal<any> = signal(null)
  messages = [
    { sender: 'me', text: 'Hi there!', time: '10:00 AM', files: [] },
    { sender: 'them', text: 'Hello! How are you?', time: '10:01 AM', files: [] },
    { sender: 'me', text: 'I am good, thanks! How about you?', time: '10:02 AM', files: [] },
    { sender: 'them', text: 'Hello! How are you?', time: '10:01 AM', files: [] },
    { sender: 'me', text: 'I am good, thanks! How about you?', time: '10:02 AM', files: [] },
    { sender: 'me', text: 'I am good, thanks! How about you?', time: '10:02 AM', files: [] },
    { sender: 'them', text: 'Doing great, thanks for asking!', time: '10:03 AM', files: [] },
    { sender: 'them', text: 'Doing great, thanks for asking!', time: '10:03 AM', files: [] },
    { sender: 'them', text: 'Doing great, thanks for asking!', time: '10:03 AM', files: [] },
    { sender: 'them', text: 'Doing great, thanks for asking!', time: '10:03 AM', files: [] },
  ];
  groupedMessages: any[] = [];
  newMessage: string = '';
  attachedFiles: WritableSignal<File[]> = signal([]);
  attachingFile: WritableSignal<boolean> = signal(false);

  showSearchBar: WritableSignal<boolean> = signal(false)

  @ViewChild('messageInput', { static: false }) messageInput: IonTextarea;
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;

  showSearchbar(): void {
    this.showSearchBar.set(!this.showSearchBar())
  }

  sendMessage(): void {
    if (this.newMessage.trim() !== '' || this.attachedFiles.length > 0) {
      const newMsg = {
        sender: 'me',
        text: this.newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        files: [...this.attachedFiles()]
      };
      this.messages = [...this.messages, newMsg];
      this.groupMessages();
      this.newMessage = '';
      this.attachedFiles.set([]);
      setTimeout(() => {
        this.messageInput.setFocus();
      }, 0);
    }
  }

  groupMessages(): void {
    this.groupedMessages = [];
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
          messages: [{ text: message.text, time: message.time, files: message.files }],
          showAvatar: true
        };
      } else {
        currentGroup.messages.push({ text: message.text, time: message.time, files: message.files });
        currentGroup.showAvatar = true;
      }
    });

    if (currentGroup) {
      this.groupedMessages.push(currentGroup);
    }
  }

  goBack(): void {
    this.navCtrl.back()
  }

  getResolverData(): void {
    this.route.data.pipe(
      takeUntilDestroyed(this.destroyRef),
      tap((data: { conversation: any }) => this.conversation.set(data))
    ).subscribe()
  }

  triggerFileInputClick(): void {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any): void {
    this.attachingFile.set(true);
    setTimeout((): void => {
      const files = event.target.files;
      Array.from(files).forEach((file: File): void => {
        this.attachedFiles.set([...this.attachedFiles(), file])
      });
      event.target.value = '';
      this.attachingFile.set(false);
    }, 2500);
  }

  ngOnInit(): void {
    this.groupMessages()
    this.getResolverData();
  }
}
