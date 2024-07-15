import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
  signal,
  ViewChild,
  WritableSignal
} from '@angular/core';
import {
  IonAccordion, IonAccordionGroup,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle, IonCheckbox,
  IonIcon, IonItem, IonLabel
} from "@ionic/angular/standalone";
import {BookmarkRateComponent} from "./bookmark-rate/bookmark-rate.component";
import {DaysRentRangeComponent} from "./days-rent-range/days-rent-range.component";
import {SwitcherComponent} from "../../../ui-kit/components/switcher/switcher.component";
import {DepositPaymentComponent} from "./deposit-payment/deposit-payment.component";
import {CarWithDriverComponent} from "./car-with-driver/car-with-driver.component";
import {Platform} from "@ionic/angular";
import {HourRateRangeComponent} from "./hour-rate-range/hour-rate-range.component";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {INSURANCE_TYPE, RentRange} from "./rent-card.enums";
import {AddressInfoComponent} from "../address-info/address-info.component";

@Component({
  selector: 'rent-car-card',
  templateUrl: './rent-car-card.component.html',
  styleUrls: ['./rent-car-card.component.scss'],
  standalone: true,
  imports: [
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonIcon,
    BookmarkRateComponent,
    IonAccordion,
    IonAccordionGroup,
    IonItem,
    IonLabel,
    DaysRentRangeComponent,
    SwitcherComponent,
    DepositPaymentComponent,
    CarWithDriverComponent,
    HourRateRangeComponent,
    FormsModule,
    NgIf,
    IonCheckbox,
    AddressInfoComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RentCarCardComponent  implements OnInit {

  public platform: Platform = inject(Platform);

  @Input() ranges: WritableSignal<{ label: string, value: number | null }[]> = signal([]);

  @ViewChild('accordionGroup', { static: true }) accordionGroup: IonAccordionGroup;

  isCharacteristicsAccordionOpen: WritableSignal<boolean> = signal(false);

  public rentTypes: WritableSignal<{ value: string, label: string, checked: boolean }[]> = signal([
    { label: 'за день', value: RentRange.DAYS, checked: true },
    { label: 'погодинно', value: RentRange.HOURS, checked: false },
  ]);
  public selectedRentType: WritableSignal<string> = signal(RentRange.DAYS);

  public insuranceTypes: WritableSignal<{ value: string, label: string, checked: boolean }[]> = signal([
    { label: 'Поліс ОСЦПВ', value: INSURANCE_TYPE.OSCPV, checked: false },
    { label: 'КАСКО', value: INSURANCE_TYPE.KASKO, checked: false },
  ]);
  public insuranceType: WritableSignal<string> = signal(null);


  onRentTypeChange(selectedType: string): void {
    const updatedRentTypes = this.rentTypes().map(type => {
      return { ...type, checked: type.value === selectedType };
    });

    this.rentTypes.set(updatedRentTypes);
    this.selectedRentType.set(selectedType)
  }

  insuranceTypeChange(selectedType: string): void {
    const updatedInsuranceTypes = this.insuranceTypes().map(type => {
      return { ...type, checked: type.value === selectedType };
    });

    this.insuranceTypes.set(updatedInsuranceTypes);
    this.insuranceType.set(selectedType)
  }

  toggleAccordion = (): void => {
    this.isCharacteristicsAccordionOpen.set(!this.isCharacteristicsAccordionOpen())
    const nativeEl: IonAccordionGroup = this.accordionGroup;
    if (nativeEl.value === 'characteristics') {
      nativeEl.value = undefined;
    } else {
      nativeEl.value = 'characteristics';
    }
  };
  ngOnInit() {}

  RentRange = RentRange;
}
