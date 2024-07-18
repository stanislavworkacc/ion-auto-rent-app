import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {
  IonAvatar,
  IonIcon,
  IonItem, IonItemOption,
  IonItemOptions, IonItemSliding,
  IonLabel,
  IonList,
  IonNote,
  IonSearchbar, ModalController
} from "@ionic/angular/standalone";
import {NgForOf} from "@angular/common";
import {ActionSheetController, NavController} from "@ionic/angular";
import {OptionsItemListComponent} from "./options-item-list/options-item-list.component";
import {Router} from "@angular/router";

@Component({
  selector: 'conversations-list',
  templateUrl: './conversations-list.component.html',
  styleUrls: ['./conversations-list.component.scss'],
  standalone: true,
  imports: [
    IonList,
    IonItem,
    NgForOf,
    IonAvatar,
    IonIcon,
    IonLabel,
    IonNote,
    IonSearchbar,
    IonItemOptions,
    IonItemOption,
    IonItemSliding,
    OptionsItemListComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConversationsListComponent  implements OnInit {

  private actionSheetCtrl: ActionSheetController = inject(ActionSheetController);
  private router: Router = inject(Router);

  conversations = [
    { id: 1, person: 'John Doe', date: '2024-07-18', message: 'Hey, how are you?' },
    { id: 2, person: 'Jane Smith', date: '2024-07-17', message: 'Let’s catch up!' },
    { id: 3, person: 'Bob Johnson', date: '2024-07-16', message: 'Meeting at 3 PM?' },
    { id: 4, person: 'Alice Brown', date: '2024-07-15', message: 'Can you send the files?' },
    { id: 5, person: 'Tom Clark', date: '2024-07-14', message: 'Happy Birthday!' },

  ];
  constructor() { }

  ngOnInit() {}

  openConversation(conversation) {
    this.router.navigate([`/home/chat/${ conversation.id }`])
  }

  async deleteConversation(): Promise<void> {
    const actionSheet: HTMLIonActionSheetElement = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Видалити',
          handler: () => {

          }
        },
        {
          text: 'Скасувати',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();
  }

}
