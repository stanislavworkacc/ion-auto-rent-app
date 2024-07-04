import {ChangeDetectionStrategy, Component, computed, inject, OnInit} from '@angular/core';
import {IonIcon, IonItem, IonLabel, IonList, IonText, ModalController} from "@ionic/angular/standalone";
import {NgForOf} from "@angular/common";
import {AutoRIAService} from "../../../services/autoRIA.service";
import {AuthorizatorComponent} from "../../../../auth/authorizator/authorizator.component";
import {VehicleTypeModalComponent} from "../../filters/modals/vehicle-type-modal/vehicle-type-modal.component";
import {Platform} from "@ionic/angular";
import {SelectModalComponent} from "../../filters/modals/select-modal/select-modal.component";
import {VehicleTypeService} from "./vehicle-type.service";

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
    IonText
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainInfoComponent  implements OnInit {

  private autoRIAService: AutoRIAService = inject(AutoRIAService);
  private vehicleTypeService: VehicleTypeService = inject(VehicleTypeService);
  private modalCtrl: ModalController = inject(ModalController);
  public platform: Platform = inject(Platform);

  public listItems = computed( () => [
    {
      label: 'Тип транспорту',
      value: this.vehicleService.vehicleType().label,
      callback: () => this.onVehicleType()
    },
    {
      label: 'Рік випуску',
      value: '',
      callback: () => {}
    },
    {
      label: 'Марка авто',
      value: '',
      callback: () => {}
    },
    {
      label: 'Модель авто',
      value: '',
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
    const modal: HTMLIonModalElement = await this.modalCtrl.create({
      component: SelectModalComponent,
      cssClass: 'auth-modal',
      initialBreakpoint: 0.6,
      breakpoints: [0, 0.6],
      componentProps: {
        withSearch: false,
        title: 'Тип транспорту',
        items: this.vehicleService.transportTypes,
        selectedValue: this.vehicleService.selectedValue,
      }
    });

    await modal.present();
  }

  constructor() { }

  ngOnInit() {}

}
