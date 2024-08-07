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
  IonActionSheet,
  IonButton,
  IonButtons,
  IonContent, IonFooter,
  IonHeader,
  IonIcon, IonLabel, IonRippleEffect, IonTitle,
  IonToolbar,
  ModalController
} from "@ionic/angular/standalone";
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
import {NgIf} from "@angular/common";
import {AdditionalOptionsService} from "./additional-options/additional-options.service";
import {RippleBtnComponent} from "../buttons/ripple-btn/ripple-btn.component";
import {ImagesInfoService} from "./images-info/images-info.service";

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
    AdditionalOptionsComponent,
    IonFooter,
    IonTitle,
    NgIf,
    IonRippleEffect,
    RippleBtnComponent,
    IonActionSheet
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePageComponent  implements OnInit {
  public actionSheetButtons = [
    {
      text: 'Оновити',
      role: 'destructive',
      handler: () => {
        this.allDataReset()
      }
    },
    {
      text: 'Відмінити',
      role: 'cancel',
      data: {
        action: 'cancel',
      },
    },
  ];


  private autoRIAService: AutoRIAService = inject(AutoRIAService);
  private modalCtrl: ModalController = inject(ModalController);
  private navCtrl: NavController = inject(NavController);
  private googlePlacesService: GooglePlacesSerivce = inject(GooglePlacesSerivce);
  private destroyRef: DestroyRef = inject(DestroyRef);
  private renderer: Renderer2 = inject(Renderer2);
  private actionSheetCtrl: ActionSheetController = inject(ActionSheetController);
  private vehicleTypeService: VehicleTypeService = inject(VehicleTypeService);
  private technicalCharacteristicsService: TechnicalCharacteristicsService = inject(TechnicalCharacteristicsService);
  private additionalOptionsService: AdditionalOptionsService = inject(AdditionalOptionsService);
  private imagesInfoService: ImagesInfoService = inject(ImagesInfoService);

  isFormReset: WritableSignal<boolean> = signal(false);
  showAdditionalOptions: WritableSignal<boolean> =  signal(false);
  get vehicleService() {
    return this.vehicleTypeService;
  }

  get imagesInfo() {
    return this.imagesInfoService;
  }

  get technicalCharacteristics() {
    return this.technicalCharacteristicsService;
  }

  get additionalOptions() {
    return this.additionalOptionsService;
  }

  goBack() {
    this.navCtrl.back()
  }
  closeModal(): void {
    this.modalCtrl.dismiss()
  }

  allDataReset() {
    this.isFormReset.set(true);
    const resetVehicleService = () => {
      this.vehicleService.selectedYear.set({ label: '', value: '' });
      this.vehicleService.selectedVehicleMark.set({ name: '', value: null });
      this.vehicleService.selectedVehicleModel.set({ name: '', value: null });
      this.vehicleService.selectedBodyType.set({ name: '', value: null });
    };

    const resetTechnicalCharacteristics = () => {
      const defaultConsumptionCallback = async (): Promise<void> => await this.technicalCharacteristics.presentFuelConsumptionAlert();

      this.technicalCharacteristics.selectedFuelType.set({ name: '', value: null });
      this.technicalCharacteristics.isFuelConsumption.set(false);
      this.technicalCharacteristics.cityConsumption.set({ label: technicalListLabel.CITY_CONSUMPTION, value: 0, isVisible: false, callback: defaultConsumptionCallback });
      this.technicalCharacteristics.highwayConsumption.set({ label: technicalListLabel.HIGHWAY_CONSUMPTION, value: 0, isVisible: false, callback: defaultConsumptionCallback });
      this.technicalCharacteristics.combinedConsumption.set({ label: technicalListLabel.COMBINED_CONSUMPTION, value: 0, isVisible: false, callback: defaultConsumptionCallback });
      this.technicalCharacteristics.selectedTransMission.set({ name: '', value: null });
      this.technicalCharacteristics.engineValue.set('');
      this.technicalCharacteristics.powerValue.set('');
      this.technicalCharacteristics.hpPower.set(false);
      this.technicalCharacteristics.kWPower.set(false);
      this.technicalCharacteristics.selectedColorType.set({ name: '', value: null });
    };

    const resetAdditionalOptions = () => {
      const clearOptionsArray = this.additionalOptions.chipsArray().map((additionalOption) => {
        if (additionalOption.selected) {
          return { ...additionalOption, selected: false, value: '' };
        }
        return additionalOption;
      });
      this.additionalOptions.chipsArray.set(clearOptionsArray);
    };

    const resetImagesGallery = () => this.imagesInfoService.uploadedLogoUrls.set([])

    resetVehicleService();
    resetTechnicalCharacteristics();
    resetAdditionalOptions();
    resetImagesGallery();
    this.showAdditionalOptions.set(false);

    setTimeout(() => {
      this.isFormReset.set(false);
    },1000)
  }

  onSubmit() {
    this.navCtrl.navigateForward(['/home/rent-info'])
  }

  ngOnInit() {}
}
