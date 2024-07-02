import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
} from '@angular/core';
import {
  IonBadge, IonButton, IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle, IonChip, IonContent, IonHeader, IonIcon,
  IonItem, IonLabel,
  IonList, IonSegment, IonSegmentButton, IonTitle, IonToolbar
} from "@ionic/angular/standalone";
import {NgClass, NgForOf} from "@angular/common";
import {AllCarsService} from "./all-cars.service";
import { register } from 'swiper/element/bundle';
import {CarParkDataService} from "../car-park-data.service";
import {NavController} from "@ionic/angular";
import {InRentAllSegmentComponent} from "../in-rent-all-segment/in-rent-all-segment.component";

register();
@Component({
  selector: 'all-cars',
  templateUrl: './all-cars.component.html',
  styleUrls: ['./all-cars.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    IonCard,
    IonList,
    IonItem,
    NgForOf,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonChip,
    IonIcon,
    IonLabel,
    IonBadge,
    IonButtons,
    IonButton,
    IonTitle,
    NgClass,
    IonHeader,
    IonToolbar,
    IonSegment,
    IonSegmentButton,
    IonContent,
    InRentAllSegmentComponent
  ]
})
export class AllCarsComponent  implements OnInit {

  private allCarsService: AllCarsService = inject(AllCarsService);
  private carParkDataService: CarParkDataService = inject(CarParkDataService);
  private navCtrl: NavController = inject(NavController);

  get allCarsData() {
    return this.allCarsService;
  }

  get carDataService() {
    return this.carParkDataService;
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

  chipSelected(chip: { value: string, label: string, icon: string }): void {
    this.allCarsData.selectedChip.set(chip);
  }

  setChips(): void {
    this.allCarsData.chips.set([
      { value: 'reviews', label: 'Відгуки', icon: 'heart-circle-outline' },
      { value: 'history-rent', label: 'Архів оренд', icon: 'cloud-done-outline' },
    ])
  }

  setParkRates(): void {
    this.allCarsData.setRateIcons([
      {
        name: 'car-outline',
        textClass: 'text-[#89a1c8]',
        badgeClass: 'bg-[#89a1c8]',
        badgeText: '2'
      },
      {
        name: 'checkmark-circle-outline',
        textClass: 'text-[#49a66b]',
        badgeClass: 'bg-[#2f9253]',
        badgeText: '2'
      },
      {
        name: 'heart-outline',
        textClass: 'text-[#b5b5b5]',
        badgeClass: 'bg-[#b5b5b5]',
        badgeText: '2'
      },
      {
        name: 'heart-dislike-outline',
        textClass: 'text-[#b5b5b529]',
        badgeClass: 'bg-[#b5b5b5]',
        badgeText: '2'
      },
      {
        name: 'star-half-outline',
        textClass: 'text-[#b5b5b529]',
        badgeClass: 'bg-[#3e4673]',
        badgeText: '4.3'
      }
    ])
  }
  setParkData(): void {
    this.setAllCars();
    this.setChips();
    this.setParkRates();
  }
  ngOnInit(): void {
    this.setParkData();
  }
  constructor() { }
}
