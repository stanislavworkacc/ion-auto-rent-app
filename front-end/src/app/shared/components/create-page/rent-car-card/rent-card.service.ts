import {inject, Injectable, signal, WritableSignal} from "@angular/core";
import {IonAccordionGroup, ModalController} from "@ionic/angular/standalone";
import {INSURANCE_TYPE, RentRange} from "./rent-card.enums";
import {PdfViewerComponent} from "../../pdf-viewer/pdf-viewer.component";

@Injectable({
  providedIn: 'root'
})
export class RentCardService {
  private modalCtrl: ModalController = inject(ModalController);
  public generatingContract: WritableSignal<boolean> = signal(false);
  public pdfCreated: WritableSignal<boolean> = signal(false);

  isCharacteristicsAccordionOpen: WritableSignal<boolean> = signal(false);

  public rentTypes: WritableSignal<{ value: string, label: string, checked: boolean }[]> = signal([
    {label: 'за день', value: RentRange.DAYS, checked: true},
    {label: 'погодинно', value: RentRange.HOURS, checked: false},
  ]);
  public selectedRentType: WritableSignal<string> = signal(RentRange.DAYS);

  public insuranceTypes: WritableSignal<{ value: string, label: string, checked: boolean }[]> = signal([
    {label: 'Поліс ОСЦПВ', value: INSURANCE_TYPE.OSCPV, checked: false},
    {label: 'КАСКО', value: INSURANCE_TYPE.KASKO, checked: false},
  ]);
  public insuranceType: WritableSignal<string> = signal(null);


  carPreviewDetails = [
    {icon: '/assets/icon/gear-box-ico.png', class: 'w-[15px] h-[15px]', text: 'Автомат'},
    {icon: '/assets/icon/engine-car-ico.png', class: 'w-[16px] h-[16px]', text: '2.3'},
    {icon: '/assets/icon/fuel-type-ico.png', class: 'w-[16px] h-[16px]', text: 'Бензин'},
    {icon: '/assets/icon/discharge-fuel-ico.png', class: 'w-[15px] h-[15px]', text: '8 л'}
  ];

  images = [
    {src: '/assets/icon/atlas-1.jpeg'},
    {src: '/assets/icon/atlas-2.jpg'},
    {src: '/assets/icon/atlas-3.jpg'},
  ]

  onRentTypeChange(selectedType: string): void {
    const updatedRentTypes = this.rentTypes().map(type => {
      return {...type, checked: type.value === selectedType};
    });

    this.rentTypes.set(updatedRentTypes);
    this.selectedRentType.set(selectedType)
  }

  insuranceTypeChange(selectedType: string): void {
    const updatedInsuranceTypes = this.insuranceTypes().map(type => {
      return {...type, checked: type.value === selectedType};
    });

    this.insuranceTypes.set(updatedInsuranceTypes);
    this.insuranceType.set(selectedType)
  }

  async openPdf(): Promise<void> {
    const modal: HTMLIonModalElement = await this.modalCtrl.create({
      component: PdfViewerComponent
    })

    await modal.present();
  }

  generateCarContract() {
    this.generatingContract.set(true);
    this.pdfCreated.set(true)

    setTimeout(() => {
      this.generatingContract.set(false);

    }, 4000)
  }

  toggleAccordion = (accordionGroup): void => {
    this.isCharacteristicsAccordionOpen.set(!this.isCharacteristicsAccordionOpen())
    const nativeEl: IonAccordionGroup = accordionGroup;
    if (nativeEl.value === 'characteristics') {
      nativeEl.value = undefined;
    } else {
      nativeEl.value = 'characteristics';
    }
  };

}
