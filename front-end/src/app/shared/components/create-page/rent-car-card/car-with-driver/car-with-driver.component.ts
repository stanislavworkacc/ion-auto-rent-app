import {ChangeDetectionStrategy, Component, OnInit, signal, WritableSignal} from '@angular/core';
import {IonIcon, IonInput, IonLabel, IonText} from "@ionic/angular/standalone";
import {SwitcherComponent} from "../../../../ui-kit/components/switcher/switcher.component";
import {ThousandSeparatorPipe} from "../../../../pipes/thousand.pipe";

@Component({
  selector: 'car-with-driver',
  templateUrl: './car-with-driver.component.html',
  styleUrls: ['./car-with-driver.component.scss'],
  standalone: true,
  imports: [
    IonLabel,
    IonIcon,
    IonInput,
    IonText,
    SwitcherComponent,
    ThousandSeparatorPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarWithDriverComponent  implements OnInit {

  onlyWithDriver: WritableSignal<boolean> = signal(false);
  driverRequested: WritableSignal<boolean> = signal(false);
  onlyWithDriverToggleChange(withDriver: boolean): void {
    this.onlyWithDriver.set(withDriver);
  }

  onlyRequestedDriver(withDriver: boolean): void {
    this.driverRequested.set(withDriver);
  }
  ngOnInit() {}

}
