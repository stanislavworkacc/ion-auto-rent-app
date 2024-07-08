import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {
  IonButton, IonButtons,
  IonChip,
  IonContent, IonHeader,
  IonIcon, IonInput,
  IonItem,
  IonLabel,
  IonList, IonModal, IonPopover,
  IonText
} from "@ionic/angular/standalone";
import {NgForOf, NgIf} from "@angular/common";
import {AutoRIAService} from "../../../services/autoRIA.service";
import {TechnicalCharacteristicsService} from "./technical-characteristics.service";
import {technicalListLabel} from "./technicalCharacteristics.enums";
import {VehicleTypeService} from "../main-info/vehicle-type.service";
import {SwitcherComponent} from "../../../ui-kit/components/switcher/switcher.component";
import {LimitEngineVolumeDirective} from "../../../directives/engine-volume.directive";

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
    NgForOf,
    IonContent,
    IonPopover,
    IonButton,
    IonButtons,
    SwitcherComponent,
    NgIf,
    IonModal,
    IonHeader,
    IonInput,
    LimitEngineVolumeDirective
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TechnicalCharacteristicsComponent  implements OnInit {

  private autoRIAService: AutoRIAService = inject(AutoRIAService);
  private technicalCharacteristicsService: TechnicalCharacteristicsService = inject(TechnicalCharacteristicsService);
  private vehicleTypeService: VehicleTypeService = inject(VehicleTypeService);

  technicalListLabel = technicalListLabel;
  excludedLabels: technicalListLabel[] = [technicalListLabel.FUEL_CONSUMPTION, technicalListLabel.CITY_CONSUMPTION, technicalListLabel.COMBINED_CONSUMPTION, technicalListLabel.HIGHWAY_CONSUMPTION];
  get technicalCharacteristics() {
    return this.technicalCharacteristicsService;
  }

  get autoRIA() {
    return this.autoRIAService;
  }

  shouldDisplaySelect(item: any): boolean {
    return !this.excludedLabels.includes(item.label);
  }

  checkmarkHandle(item: any): any {
    return (item.value && item.label !== technicalListLabel.FUEL) ||
      (item.label === technicalListLabel.FUEL && this.technicalCharacteristics.fuelType().value)
  }

  async fuelConsumptionToggle(isToggle): Promise<void> {
    if(isToggle) {
      this.technicalCharacteristics.isFuelConsumption.set(true)
      await this.technicalCharacteristics.presentFuelConsumptionAlert()
    } else {
      this.technicalCharacteristics.isFuelConsumption.set(false);
      this.technicalCharacteristics.cityConsumption.set({ label: technicalListLabel.CITY_CONSUMPTION, value: 0, isVisible: false, callback: () => {} })
      this.technicalCharacteristics.highwayConsumption.set({ label: technicalListLabel.HIGHWAY_CONSUMPTION, value: 0, isVisible: false, callback: () => {} })
      this.technicalCharacteristics.combinedConsumption.set({ label: technicalListLabel.COMBINED_CONSUMPTION, value: 0, isVisible: false, callback: () => {} })
    }
  }

  onItemClicked(callback: Function): void {
    callback();
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

  async ngOnInit(): Promise<void> {
    await this.getFuelType()
  }

  constructor() {}
}
