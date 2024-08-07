import {ChangeDetectionStrategy, Component, Input, OnInit, signal, WritableSignal} from '@angular/core';
import {RentRange} from "../rent-card.enums";
import {IonAccordion, IonAccordionGroup, IonCheckbox, IonIcon, IonItem, IonLabel} from "@ionic/angular/standalone";
import {DaysRentRangeComponent} from "../days-rent-range/days-rent-range.component";
import {HourRateRangeComponent} from "../hour-rate-range/hour-rate-range.component";
import {DepositPaymentComponent} from "../deposit-payment/deposit-payment.component";
import {CarWithDriverComponent} from "../car-with-driver/car-with-driver.component";
import {AddressInfoComponent} from "../../address-info/address-info.component";
import {RentCardService} from "../rent-card.service";

@Component({
  selector: 'rent-info',
  templateUrl: './rent-info.component.html',
  styleUrls: ['./rent-info.component.scss'],
  standalone: true,
  imports: [IonAccordionGroup, IonAccordion, IonItem, IonLabel, IonIcon, IonCheckbox, DaysRentRangeComponent, HourRateRangeComponent, DepositPaymentComponent, CarWithDriverComponent, AddressInfoComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RentInfoComponent implements OnInit {
  protected readonly RentRange = RentRange;

  @Input() ranges: WritableSignal<{ label: string, value: number | null }[]> = signal([]);
  @Input() editMode: boolean;
  @Input() rentCard: RentCardService;
  @Input() onRentTypeChange: (ev) => void;
  @Input() insuranceTypeChange: (ev) => void;

  constructor() {
  }

  ngOnInit() {
  }
}
