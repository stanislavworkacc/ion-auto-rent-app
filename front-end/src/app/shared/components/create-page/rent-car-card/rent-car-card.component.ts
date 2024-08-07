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
import {JsonPipe, NgIf} from "@angular/common";
import {INSURANCE_TYPE, RentRange} from "./rent-card.enums";
import {AddressInfoComponent} from "../address-info/address-info.component";
import {CardSliderComponent} from "./card-slider/card-slider.component";
import {CarContractComponent} from "./car-contract/car-contract.component";
import {RippleBtnComponent} from "../../buttons/ripple-btn/ripple-btn.component";
import {GeneratedPdfComponent} from "./generated-pdf/generated-pdf.component";
import {RentCardService} from "./rent-card.service";
import {RentInfoComponent} from "./rent-info/rent-info.component";
import {SideInfoTileComponent} from "./side-info-tile/side-info-tile.component";

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
    AddressInfoComponent,
    CardSliderComponent,
    CarContractComponent,
    RippleBtnComponent,
    GeneratedPdfComponent,
    JsonPipe,
    RentInfoComponent,
    SideInfoTileComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RentCarCardComponent implements OnInit {

  private rentCardService: RentCardService = inject(RentCardService);
  public platform: Platform = inject(Platform);

  @Input() ranges: WritableSignal<{ label: string, value: number | null }[]> = signal([]);
  @Input() editMode: boolean;

  @ViewChild('accordionGroup', {static: true}) accordionGroup: IonAccordionGroup;

  get rentCard() {
    return this.rentCardService;
  }

  onRentTypeChange(selectedType: string): void {
    this.rentCard.onRentTypeChange(selectedType);
  }

  insuranceTypeChange(selectedType: string): void {
    this.rentCard.insuranceTypeChange(selectedType);
  }

  toggleAccordion = (): void => {
    this.rentCard.toggleAccordion(this.accordionGroup)
  };

  generateCarContract(): void {
    this.rentCard.generateCarContract()
  }

  async openPdf(): Promise<void> {
    await this.rentCard.openPdf();
  }

  ngOnInit() {
  }
}
