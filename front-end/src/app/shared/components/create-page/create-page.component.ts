import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  Renderer2,
  signal,
  WritableSignal
} from '@angular/core';
import {AutoRIAService} from "../../services/autoRIA.service";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon, IonLabel,
  IonToolbar,
  ModalController
} from "@ionic/angular/standalone";
import {FormBuilder} from "@angular/forms";
import {GooglePlacesSerivce} from "../../services/google-places.serivce";
import {CloseBtnComponent} from "../../ui-kit/components/close-btn/close-btn.component";
import {BackButtonComponent} from "../../ui-kit/components/back-button/back-button.component";
import {ActionSheetController, NavController} from "@ionic/angular";
import {MainInfoComponent} from "./main-info/main-info.component";
import {ImagesInfoComponent} from "./images-info/images-info.component";
import {AddressInfoComponent} from "./address-info/address-info.component";
import {TechnicalCharacteristicsComponent} from "./technical-characteristics/technical-characteristics.component";
import {VehicleTypeService} from "./main-info/vehicle-type.service";
import {TechnicalCharacteristicsService} from "./technical-characteristics/technical-characteristics.service";
import {technicalListLabel} from "./technical-characteristics/technicalCharacteristics.enums";
import {AdditionalOptionsComponent} from "./additional-options/additional-options.component";

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss'],
  standalone: true,
  imports: [
    CloseBtnComponent,
    IonButtons,
    IonContent,
    IonHeader,
    IonToolbar,
    BackButtonComponent,
    IonIcon,
    IonButton,
    IonLabel,
    MainInfoComponent,
    ImagesInfoComponent,
    AddressInfoComponent,
    TechnicalCharacteristicsComponent,
    AdditionalOptionsComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreatePageComponent  implements OnInit {

  private autoRIAService: AutoRIAService = inject(AutoRIAService);
  private modalCtrl: ModalController = inject(ModalController);
  private navCtrl: NavController = inject(NavController);
  private fb: FormBuilder = inject(FormBuilder);
  private googlePlacesService: GooglePlacesSerivce = inject(GooglePlacesSerivce);
  private destroyRef: DestroyRef = inject(DestroyRef);
  private renderer: Renderer2 = inject(Renderer2);
  private actionSheetCtrl: ActionSheetController = inject(ActionSheetController);
  private vehicleTypeService: VehicleTypeService = inject(VehicleTypeService);
  private technicalCharacteristicsService: TechnicalCharacteristicsService = inject(TechnicalCharacteristicsService);

  isFormReset: WritableSignal<boolean> = signal(false);

  get vehicleService() {
    return this.vehicleTypeService;
  }

  get technicalCharacteristics() {
    return this.technicalCharacteristicsService;
  }

  goBack() {
    this.navCtrl.back()
  }
  closeModal(): void {
    this.modalCtrl.dismiss()
  }

  async hardReset(): Promise<void> {
    const actionSheet: HTMLIonActionSheetElement = await this.actionSheetCtrl.create({
      header: 'Скидання даних',
      subHeader: 'Всі введені дані будуть скасовані. Ви впевнені, що хочете оновити?',
      buttons: [{
        text: 'Оновити',
        role: 'destructive',
        handler: (): void => {
          this.isFormReset.set(!this.isFormReset());
          this.allDataReset();
        }
      }, {
        text: 'Відмінити',
        role: 'cancel',
        handler: () => {

        }
      }]
    });

    await actionSheet.present();
  }

  allDataReset() {
    this.vehicleService.selectedYear.set({ label: '', value: '' });
    this.vehicleService.selectedVehicleMark.set({ name: '', value: null });
    this.vehicleService.selectedVehicleModel.set({ name: '', value: null });
    this.vehicleService.selectedBodyType.set({ name: '', value: null });
    this.technicalCharacteristics.selectedFuelType.set({ name: '', value: null });
    this.technicalCharacteristics.isFuelConsumption.set(false);
    this.technicalCharacteristics.cityConsumption.set({ label: technicalListLabel.CITY_CONSUMPTION, value: 0, isVisible: false, callback: async (): Promise<void> => await this.technicalCharacteristics.presentFuelConsumptionAlert() });
    this.technicalCharacteristics.highwayConsumption.set({ label: technicalListLabel.HIGHWAY_CONSUMPTION, value: 0, isVisible: false, callback: async (): Promise<void> => await this.technicalCharacteristics.presentFuelConsumptionAlert() });
    this.technicalCharacteristics.combinedConsumption.set({ label: technicalListLabel.COMBINED_CONSUMPTION, value: 0, isVisible: false, callback: async (): Promise<void> => await this.technicalCharacteristics.presentFuelConsumptionAlert() });
    this.technicalCharacteristics.selectedTransMission.set({ name: '', value: null });
    this.technicalCharacteristics.engineValue.set('');
    this.technicalCharacteristics.powerValue.set('');
    this.technicalCharacteristics.hpPower.set(false);
    this.technicalCharacteristics.kWPower.set(false);
    this.technicalCharacteristics.selectedColorType.set({ name: '', value: null });
  }
  ngOnInit() {}
}
