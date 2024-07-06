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
import {SelectModalComponent} from "../../filters/modals/select-modal/select-modal.component";
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
      value: [
        { value: 3, name: 'Седан' },
        { value: 2, name: 'Універсал' },
        { value: 5, name: 'Кроссовер' },
        { value: 4, name: 'Хетчбек' },
        { value: 8, name: 'Мінівен' },
        { value: 9, name: 'Пікап' },
        { value: 7, name: 'Кабріолет' },
        { value: 6, name: 'Купе' },
        { value: 252, name: 'Лімузин' },
        { value: 307, name: 'Ліфтбек' },
        { value: 315, name: 'Родстер' },
        { value: 449, name: 'Мікровен' },
        { value: 448, name: 'Фастбек' },
      ],
      callback: () => {}
    }
  ]);

  get autoRIA() {
    return this.autoRIAService;
  }

  get vehicleService() {
    return this.vehicleTypeService;
  }

  onItemClicked(callback: Function): void {
    callback();
  }

   async onVehicleType(): Promise<void> {
     await this.vehicleService.initIonModal({
       withSearch: false,
       title: 'Тип транспорту',
       items: this.vehicleService.transportTypes,
       selectedValue: this.vehicleService.selectedType,
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
