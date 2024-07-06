import {ChangeDetectionStrategy, Component, computed, inject, OnInit} from '@angular/core';
import {IonChip, IonIcon, IonItem, IonLabel, IonList, IonText} from "@ionic/angular/standalone";
import {NgForOf} from "@angular/common";
import {AutoRIAService} from "../../../services/autoRIA.service";
import {TechnicalCharacteristicsService} from "./technical-characteristics.service";
import {technicalListLabel} from "./technicalCharacteristics.enums";

@Component({
  selector: 'technical-characteristics',
  templateUrl: './technical-characteristics.component.html',
  styleUrls: ['./technical-characteristics.component.scss'],
  standalone: true,
  imports: [
    IonChip,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonText,
    NgForOf
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TechnicalCharacteristicsComponent  implements OnInit {

  private autoRIAService: AutoRIAService = inject(AutoRIAService);
  private technicalCharacteristicsService: TechnicalCharacteristicsService = inject(TechnicalCharacteristicsService);

  technicalListLabel = technicalListLabel;
  get technicalCharacteristics() {
    return this.technicalCharacteristicsService;
  }

  public listItems: any = computed( () => [
    {
      label: technicalListLabel.FUEL,
      value: this.technicalCharacteristics.fuelTypes(),
      callback: () => {}
    },
  ]);

  checkmarkHandle(item: any): any {
    return (item.value && item.label !== technicalListLabel.FUEL) ||
      (item.label === technicalListLabel.FUEL && this.technicalCharacteristics.fuelType().value)
  }

  onItemClicked(callback: Function): void {
    callback();
  }

  get autoRIA() {
    return this.autoRIAService;
  }

  fuelTypeSelected(fuel: { name: string, value: number }): void {
    this.technicalCharacteristics.selectedFuelType.set(fuel);
  }

  clearFuelType(ev): void {
    ev.preventDefault();
    ev.stopPropagation();
    this.technicalCharacteristics.selectedFuelType.set({ name: '', value: null });
  }

  async getFuelType(): Promise<void> {
    const routeParams: string[] = ['type'];

    await this.autoRIA.getAuto(routeParams)
      .then((res): void => {
        this.technicalCharacteristics.fuelTypes.set(res);
      })
  }
  constructor() { }

  async ngOnInit(): Promise<void> {
    await this.getFuelType()
  }
}
