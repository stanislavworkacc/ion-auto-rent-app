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
import {NavController} from "@ionic/angular";
import {MainInfoComponent} from "./main-info/main-info.component";
import {ImagesInfoComponent} from "./images-info/images-info.component";
import {AddressInfoComponent} from "./address-info/address-info.component";

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
    AddressInfoComponent
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

  isFormReset: WritableSignal<boolean> = signal(false);
  goBack() {
    this.navCtrl.back()
  }
  closeModal(): void {
    this.modalCtrl.dismiss()
  }

  resetForm(): void {
    this.isFormReset.set(!this.isFormReset())
  }
  ngOnInit() {}
}
