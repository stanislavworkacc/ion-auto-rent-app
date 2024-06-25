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
import {delay, Observable, take, tap} from "rxjs";
import {catchError} from "rxjs/operators";
import {of} from "rxjs/internal/observable/of";
import {handleError} from "../../../shared/utils/errorHandler";

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
  @ViewChild(ValidateInputDirective) appValidateInput: ValidateInputDirective;

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

  get auth() {
    return this.authService;
  }
  onFocus(field: string): void {
    this.isFocused[field] = true;
  }

  onBlur(field: string): void {
    this.isFocused[field] = false;
  }

  onSubmit(): void {
    const formValue = this.form.getRawValue();
    this.handleAuthProcess(formValue);
  }


  handleAuthProcess(formValue): void {
    if(this.isLogin()) {
      if((this.email.valid || this.phone.valid) && formValue.password && this.password.valid) {
        const loginData = this.prepareLoginData(formValue);
        this.initLogin(loginData);
      } else {
        this.toaster.show({type: 'warning', message: 'Будь ласка, введіть свої облікові дані, щоб увійти в систему.'})
      }
    } else {

      if(this.name.valid && this.email.valid && this.password.valid && this.confirmPassword.valid) {
        const registerData = this.prepareRegistrationData(formValue);
        this.initRegister(registerData);
      } else {
        this.toaster.show({type: 'warning', message: 'Будь ласка, заповінть усі необіхідні поля, щоб зареєструватись в системі.'})
      }
    }
  }

  prepareLoginData(formValue) {
    const loginData: any = { password: formValue.password };

    if (formValue.email) {
      loginData.email = formValue.email;
    } else if (formValue.phone) {
      loginData.phone = '+380' + formValue.phone;
    }

    return loginData;
  }

  prepareRegistrationData(formValue) {
    const registrationData: any = {
      userName: formValue.name,
      email: formValue.email,
      password: formValue.password === formValue.confirmPassword ? formValue.password : ''
    };

    return registrationData;
  }


  initLogin(data): void {
    this.auth.login(data).pipe(
      tap((res): void => {
        if (!res.data.success) {
          throw new Error(res.data.message);
        } else {
          this.showSuccessAuth();
        }
      }),
      catchError((error): any => handleError(error, this.toaster)),
    ).subscribe();
  }

  showSuccessAuth(): void {
    this.modalCtrl.dismiss();
    this.toaster.show({type: 'success', message: 'Ви увійшли! Ласкаво просимо до вашого облікового запису.'});
  }

  initRegister(data): void {
    this.auth.register(data).pipe(
      take(1),
      tap((res): void => {
        if (!res.data.success) {
          throw new Error(res.data.message);
        } else {
          this.showSuccessAuth();
        }
      }),
      catchError((error): any => handleError(error, this.toaster)),
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
    this.resetForm();
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
