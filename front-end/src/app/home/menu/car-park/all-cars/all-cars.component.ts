import {
  ChangeDetectionStrategy,
  Component,
  effect,
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
  IonList, IonSegment, IonSegmentButton, IonTitle, IonToolbar, ModalController
} from "@ionic/angular/standalone";
import {NgClass, NgForOf} from "@angular/common";
import {AllCarsService} from "./all-cars.service";
import { register } from 'swiper/element/bundle';
import {CarParkDataService} from "../car-park-data.service";
import {NavController, Platform} from "@ionic/angular";
import {InRentAllSegmentComponent} from "../in-rent-all-segment/in-rent-all-segment.component";
import {RouterOutlet} from "@angular/router";
import {AllCarsChip, AllCarsSegment} from "./all-cars.enums";

register();
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
    InRentAllSegmentComponent,
    RouterOutlet
  ]
})
export class AllCarsComponent  implements OnInit {

  private allCarsService: AllCarsService = inject(AllCarsService);
  private carParkDataService: CarParkDataService = inject(CarParkDataService);
  private navCtrl: NavController = inject(NavController);

  public AllCarsChip = AllCarsChip;

  get allCarsData() {
    return this.allCarsService;
  }

  get carDataService() {
    return this.carParkDataService;
  }

  setChips(): void {
    this.allCarsData.chips.set([
      { value: AllCarsChip.INFO, label: 'Деталі', icon: '/assets/icon/detail-car-icon.png' },
      { value: AllCarsChip.REVIEWS, label: 'Відгуки', icon: '/assets/icon/reviews-ico.png' },
      { value: AllCarsChip.RENT_ARCHIVE, label: 'Архів оренд', icon: '/assets/icon/archive-ico.png' },
    ])
  }

  chipSelected(chip: { value: string, label: string, icon: string }): void {
    this.allCarsData.selectedChip.set(chip);
    this.navCtrl.navigateForward([`/home/menu/car-park/all-cars/${ chip.value }`])
  }

  closeSelectedChip(ev): void {
    ev.preventDefault();
    ev.stopPropagation();
    this.navCtrl.navigateForward(['/home/menu/car-park/all-cars/cars']);
    this.allCarsData.selectedChip.set(null)
  }

  handleBreadCrubms(): void {
    this.carDataService.routes.set(['/home', '/home/menu/car-park', '/home/menu/car-park/all-cars']);
    this.carDataService.newRoutes.set([ { url: '/home/menu/car-park', label: 'Автопарки' } ])
  }

  setParkData(): void {
    this.setChips();
  }

  async vehicleCreation(): Promise<void> {
    this.navCtrl.navigateForward(['/home/create'])
  }

  ngOnInit(): void {
    this.setParkData();
    this.handleBreadCrubms();
  }
  constructor() {

    effect((): void => {
      if (this.carDataService.selectedSegment() === AllCarsSegment.ALL_CARS) {
        this.navCtrl.navigateForward(['/home/menu/car-park/all-cars/cars'])
      }
    });
  }
}
