import {ChangeDetectionStrategy, Component, OnInit, signal, WritableSignal} from '@angular/core';
import {IonIcon, IonInput, IonLabel, IonText} from "@ionic/angular/standalone";
import {SwitcherComponent} from "../../../../ui-kit/components/switcher/switcher.component";
import {ThousandSeparatorPipe} from "../../../../pipes/thousand.pipe";

@Component({
  selector: 'deposit-payment',
  templateUrl: './deposit-payment.component.html',
  styleUrls: ['./deposit-payment.component.scss'],
  standalone: true,
  imports: [
    IonLabel,
    SwitcherComponent,
    IonInput,
    ThousandSeparatorPipe,
    IonIcon,
    IonText,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DepositPaymentComponent  implements OnInit {

  isDepositPaymentOn: WritableSignal<boolean> = signal(false);
  isDepositPaymentBlurred: WritableSignal<boolean> = signal(false);
  depositPayment: WritableSignal<number> = signal(null);
  onToggleChange(isOn: boolean): void {
    this.isDepositPaymentOn.set(isOn)
  }

  onDepositChange(value): void {
    this.depositPayment.set(value);
  }

  hideDepositInput(): void {
    this.isDepositPaymentBlurred.set(true);
  }

  ngOnInit() {}
}
