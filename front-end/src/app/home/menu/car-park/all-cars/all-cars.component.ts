import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonItem,
  IonList
} from "@ionic/angular/standalone";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'all-cars',
  templateUrl: './all-cars.component.html',
  styleUrls: ['./all-cars.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonCard,
    IonList,
    IonItem,
    NgForOf,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent
  ]
})
export class AllCarsComponent  implements OnInit {

  cards = [
    { title: 'Card Title 1', subtitle: 'Card Subtitle 1', content: 'Here\'s a small text description for the card content. Nothing more, nothing less.', img: 'https://ionicframework.com/docs/img/demos/card-media.png' },
    { title: 'Card Title 2', subtitle: 'Card Subtitle 2', content: 'Here\'s a small text description for the card content. Nothing more, nothing less.', img: 'https://ionicframework.com/docs/img/demos/card-media.png' },
    { title: 'Card Title 3', subtitle: 'Card Subtitle 3', content: 'Here\'s a small text description for the card content. Nothing more, nothing less.', img: 'https://ionicframework.com/docs/img/demos/card-media.png' },
    { title: 'Card Title 4', subtitle: 'Card Subtitle 4', content: 'Here\'s a small text description for the card content. Nothing more, nothing less.', img: 'https://ionicframework.com/docs/img/demos/card-media.png' }
  ];

  ngOnInit() {}
  constructor() { }
}
