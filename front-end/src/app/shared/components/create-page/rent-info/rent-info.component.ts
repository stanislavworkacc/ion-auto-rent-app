import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  Signal,
  signal,
  WritableSignal
} from '@angular/core';
import {AdditionalOptionsComponent} from "../additional-options/additional-options.component";
import {AddressInfoComponent} from "../address-info/address-info.component";
import {BackButtonComponent} from "../../../ui-kit/components/back-button/back-button.component";
import {ImagesInfoComponent} from "../images-info/images-info.component";
import {
  IonActionSheet,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel, IonToolbar
} from "@ionic/angular/standalone";
import {MainInfoComponent} from "../main-info/main-info.component";
import {RippleBtnComponent} from "../../buttons/ripple-btn/ripple-btn.component";
import {TechnicalCharacteristicsComponent} from "../technical-characteristics/technical-characteristics.component";
import {NavController} from "@ionic/angular";
import {RentCarCardComponent} from "../rent-car-card/rent-car-card.component";

@Component({
  selector: 'app-rent-info',
  templateUrl: './rent-info.component.html',
  styleUrls: ['./rent-info.component.scss'],
  standalone: true,
  imports: [
    AdditionalOptionsComponent,
    AddressInfoComponent,
    BackButtonComponent,
    ImagesInfoComponent,
    IonActionSheet,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonLabel,
    IonToolbar,
    MainInfoComponent,
    RippleBtnComponent,
    TechnicalCharacteristicsComponent,
    RentCarCardComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RentInfoComponent  implements OnInit {

  private navCtrl: NavController = inject(NavController);

  public isFormReset: WritableSignal<boolean> = signal(false);
  public rentInfoRanges: WritableSignal<{ label: string, value: number | null }[]> = signal([
    { label: '1-2', value: null },
    { label: '3-7', value: null },
    { label: '8+', value: null },
    { label: '30+', value: null }
  ]);
  public daysRentRanges: Signal<{ label: string, value: number | null }[]> = computed(() => this.rentInfoRanges());

  goBack() {
    this.navCtrl.back()
  }

  ngOnInit() {}
  constructor() { }
}
