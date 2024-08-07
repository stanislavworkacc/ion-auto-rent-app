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
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
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
  IonFabButton, IonFabList, IonFooter,
  IonHeader, IonIcon, IonLabel, IonProgressBar, IonSegment, IonSegmentButton, IonText,
  IonToolbar,
  ModalController
} from "@ionic/angular/standalone";
import {LogOutComponent} from "../../../home/menu/menu-profile/log-out/log-out.component";
import {CompaniesMarqueeComponent} from "./companies-marquee/companies-marquee.component";
import {AuthService} from "../../../shared/services/auth-service";
import {map} from "rxjs/operators";
import {combineLatest, Observable} from "rxjs";

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
    IonText,
    IonLabel,
    IonSegment,
    IonSegmentButton,
    IonFooter,
    LogOutComponent,
    CompaniesMarqueeComponent,
    IonProgressBar,
    AsyncPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AuthFormWrapperComponent implements OnInit, AfterViewInit {

  private navCtrl: NavController = inject(NavController);
  private modalCtrl: ModalController = inject(ModalController);
  private fb: FormBuilder = inject(FormBuilder);
  private platform: Platform = inject(Platform);
  private authService: AuthService = inject(AuthService);

  public isLogin: WritableSignal<boolean> = signal(false);
  public selectedSegment: WritableSignal<string> = signal(SegmentType.STANTDART);
  public options: WritableSignal<{ value: string, icon: string, label: string }[]> = signal([]);

  public SegmentType = SegmentType;
  public signUpForm!: FormGroup;
  public fabItems!: { icon: string, action: () => void }[];

  loading$: Observable<boolean>;

  defaultRegister(): void {
    this.selectedSegment.set(SegmentType.STANTDART);
    if (this.selectedSegment() === SegmentType.STANTDART) {
      this.updateOptionLabel('standard', 'Реєстрація');
      this.isLogin.set(false);
    }
  }

  get auth() {
    return this.authService;
  }

  get isLoading(): Observable<boolean> {
    return this.loading$;
  }

  handleFab(): void {
    this.isLogin.set(false);
    this.selectedSegment.set(SegmentType.STANTDART);

    this.updateOptionLabel('standard', 'Реєстрація');
  }

  onSegmentChanged(event: any): void {
    this.selectedSegment.update(() => event.detail.value);
  }

  googleSSO(): void {
    this.selectedSegment.set(SegmentType.GOOGLE);

    if (this.selectedSegment() === SegmentType.GOOGLE) {
      this.updateOptionLabel('standard', 'Реєстрація');
      this.isLogin.set(false);
    }
  }

  iosRegister(): void {
    this.selectedSegment.set(SegmentType.APPLE);

    if (this.selectedSegment() === SegmentType.APPLE) {
      this.updateOptionLabel('standard', 'Реєстрація');
      this.isLogin.set(false);
    }
  }

  androidRegister(): void {
    this.selectedSegment.set(SegmentType.ANDROID);

    if (this.selectedSegment() === SegmentType.ANDROID) {
      this.updateOptionLabel('standard', 'Реєстрація');
      this.isLogin.set(false);
    }
  }

  navigateBack(): void {
    this.resetLogin();
  }

  closeModal(): void {
    this.modalCtrl.dismiss().then((): void => {
      this.navCtrl.navigateForward('home/menu');
    })
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
      {value: SegmentType.STANTDART, icon: 'person-outline', label: 'Реєстрація', isVisible: true},
      {value: SegmentType.GOOGLE, icon: 'logo-google', label: 'Увійти з Google', isVisible: true},
      // {value: SegmentType.APPLE, icon: 'logo-apple', label: 'Увійти з Apple', isVisible: isIOSDevice},
      // {value: SegmentType.ANDROID, icon: 'logo-android', label: 'Увійти з Android', isVisible: isAndroidDevice}
    ].filter(option => option.isVisible !== false))
  }

  initIonFab(): void {
    const isAndroidDevice: boolean = this.platform.is('android');
    const isIOSDevice: boolean = this.platform.is('ios');

    this.fabItems = [
      {icon: 'log-in-outline', action: this.defaultRegister.bind(this)},
      {icon: 'logo-google', action: this.googleSSO.bind(this)},
      // {icon: 'logo-apple', action: this.iosRegister.bind(this), isVisible: isIOSDevice},
      // {icon: 'logo-android', action: this.androidRegister.bind(this), isVisible: isAndroidDevice},
    ]
  }

  resetLogin(): void {
    this.isLogin.set(true)
    this.updateOptionLabel('standard', 'Увійти');
    this.selectedSegment.set(SegmentType.STANTDART);
  }

  ngOnInit(): void {
    this.initSignUpForm();
    this.checkNativeDevice();
    this.initIonFab();

    this.resetLogin();
  }

  ngAfterViewInit(): void {

  }

  private updateOptionLabel(value: string, newLabel: string): void {
    this.options.update(options => {
      return options.map(option => {
        if (option.value === value) {
          return {...option, label: newLabel};
        }
        return option;
      });
    });
  }

  constructor() {
    this.loading$ = combineLatest([
      this.auth.loginEntity.loading$,
      this.auth.registerEntity.loading$,
      this.auth.loginGoogleSsoEntity.loading$
    ]).pipe(
      map(([loginLoading, registerLoading, googleSsoLoading]) =>
        loginLoading || registerLoading || googleSsoLoading
      )
    );
  }
}
