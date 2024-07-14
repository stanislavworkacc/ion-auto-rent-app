import {ChangeDetectionStrategy, Component, OnInit, signal, WritableSignal} from '@angular/core';
import {IonInput, IonLabel} from "@ionic/angular/standalone";
import {SwitcherComponent} from "../../../../ui-kit/components/switcher/switcher.component";

@Component({
  selector: 'deposit-payment',
  templateUrl: './deposit-payment.component.html',
  styleUrls: ['./deposit-payment.component.scss'],
  standalone: true,
  imports: [
    IonLabel,
    SwitcherComponent,
    IonInput
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DepositPaymentComponent  implements OnInit {

  isDepositPaymentOn: WritableSignal<boolean> = signal(false);
  onToggleChange(isOn: boolean): void {
    this.isDepositPaymentOn.set(isOn)
  }

  ngOnInit() {}
}
