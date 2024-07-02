import {ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit} from '@angular/core';
import {IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem} from "@ionic/angular/standalone";
import {AllCarsService} from "../all-cars.service";
import {NgFor} from "@angular/common";

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss'],
  standalone: true,
  imports: [
    IonItem,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    NgFor
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarListComponent  implements OnInit {

  private allCarsService: AllCarsService = inject(AllCarsService);
  get allCarsData() {
    return this.allCarsService;
  }

  setAllCars(): void {
    this.allCarsData.setAllCars([
      {
        title: 'Card Title 1',
        subtitle: 'Card Subtitle 1',
        content: 'Here\'s a small text description for the card content. Nothing more, nothing less.',
        images: [
          'https://swiperjs.com/demos/images/nature-1.jpg',
          'https://swiperjs.com/demos/images/nature-2.jpg',
          'https://swiperjs.com/demos/images/nature-3.jpg',
          'https://swiperjs.com/demos/images/nature-4.jpg'
        ]
      },
      {
        title: 'Card Title 2',
        subtitle: 'Card Subtitle 2',
        content: 'Here\'s a small text description for the card content. Nothing more, nothing less.',
        images: [
          'https://swiperjs.com/demos/images/nature-1.jpg',
          'https://swiperjs.com/demos/images/nature-2.jpg',
          'https://swiperjs.com/demos/images/nature-3.jpg',
          'https://swiperjs.com/demos/images/nature-4.jpg'
        ]
      },
      {
        title: 'Card Title 3',
        subtitle: 'Card Subtitle 3',
        content: 'Here\'s a small text description for the card content. Nothing more, nothing less.',
        images: [
          'https://swiperjs.com/demos/images/nature-1.jpg',
          'https://swiperjs.com/demos/images/nature-2.jpg',
          'https://swiperjs.com/demos/images/nature-3.jpg',
          'https://swiperjs.com/demos/images/nature-4.jpg'
        ]
      },
      {
        title: 'Card Title 4',
        subtitle: 'Card Subtitle 4',
        content: 'Here\'s a small text description for the card content. Nothing more, nothing less.',
        images: [
          'https://swiperjs.com/demos/images/nature-1.jpg',
          'https://swiperjs.com/demos/images/nature-2.jpg',
          'https://swiperjs.com/demos/images/nature-3.jpg',
          'https://swiperjs.com/demos/images/nature-4.jpg'
        ]
      }
    ]);

  }
  constructor() { }

  ngOnInit(): void {
    this.setAllCars();
  }

}
