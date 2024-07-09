import {AfterViewInit, ChangeDetectionStrategy, Component, computed, effect, inject, OnInit} from '@angular/core';
import {
  IonChip,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonText,
  ModalController
} from "@ionic/angular/standalone";
import {JsonPipe, NgForOf, NgIf} from "@angular/common";
import {AutoRIAService} from "../../../services/autoRIA.service";
import {Platform} from "@ionic/angular";
import {VehicleTypeService} from "./vehicle-type.service";
import {ListLabel} from "./main-info.enums";

@Component({
  selector: 'main-info',
  templateUrl: './main-info.component.html',
  styleUrls: ['./main-info.component.scss'],
  standalone: true,
  imports: [
    IonList,
    IonItem,
    IonIcon,
    IonLabel,
    NgForOf,
    IonText,
    NgIf,
    IonChip,
    JsonPipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainInfoComponent  implements OnInit, AfterViewInit {

  private autoRIAService: AutoRIAService = inject(AutoRIAService);
  private vehicleTypeService: VehicleTypeService = inject(VehicleTypeService);
  private modalCtrl: ModalController = inject(ModalController);
  public platform: Platform = inject(Platform);
  ListLabel = ListLabel;

  public listItems: any = computed( () => [
    {
      label: ListLabel.CAR_TYPE,
      value: this.vehicleService.vehicleType().label,
      callback: () => this.onVehicleType()
    },
    {
      label: ListLabel.CAR_YEAR,
      value:  this.vehicleService.vehicleYear().label,
      callback: () => this.getVehicleYear()
    },
    {
      label: ListLabel.CAR_MARK,
      value: this.vehicleService.vehicleMark().name,
      callback: () => this.getVehicleMark()
    },
    {
      label: ListLabel.CAR_MODEL,
      value: this.vehicleService.vehicleModel().name,
      callback: () => this.showVehicleModels()
    },
    {
      label: ListLabel.BODY_TYPE,
      value: this.vehicleService.bodyTypes(),
      callback: () => {}
    }
  ]);

  get autoRIA() {
    return this.autoRIAService;
  }

  get vehicleService() {
    return this.vehicleTypeService;
  }

  checkmarkHandle(item: any): any {
    return (item.value && item.label !== ListLabel.BODY_TYPE) ||
      (item.label === ListLabel.BODY_TYPE && this.vehicleService.bodyType().value);
  }


  onItemClicked(callback: Function): void {
    callback();
  }

  selectBodyType(type: { name: string, value: number }): void {
    this.vehicleService.selectedBodyType.set(type);
  }

  clearBodyType(ev): void {
    ev.preventDefault();
    ev.stopPropagation();
    this.vehicleService.selectedBodyType.set({ name: '', value: null });
  }

   async onVehicleType(): Promise<void> {
     const modal = await this.vehicleService.initIonModal({
       withSearch: false,
       title: 'Тип транспорту',
       items: this.vehicleService.transportTypes,
       selectedValue: this.vehicleService.selectedType,
     })

     modal.onWillDismiss()
       .then(async(res): Promise<void> =>  {
       if(res.data.isSubmit) {
         await this.initVehicleMarks()
       }
     })
  }

  async getVehicleYear(): Promise<void> {
    await this.vehicleService.initIonModal({
      withSearch: false,
      title: 'Оберіть рік',
      items: this.vehicleService.vehicleYears,
      selectedValue: this.vehicleService.selectedYear,
    })
  }

  async getVehicleMark(): Promise<void> {
    const modal = await this.vehicleService.initIonModal({
      withSearch: true,
      title: 'Оберіть марку',
      items: this.vehicleService.vehicleMarks,
      selectedValue: this.vehicleService.selectedVehicleMark,
    })

    await modal.onWillDismiss().then(async (res): Promise<void> => {
      if(res.data.isSubmit) {
        await this.getVehicleModel()
      }
    })
  }

  async getVehicleModel(): Promise<void> {
    const routeParams = [
      'categories', this.vehicleService.vehicleType().category_id,
      'marks', this.vehicleService.vehicleMark().value,
      'models',
      '_group'
    ];

    await this.autoRIA.getAuto(routeParams)
      .then((res): void => {
        this.vehicleService.vehicleModels.set(res);
      })
  }

  async showVehicleModels(): Promise<void> {
    await this.vehicleService.initIonModal({
      withSearch: true,
      title: 'Оберіть модель',
      items: this.vehicleService.vehicleModels,
      selectedValue: this.vehicleService.selectedVehicleModel,
    })
  }

  async initVehicleMarks(): Promise<void> {
    const routeParams = ['categories', this.vehicleService.vehicleType().category_id, 'marks'];
    await this.autoRIA.getAuto(routeParams)
      .then((res): void => {
        this.vehicleService.vehicleMarks.set(res);
      })
  }

  ngOnInit(): void {};

  async ngAfterViewInit(): Promise<void> {
    await this.initVehicleMarks();
  }

  constructor() {}
}
