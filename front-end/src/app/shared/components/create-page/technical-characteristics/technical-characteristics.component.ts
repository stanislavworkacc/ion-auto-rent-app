import {ChangeDetectionStrategy, Component, computed, inject, OnInit} from '@angular/core';
import {IonChip, IonIcon, IonItem, IonLabel, IonList, IonText} from "@ionic/angular/standalone";
import {NgForOf} from "@angular/common";
import {AutoRIAService} from "../../../services/autoRIA.service";
import {TechnicalCharacteristicsService} from "./technical-characteristics.service";
import {technicalListLabel} from "./technicalCharacteristics.enums";
import {VehicleTypeService} from "../main-info/vehicle-type.service";

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
  private vehicleTypeService: VehicleTypeService = inject(VehicleTypeService);

  technicalListLabel = technicalListLabel;
  get technicalCharacteristics() {
    return this.technicalCharacteristicsService;
  }

  get vehicleService() {
    return this.vehicleTypeService;
  }

  public listItems: any = computed( () => [
    {
      label: technicalListLabel.FUEL,
      value: this.technicalCharacteristics.fuelTypes(),
      callback: () => {}
    },
    {
      label: technicalListLabel.TRANSMISSION,
      value: this.technicalCharacteristics.selectedTransMission().name,
      callback: () => this.getTransmissions()
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

  async getTransmissions(): Promise<void> {
    const routeParams: any[] = [
      'categories',
      this.vehicleService.vehicleType().category_id,
      'gearboxes'
    ];

    await this.autoRIA.getAuto(routeParams)
      .then((res): void => {
        this.technicalCharacteristics.transMissions.set(res);
      })
      .then(() =>  this.technicalCharacteristics.initIonModal({
        withSearch: false,
        title: 'Коробка передач',
        items: this.technicalCharacteristics.transMissions,
        selectedValue: this.technicalCharacteristics.selectedTransMission,
      }, 0.5))
  }
  constructor() { }

  async ngOnInit(): Promise<void> {
    await this.getFuelType()
  }
}
