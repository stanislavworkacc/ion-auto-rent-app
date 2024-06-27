import {ChangeDetectionStrategy, Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle, IonChip, IonIcon,
  IonItem, IonLabel,
  IonList
} from "@ionic/angular/standalone";
import {NgForOf} from "@angular/common";
import {AllCarsService} from "./all-cars.service";

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
    IonCardContent,
    IonChip,
    IonIcon,
    IonLabel
  ]
})
export class AllCarsComponent  implements OnInit {

  private allCarsService: AllCarsService = inject(AllCarsService);

  get allCarsData() {
    return this.allCarsService;
  }
  setAllCars(): void {
    this.allCarsData.setAllCars([
      { title: 'Card Title 1', subtitle: 'Card Subtitle 1', content: 'Here\'s a small text description for the card content. Nothing more, nothing less.', img: 'https://ionicframework.com/docs/img/demos/card-media.png' },
      { title: 'Card Title 2', subtitle: 'Card Subtitle 2', content: 'Here\'s a small text description for the card content. Nothing more, nothing less.', img: 'https://ionicframework.com/docs/img/demos/card-media.png' },
      { title: 'Card Title 3', subtitle: 'Card Subtitle 3', content: 'Here\'s a small text description for the card content. Nothing more, nothing less.', img: 'https://ionicframework.com/docs/img/demos/card-media.png' },
      { title: 'Card Title 4', subtitle: 'Card Subtitle 4', content: 'Here\'s a small text description for the card content. Nothing more, nothing less.', img: 'https://ionicframework.com/docs/img/demos/card-media.png' }
    ])
  }

  chipSelected(chip: { value: string, label: string, icon: string }): void {
    this.allCarsData.selectedChip.set(chip);
  }

  setChips(): void {
    this.allCarsData.chips.set([
      { value: 'create', label: 'Додати', icon: 'add-circle-outline' },
      { value: 'history-rent', label: 'Історія оренд', icon: 'cloud-done-outline' }
    ])
  }
  ngOnInit(): void {
    this.setAllCars();
    this.setChips();
  }
  constructor() { }
}
