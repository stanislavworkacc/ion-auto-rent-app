import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {IonIcon, IonItem, IonLabel, IonList, IonText, ModalController} from "@ionic/angular/standalone";
import {NgForOf} from "@angular/common";
import {AutoRIAService} from "../../../services/autoRIA.service";
import {AuthorizatorComponent} from "../../../../auth/authorizator/authorizator.component";
import {VehicleTypeModalComponent} from "../../filters/modals/vehicle-type-modal/vehicle-type-modal.component";
import {Platform} from "@ionic/angular";

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
  private modalCtrl: ModalController = inject(ModalController);
  public platform: Platform = inject(Platform);

  public listItems = [
    {
      label: 'Тип транспорту',
      value: 'Автомобіль',
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
  ];

  get autoRIA() {
    return this.autoRIAService;
  }

  onItemClicked(callback: Function): void {
    callback();
  }

   async onVehicleType(): Promise<void> {
    const modal: HTMLIonModalElement = await this.modalCtrl.create({
      component: VehicleTypeModalComponent,
      cssClass: 'auth-modal',
      initialBreakpoint: 0.6,
      breakpoints: [0, 0.6, 0.7, 0.8, 0.9]
    });

    await modal.present();
  }

  constructor() { }

  ngOnInit() {}

}
