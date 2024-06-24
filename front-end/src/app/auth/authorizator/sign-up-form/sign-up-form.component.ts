import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component, effect, ElementRef,
  inject,
  input,
  InputSignal,
  OnInit,
  signal, ViewChild,
  WritableSignal
} from '@angular/core';
import {SwitcherComponent} from "../../../shared/ui-kit/components/switcher/switcher.component";
import {LocalLoaderComponent} from "../../../shared/ui-kit/components/local-loader/local-loader.component";
import {NgIf} from "@angular/common";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ValidateInputDirective} from "../../../shared/directives/validate-input.directive";
import {matchingPasswordsValidator} from "../../../shared/utils/validators/matchingPasswordValidator";
import {PrivacyPolicyComponent} from "../privacy-policy/privacy-policy.component";
import {IonButton, IonIcon, IonInput, IonLabel, IonList, IonSpinner, ModalController} from "@ionic/angular/standalone";
import {PhoneNumberFormatterDirective} from "../../../shared/directives/phone-formatter.directive";
import {AuthService} from "../../../shared/services/auth-service";
import {StorageService} from "../../../shared/services/storage.service";
import {ToasterService} from "../../../shared/components/app-toast/toaster.service";
import {delay, take, tap} from "rxjs";
import {catchError} from "rxjs/operators";
import {of} from "rxjs/internal/observable/of";

@Component({
  selector: 'sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss'],
  standalone: true,
  imports: [
    SwitcherComponent,
    LocalLoaderComponent,
    NgIf,
    ReactiveFormsModule,
    ValidateInputDirective,
    PrivacyPolicyComponent,
    IonList,
    IonLabel,
    IonIcon,
    IonSpinner,
    IonInput,
    IonButton,
    PhoneNumberFormatterDirective
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpFormComponent implements OnInit {

  private fb: FormBuilder = inject(FormBuilder);
  private authService: AuthService = inject(AuthService);
  private cdRef: ChangeDetectorRef = inject(ChangeDetectorRef);
  private toaster: ToasterService = inject(ToasterService);
  private modalCtrl: ModalController = inject(ModalController);

  @ViewChild('passwordInput', {static: false}) passwordInput!: ElementRef;

  public isLogin: InputSignal<boolean> = input(false);
  public loginByPhone: WritableSignal<boolean> = signal(false);
  public form!: FormGroup;
  public name!: FormControl;
  public email!: FormControl;
  public phone!: FormControl;
  public password!: FormControl;
  public confirmPassword!: FormControl;
  public isFocused: { [key: string]: boolean } = {
    name: false,
    google: false,
    lockOpen: false,
    lockClosed: false,
    phone: false,
  };
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  onFocus(field: string): void {
    this.isFocused[field] = true;
  }

  onBlur(field: string): void {
    this.isFocused[field] = false;
  }

  onSubmit() {

    this.initLogin();
  }

  initLogin(): void {
    this.authService.login({
      "email": "test@gmail3.com",
      "password": "testTets"
    }).pipe(
      tap((res) => {
        if (res.status === 404 || !res.data.success) {
          throw new Error(res.data.message || 'Вхід неуспішний, спробуйте ще раз.');
        } else {
          this.toaster.show({type: 'success', message: 'Ви увійшли! Ласкаво просимо до вашого облікового запису.'});
        }
      }),
      catchError((error) => {
        this.toaster.show({type: 'error', message: error.message});
        return of(null);
      }),
    ).subscribe();
  }


  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  toggleShowConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  assignFormControls(): void {
    this.name = this.form.get('name') as FormControl;
    this.email = this.form.get('email') as FormControl;
    this.phone = this.form.get('phone') as FormControl;
    this.password = this.form.get('password') as FormControl;
    this.confirmPassword = this.form.get('confirmPassword') as FormControl;
  }

  onToggleChange(isMobileLogin: boolean): void {
    this.loginByPhone.set(isMobileLogin);
  }

  initForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.minLength(14)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, {validator: matchingPasswordsValidator('password', 'confirmPassword')});

    this.assignFormControls();
  }

  resetForm() {
    this.form.reset();
    this.form.markAsUntouched()
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key)?.setErrors(null);
      this.form.get(key)?.markAsPristine();
      this.form.get(key)?.markAsUntouched();
      this.form.get(key)?.updateValueAndValidity();
    });

    this.cdRef.markForCheck()
  }

  ngOnInit(): void {
    this.initForm();
  }

  constructor() {
    effect((): void => {
      if (this.isLogin() || !this.isLogin()) {
        this.resetForm();
        this.onToggleChange(false)
      }
    }, {allowSignalWrites: true})
  }
}
