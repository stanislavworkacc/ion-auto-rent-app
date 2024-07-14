import {ChangeDetectionStrategy, Component, Input, OnInit, signal, ViewChild, WritableSignal} from '@angular/core';
import {
  IonAccordion, IonAccordionGroup,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon, IonItem, IonLabel
} from "@ionic/angular/standalone";
import {BookmarkRateComponent} from "./bookmark-rate/bookmark-rate.component";
import {DaysRentRangeComponent} from "./days-rent-range/days-rent-range.component";
import {SwitcherComponent} from "../../../ui-kit/components/switcher/switcher.component";
import {DepositPaymentComponent} from "./deposit-payment/deposit-payment.component";
import {CarWithDriverComponent} from "./car-with-driver/car-with-driver.component";

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
    CarWithDriverComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RentCarCardComponent  implements OnInit {

  @Input() ranges: WritableSignal<{ label: string, value: number | null }[]> = signal([]);

  @ViewChild('accordionGroup', { static: true }) accordionGroup: IonAccordionGroup;

  isCharacteristicsAccordionOpen: WritableSignal<boolean> = signal(false);
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
}
