import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {IonAvatar, IonIcon, IonItem, IonLabel, IonList, IonNote} from "@ionic/angular/standalone";
import {NgForOf} from "@angular/common";

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
    IonNote
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConversationsListComponent  implements OnInit {

  conversations = [
    { id: 1, person: 'John Doe', date: '2024-07-18', message: 'Hey, how are you?' },
    { id: 2, person: 'Jane Smith', date: '2024-07-17', message: 'Let’s catch up!' },
    { id: 3, person: 'Bob Johnson', date: '2024-07-16', message: 'Meeting at 3 PM?' },
    { id: 4, person: 'Alice Brown', date: '2024-07-15', message: 'Can you send the files?' },
    { id: 5, person: 'Tom Clark', date: '2024-07-14', message: 'Happy Birthday!' },
    { id: 5, person: 'Tom Clark', date: '2024-07-14', message: 'Happy Birthday!' },
    { id: 6, person: 'Tom Clark', date: '2024-07-14', message: 'Happy Birthday!' },
    { id: 7, person: 'Tom Clark', date: '2024-07-14', message: 'Happy Birthday!' },
    { id: 8, person: 'Tom Clark', date: '2024-07-14', message: 'Happy Birthday!' },
    { id: 9, person: 'Tom Clark', date: '2024-07-14', message: 'Happy Birthday!' },
    { id: 10, person: 'Tom Clark', date: '2024-07-14', message: 'Happy Birthday!' },
    { id: 11, person: 'Tom Clark', date: '2024-07-14', message: 'Happy Birthday!' },
    { id: 12, person: 'Tom Clark', date: '2024-07-14', message: 'Happy Birthday!' },
    { id: 13, person: 'Tom Clark', date: '2024-07-14', message: 'Happy Birthday!' },
    { id: 14, person: 'Tom Clark', date: '2024-07-14', message: 'Happy Birthday!' },
    { id: 15, person: 'Tom Clark', date: '2024-07-14', message: 'Happy Birthday!' },
    { id: 16, person: 'Tom Clark', date: '2024-07-14', message: 'Happy Birthday!' },
    { id: 17, person: 'Tom Clark', date: '2024-07-14', message: 'Happy Birthday!' },
    { id: 18, person: 'Tom Clark', date: '2024-07-14', message: 'Happy Birthday!' },
    { id: 19, person: 'Tom Clark', date: '2024-07-14', message: 'Happy Birthday!' },
    { id: 20, person: 'Tom Clark', date: '2024-07-14', message: 'Happy Birthday!' },
    { id: 21, person: 'Tom Clark', date: '2024-07-14', message: 'Happy Birthday!' },
  ];
  constructor() { }

  ngOnInit() {}

}
