import {computed, inject, Injectable, Signal, signal, WritableSignal} from "@angular/core";
import {AlertController, ModalController} from "@ionic/angular/standalone";
import {SelectModalComponent} from "../../filters/modals/select-modal/select-modal.component";
import {technicalListLabel} from "./technicalCharacteristics.enums";
import {VehicleTypeService} from "../main-info/vehicle-type.service";
import {AutoRIAService} from "../../../services/autoRIA.service";

@Injectable({
  providedIn: 'root'
})
export class TechnicalCharacteristicsService {
  private modalCtrl: ModalController = inject(ModalController);
  private alertCtrl: AlertController = inject(AlertController);
  private vehicleTypeService: VehicleTypeService = inject(VehicleTypeService);
  private autoRIAService: AutoRIAService = inject(AutoRIAService);

  fuelTypes: WritableSignal<{ name: string, value: number }[]> = signal([]);
  selectedFuelType: WritableSignal<{ name: string, value: number }> = signal({ name: '', value: null });
  fuelType: Signal<any> = computed(() => this.selectedFuelType());

  transMissions: WritableSignal<{ name: string, value: number }[]> = signal([]);
  selectedTransMission: WritableSignal<{ name: string, value: number }> = signal({ name: '', value: null });
  transMission: Signal<any> = computed(() => this.selectedFuelType());

  isFuelConsumption: WritableSignal<boolean> = signal(false);

  get vehicleService() {
    return this.vehicleTypeService;
  }

  get autoRIA() {
    return this.autoRIAService;
  }

  cityConsumption: WritableSignal<any> = signal(0);
  highwayConsumption: WritableSignal<any> = signal(0);
  combinedConsumption: WritableSignal<any> = signal(0);
  public listItems: Signal<any> = computed( () => [
    {
      label: technicalListLabel.FUEL,
      value: this.fuelTypes(),
      isVisible: true,
      callback: () => {}
    },
    {
      label: technicalListLabel.FUEL_CONSUMPTION,
      value: '',
      isVisible: true,
      callback: () => {}
    },
    {
      label: technicalListLabel.CITY_CONSUMPTION,
      value: this.cityConsumption(),
      isVisible: true,
      callback: () => {}
    },
    {
      label: technicalListLabel.HIGHWAY_CONSUMPTION,
      value: this.highwayConsumption(),
      isVisible: true,
      callback: () => {}
    },
    {
      label: technicalListLabel.COMBINED_CONSUMPTION,
      value: this.combinedConsumption(),
      isVisible: true,
      callback: () => {}
    },
    {
      label: technicalListLabel.TRANSMISSION,
      value: this.selectedTransMission().name,
      isVisible: true,
      callback: () => this.getTransmissions()
    },
  ]);

  async getTransmissions(): Promise<void> {
    const routeParams: any[] = [
      'categories',
      this.vehicleService.vehicleType().category_id,
      'gearboxes'
    ];

    await this.autoRIA.getAuto(routeParams)
      .then((res): void => {
        this.transMissions.set(res);
      })
      .then(() =>  this.initIonModal({
        withSearch: false,
        title: 'Коробка передач',
        items: this.transMissions,
        selectedValue: this.selectedTransMission,
      }, 0.5))
  }
  async initIonModal(data, initialBreakpoint?: number): Promise<any> {
    const modal: HTMLIonModalElement = await this.modalCtrl.create({
      component: SelectModalComponent,
      cssClass: 'auth-modal',
      initialBreakpoint: initialBreakpoint,
      breakpoints: [0, 1],
      componentProps: {
        withSearch: data.withSearch,
        title: data.title,
        items: data.items,
        selectedValue: data.selectedValue,
      }
    });

    await modal.present();
    return modal;
  }

  async presentFuelConsumptionAlert(): Promise<void> {
    const alert: HTMLIonAlertElement = await this.alertCtrl.create({
      header: 'Введіть дані',
      inputs: [
        {
          name: 'city',
          type: 'number',
          placeholder: technicalListLabel.CITY_CONSUMPTION
        },
        {
          name: 'highway',
          type: 'number',
          placeholder: technicalListLabel.HIGHWAY_CONSUMPTION
        },
        {
          name: 'combined',
          type: 'number',
          placeholder: technicalListLabel.COMBINED_CONSUMPTION
        }
      ],
      buttons: [
        {
          text: 'Скасувати',
          handler: (): void => {
            this.isFuelConsumption.set(false)
          }
        },
        {
          text: 'Зберегти',
          handler: (data): void => {
            if (data && (data.city || data.highway || data.combined)) {
              this.isFuelConsumption.set(true);

              for (const key of Object.keys(data)) {
                switch (key) {
                  case 'city':
                    const cityItem = this.listItems().find(item => item.label === technicalListLabel.CITY_CONSUMPTION);
                    if (cityItem) {
                      this.cityConsumption.set(data.city);
                    }
                    break;
                  case 'highway':
                    const highwayItem = this.listItems().find(item => item.label === technicalListLabel.HIGHWAY_CONSUMPTION);
                    if (highwayItem) {
                      this.highwayConsumption.set(data.highway);
                    }
                    break;
                  case 'combined':
                    const combinedItem = this.listItems().find(item => item.label === technicalListLabel.COMBINED_CONSUMPTION);
                    if (combinedItem) {
                      this.combinedConsumption.set(data.combined);

                    }
                    break;
                }
              }
            } else {
              this.isFuelConsumption.set(false);
            }
          }

        }
      ]
    });

    await alert.present();
  }
}
