import {AfterViewInit, ChangeDetectionStrategy, Component, inject, OnInit, ViewChild} from '@angular/core';
import {IonicModule, IonModal, NavController} from "@ionic/angular";
import {FormBuilder, FormGroup, FormsModule, Validators} from "@angular/forms";
import {CloseBtnComponent} from "../../../shared/ui-kit/components/close-btn/close-btn.component";
import {SignUpFormComponent} from "../sign-up-form/sign-up-form.component";
import {NgIf} from "@angular/common";
import {SegmentsComponent} from "../../../shared/ui-kit/components/segments/segments.component";
import {isAndroid, isIOS} from "../../../shared/utils/detect-device.utils";
import {BackButtonComponent} from "../../../shared/ui-kit/components/back-button/back-button.component";
import {SegmentType} from "./auth-enums";
import {GoogleSsoComponent} from "../google-sso/google-sso.component";
import {AppleIosComponent} from "../apple-ios/apple-ios.component";
import {AndroidFormComponent} from "../android-form/android-form.component";
import {IonFabComponent} from "../../../shared/ui-kit/components/ion-fab/ion-fab.component";

@Component({
  selector: 'auth-form-wrapper',
  templateUrl: './auth-form-wrapper.component.html',
  styleUrls: ['./auth-form-wrapper.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    FormsModule,
    IonicModule,
    CloseBtnComponent,
    SignUpFormComponent,
    NgIf,
    SegmentsComponent,
    BackButtonComponent,
    GoogleSsoComponent,
    AppleIosComponent,
    AndroidFormComponent,
    IonFabComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthFormWrapperComponent  implements OnInit, AfterViewInit {
  private navCtrl: NavController = inject(NavController);
  private fb: FormBuilder = inject(FormBuilder);

  @ViewChild(IonModal) modal!: IonModal;

  SegmentType = SegmentType;
  public signUpForm!: FormGroup;
  public selectedSegment: string = SegmentType.STANTDART;

  public options!: { value: string, icon: string, label: string }[];
  fabItems!: { icon: string, action : () => void }[];

  defaultLogin() {
  }

  googleSSO() {
  }

  iosLogin() {
  }
  navigateBack(): void {
    this.closeModal();
    this.navCtrl.back();
  }

  openModal(): void {
    this.modal.present();
  }

  closeModal(): void {
    this.modal.dismiss();
  }

  onSignUpSegmentChanged(ev: any): void {
    this.selectedSegment = ev;
  }

  initSignUpForm(): void {
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  checkNativeDevice(): void {
    const isAndroidDevice: boolean = isAndroid();
    const isIOSDevice: boolean = isIOS();

    this.options = [
      { value: 'standard', icon: 'person-outline', label: 'Реєстрація' },
      { value: 'google', icon: 'logo-google', label: 'Увійти з Google' },
      { value: 'apple', icon: 'logo-apple', label: 'Увійти з Apple', isVisible: isIOSDevice },
      { value: 'android', icon: 'logo-android', label: 'Увійти з Android', isVisible: isAndroidDevice }
    ].filter(option => option.isVisible !== false);
  }

  initIonFab(): void {
    const isAndroidDevice: boolean = isAndroid();
    const isIOSDevice: boolean = isIOS();

    this.fabItems = [
      { icon: 'log-in-outline', action: this.defaultLogin.bind(this) },
      { icon: 'logo-google', action: this.googleSSO.bind(this) },
      { icon: 'logo-apple', action: this.iosLogin.bind(this), isVisible: isIOSDevice },
      { icon: 'logo-android', action: this.iosLogin.bind(this), isVisible: isAndroidDevice },
    ].filter(fab => fab.isVisible !== false)
  }
  ngOnInit(): void {
    this.initSignUpForm();
    this.checkNativeDevice();
    this.initIonFab()
  }

  ngAfterViewInit(): void {
    this.openModal();
  }

  constructor() {}
}
