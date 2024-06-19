import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component, effect,
  inject,
  OnInit, signal,
  ViewEncapsulation, WritableSignal
} from '@angular/core';
import {NavController, Platform} from "@ionic/angular";
import {FormBuilder, FormGroup, FormsModule, Validators} from "@angular/forms";
import {CloseBtnComponent} from "../../../shared/ui-kit/components/close-btn/close-btn.component";
import {SignUpFormComponent} from "../sign-up-form/sign-up-form.component";
import {NgForOf, NgIf} from "@angular/common";
import {SegmentsComponent} from "../../../shared/ui-kit/components/segments/segments.component";
import {BackButtonComponent} from "../../../shared/ui-kit/components/back-button/back-button.component";
import {SegmentType} from "./auth-enums";
import {GoogleSsoComponent} from "../google-sso/google-sso.component";
import {AppleIosComponent} from "../apple-ios/apple-ios.component";
import {AndroidFormComponent} from "../android-form/android-form.component";
import {IonFabComponent} from "../../../shared/ui-kit/components/ion-fab/ion-fab.component";
import {
  IonButton,
  IonButtons, IonContent,
  IonFab,
  IonFabButton, IonFabList,
  IonHeader, IonIcon,
  IonToolbar,
  ModalController
} from "@ionic/angular/standalone";

@Component({
  selector: 'auth-form-wrapper',
  templateUrl: './auth-form-wrapper.component.html',
  styleUrls: ['./auth-form-wrapper.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    CloseBtnComponent,
    SignUpFormComponent,
    NgIf,
    SegmentsComponent,
    BackButtonComponent,
    GoogleSsoComponent,
    AppleIosComponent,
    AndroidFormComponent,
    IonFabComponent,
    NgForOf,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonFab,
    IonFabButton,
    IonFabList,
    IonIcon,
    IonContent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AuthFormWrapperComponent  implements OnInit, AfterViewInit {
  private navCtrl: NavController = inject(NavController);
  private modalCtrl: ModalController = inject(ModalController);
  private fb: FormBuilder = inject(FormBuilder);
  private platform: Platform = inject(Platform);

  public SegmentType = SegmentType;
  public signUpForm!: FormGroup;
  public fabItems!: { icon: string, action : () => void }[];
  public isLogin: WritableSignal<boolean> = signal(false);

  public selectedSegment: WritableSignal<string> = signal(SegmentType.STANTDART);
  public options: WritableSignal<{ value: string, icon: string, label: string }[]> = signal([]);

  defaultLogin(): void {
    this.selectedSegment.set(SegmentType.STANTDART);
    if (this.selectedSegment() === SegmentType.STANTDART) {
      this.updateOptionLabel('standard', 'Увійти');
      this.isLogin.set(true);
    }
  }

  private updateOptionLabel(value: string, newLabel: string): void {
    this.options.update(options => {
      return options.map(option => {
        if (option.value === value) {
          return { ...option, label: newLabel };
        }
        return option;
      });
    });
  }

  handleFab(): void {
    this.isLogin.set(false);
    this.selectedSegment.set(SegmentType.STANTDART);

    this.updateOptionLabel('standard', 'Реєстрація');
  }

  googleSSO(): void {
    this.selectedSegment.set(SegmentType.GOOGLE);

    if (this.selectedSegment() === SegmentType.GOOGLE) {
      this.updateOptionLabel('standard', 'Увійти');
      this.isLogin.set(true);
    }
  }

  iosLogin(): void {
    this.selectedSegment.set(SegmentType.APPLE);

    if (this.selectedSegment() === SegmentType.APPLE) {
      this.updateOptionLabel('standard', 'Увійти');
      this.isLogin.set(true);
    }
  }

  androidLogin(): void {
    this.selectedSegment.set(SegmentType.ANDROID);

    if (this.selectedSegment() === SegmentType.ANDROID) {
      this.updateOptionLabel('standard', 'Увійти');
      this.isLogin.set(true);
    }
  }

  navigateBack(): void {
    this.modalCtrl.dismiss();
    this.navCtrl.back();
  }

  initSignUpForm(): void {
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  checkNativeDevice(): void {
    const isAndroidDevice: boolean = this.platform.is('android');
    const isIOSDevice: boolean = this.platform.is('ios');

    this.options.set([
      { value: 'standard', icon: 'person-outline', label: 'Реєстрація' },
      { value: 'google', icon: 'logo-google', label: 'Увійти з Google' },
      { value: 'apple', icon: 'logo-apple', label: 'Увійти з Apple', isVisible: isIOSDevice },
      { value: 'android', icon: 'logo-android', label: 'Увійти з Android', isVisible: isAndroidDevice }
    ].filter(option => option.isVisible !== false))
  }

  initIonFab(): void {
    const isAndroidDevice: boolean = this.platform.is('android');
    const isIOSDevice: boolean = this.platform.is('ios');

    this.fabItems = [
      { icon: 'log-in-outline', action: this.defaultLogin.bind(this) },
      { icon: 'logo-google', action: this.googleSSO.bind(this) },
      { icon: 'logo-apple', action: this.iosLogin.bind(this), isVisible: isIOSDevice },
      { icon: 'logo-android', action: this.androidLogin.bind(this), isVisible: isAndroidDevice },
    ].filter(fab => fab.isVisible !== false)
  }
  ngOnInit(): void {
    this.initSignUpForm();
    this.checkNativeDevice();
    this.initIonFab()
  }

  ngAfterViewInit(): void {

  }

  constructor() {}
}
