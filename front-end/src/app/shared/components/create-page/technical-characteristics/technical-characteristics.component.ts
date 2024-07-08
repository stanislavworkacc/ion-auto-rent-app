import {ChangeDetectionStrategy, Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {
  IonButton, IonButtons,
  IonChip,
  IonContent, IonHeader,
  IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonInput,
  IonItem,
  IonLabel,
  IonList, IonModal, IonPopover, IonRadio, IonRadioGroup,
  IonText, ModalController
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
    LimitEngineVolumeDirective,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonRadio,
    IonRadioGroup
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TechnicalCharacteristicsComponent  implements OnInit {

  private autoRIAService: AutoRIAService = inject(AutoRIAService);
  private technicalCharacteristicsService: TechnicalCharacteristicsService = inject(TechnicalCharacteristicsService);
  private vehicleTypeService: VehicleTypeService = inject(VehicleTypeService);
  private modalCtrl: ModalController = inject(ModalController);

  technicalListLabel = technicalListLabel;
  excludedLabels: technicalListLabel[] = [technicalListLabel.FUEL_CONSUMPTION, technicalListLabel.CITY_CONSUMPTION, technicalListLabel.COMBINED_CONSUMPTION, technicalListLabel.HIGHWAY_CONSUMPTION];

  tempEngineValue: WritableSignal<string> = signal('');
  tempEnginePower: WritableSignal<string> = signal('');
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

  onModalInput(value, type): void  {
    if(type === 'engineValue') {
      this.tempEngineValue.set(value);
    } else {
      this.tempEnginePower.set(value);
    }
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

  submitInputModal(type): void {
    if(type === 'engineValue') {
      this.technicalCharacteristics.engineValue.set(this.tempEngineValue());
      this.modalCtrl.dismiss();
    }

    if(type === 'enginePower') {
      this.technicalCharacteristics.powerValue.set(this.tempEnginePower());
      this.modalCtrl.dismiss();
    }
  }

  onPowerChange(powerType) {
    if(powerType === 'hp') {
      this.technicalCharacteristics.hpPower.set(true);
    } else {
      this.technicalCharacteristics.hpPower.set(false);
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

  protected readonly Array = Array;
}
