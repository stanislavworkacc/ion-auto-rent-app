import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {AdditionalOptionsService} from "./additional-options.service";
import {AllCarsChip} from "../../../../home/menu/car-park/all-cars/all-cars.enums";
import {IonChip, IonIcon, IonLabel} from "@ionic/angular/standalone";

@Component({
  selector: 'additional-options',
  templateUrl: './additional-options.component.html',
  styleUrls: ['./additional-options.component.scss'],
  standalone: true,
  imports: [
    IonChip,
    IonIcon,
    IonLabel
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdditionalOptionsComponent  implements OnInit {

  private additionalOptionsService: AdditionalOptionsService = inject(AdditionalOptionsService);

  get additionalOptions() {
    return this.additionalOptionsService;
  }
  ngOnInit() {}

  protected readonly AllCarsChip = AllCarsChip;
}
