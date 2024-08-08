import {ChangeDetectionStrategy, Component, inject, Input, OnInit, signal, WritableSignal} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {
  AlertController, IonButton,
  IonFab,
  IonFabButton,
  IonIcon,
  IonInput,
  IonLabel,
  IonSpinner, PopoverController
} from "@ionic/angular/standalone";
import {PhoneNumberFormatterDirective} from "../../../../../../shared/directives/phone-formatter.directive";
import {ValidateInputDirective} from "../../../../../../shared/directives/validate-input.directive";
import {matchingPasswordsValidator} from "../../../../../../shared/utils/validators/matchingPasswordValidator";
import {StorageService} from "../../../../../../shared/services/storage.service";
import {ProfileEditService} from "../profile-edit.service";
import {PassportComponent} from "./passport/passport.component";
import {InnComponent} from "./inn/inn.component";
import {DriverLicenceComponent} from "./driver-licence/driver-licence.component";
import {DOC_TYPE} from "./profile-form.enums";
import {AuthService} from "../../../../../../shared/services/auth-service";
import {RippleBtnComponent} from "../../../../../../shared/components/buttons/ripple-btn/ripple-btn.component";
import {ToasterService} from "../../../../../../shared/components/app-toast/toaster.service";
import {take, tap} from "rxjs";
import {filter} from "rxjs/operators";
import {
  PhoneCodesComponent
} from "../../../../../../shared/components/filters/modals/phone-codes/phone-codes.component";
import {codes} from "../../../../../../shared/utils/phone-codes";
import {MainActionComponent} from "../../../../../../shared/components/buttons/main-action/main-action.component";
import {AsyncPipe, JsonPipe} from "@angular/common";

@Component({
  selector: 'profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    IonIcon,
    IonInput,
    IonLabel,
    IonSpinner,
    PhoneNumberFormatterDirective,
    ReactiveFormsModule,
    ValidateInputDirective,
    IonFab,
    IonFabButton,
    PassportComponent,
    InnComponent,
    DriverLicenceComponent,
    IonButton,
    RippleBtnComponent,
    MainActionComponent,
    JsonPipe,
    AsyncPipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileFormComponent implements OnInit {
  protected readonly DOC_TYPE = DOC_TYPE;

  @Input() isBlurred: WritableSignal<boolean> = signal(true)

  private storage: StorageService = inject(StorageService);
  private fb: FormBuilder = inject(FormBuilder);
  private profileEditService: ProfileEditService = inject(ProfileEditService);
  private authService: AuthService = inject(AuthService);
  private toasterService: ToasterService = inject(ToasterService);
  private popoverCtrl: PopoverController = inject(PopoverController);

  public passwordBlurred: WritableSignal<boolean> = signal(true);
  private clearPasswords: WritableSignal<boolean> = signal(false);
  private clearSubmitBtn: WritableSignal<boolean> = signal(false)
  public userModel: WritableSignal<{
    _id: string,
    email: string,
    phone: string,
    userName: string,
    userLastName: string,
    ssoUser: boolean
  }> = signal(null);
  public countryPhone: WritableSignal<string> = signal('+380');

  public form!: FormGroup;
  public userName!: FormControl;
  public userLastName!: FormControl;
  public userSurname!: FormControl;
  public passport!: FormControl;
  public email!: FormControl;
  public phone!: FormControl;
  public password!: FormControl;
  public confirmPassword!: FormControl;
  public isFocused: { [key: string]: boolean } = {
    userName: false,
    userLastName: false,
    userSurname: false,
    // passport: false,
    google: false,
    lockOpen: false,
    lockClosed: false,
    phone: false,
  };
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  get profile() {
    return this.profileEditService;
  }

  get auth() {
    return this.authService;
  }

  get toaster() {
    return this.toasterService;
  }

  get userInfoDirty() {
    return (this.form.get('userName').dirty ||
      this.form.get('userLastName').dirty ||
      this.form.get('userSurname').dirty ||
      this.form.get('phone').dirty ||
      this.form.get('email').dirty)
  }

  get userPasswordDirty() {
    return (this.form.get('password').dirty ||
      this.form.get('confirmPassword').dirty) && !this.clearPasswords()
  }

  onFocus(field: string): void {
    this.isFocused[field] = true;
  }

  onBlur(field: string): void {
    this.isFocused[field] = false;
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleShowConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  updateStorageData = (res): void => {
    const keys: string[] = ['_id', 'email', 'phone', 'ssoUser', 'userName', 'userLastName', 'ssoUser'];
    const userData: {} = {};

    keys.forEach((key: string): void => {
      userData[key] = res?.data?.result?.[key];
    });

    this.storage.setObject('user', userData);
  }

  initToaster = (res) => {
    switch (res?.data?.success) {
      case true:
        this.toaster.show({type: 'success', message: 'Зміни успішно внесено.'});
        break;
      case false:
        this.toaster.show({type: 'error', message: 'Не вдалося внести зміни.'});
        break;
    }
  }

  async confirmEditPassword(input): Promise<void> {
    if (this.userModel().ssoUser) {
      this.passwordBlurred.set(false);
      return;
    }

    if (this.passwordBlurred()) {

      await this.auth.confirmPassword(this.userModel()._id)
        .then((confirmed: boolean): void => {
          switch (confirmed) {
            case true:
              this.passwordBlurred.set(false);
              input.setFocus()
              break;
            case false:
              this.passwordBlurred.set(true);
              break;
          }
        })
    }
  }

  initEditUser(): void {
    if (this.userName.valid &&
      this.userLastName.valid &&
      this.userSurname.valid &&
      this.phone.valid &&
      this.email.valid
    ) {
      this.profile.editUser(this.form.getRawValue(), this.userModel()._id).pipe(
        filter((res) => res['data'].success),
        tap(this.updateStorageData),
        tap(this.initToaster),
      ).subscribe()
    } else {
      this.toaster.show({type: 'warning', message: 'Будь ласка, переконайтеся, що всі поля заповнені коректно'})
    }
  }

  async changePassword(): Promise<void> {
    if (this.password.valid && this.confirmPassword.valid) {
      this.auth.initPasswordChange(this.password.value, this.userModel()._id)
        .pipe(
          take(1),
          filter((res) => res.data.success),
          tap(this.updateStorageData),
          tap(this.initToaster),
          tap(() => this.resetPasswords()))
        .subscribe()
    } else {
      this.toaster.show({type: 'warning', message: 'Будь ласка, переконайтеся, що поля паролю заповнені коректно'})
    }
  }

  resetPasswords(): void {
    this.form.get('password').reset();
    this.form.get('confirmPassword').reset();

    this.form.get('password').markAsPristine();
    this.form.get('confirmPassword').markAsPristine();

    this.form.get('password').markAsUntouched();
    this.form.get('confirmPassword').markAsUntouched();
    this.clearPasswords.set(true);
  }

  async openDoc(docType: string): Promise<void> {
    switch (docType) {
      case DOC_TYPE.PASSPORT :
        const modal: HTMLIonModalElement = await this.profile.openPassport();
        await this.handlePassportData(modal)
        break;
      case DOC_TYPE.INN :
        break;
      case DOC_TYPE.DRIVER_LICENCE :
        break;
    }
  }

  async handlePassportData(modal: HTMLIonModalElement): Promise<void> {
    await modal.present()
  }

  async openCodes(ev: Event): Promise<void> {
    const popover: HTMLIonPopoverElement = await this.popoverCtrl.create({
      component: PhoneCodesComponent,
      cssClass: 'phones-popover',
      event: ev,
      translucent: true,
      componentProps: {codes},
    });

    await popover.present();

    const {data} = await popover.onDidDismiss();
    if (data) {
      this.countryPhone.set(data.code);
      this.form.get('phone').markAsDirty();
      this.form.get('phone').markAsTouched();
    }
  }

  assignFormControls(): void {
    this.userName = this.form.get('userName') as FormControl;
    this.userLastName = this.form.get('userLastName') as FormControl;
    this.userSurname = this.form.get('userSurname') as FormControl;
    this.email = this.form.get('email') as FormControl;
    // this.passport = this.form.get('passport') as FormControl;
    this.phone = this.form.get('phone') as FormControl;
    this.password = this.form.get('password') as FormControl;
    this.confirmPassword = this.form.get('confirmPassword') as FormControl;
  }

  async setUserData(): Promise<void> {
    const user = await this.storage.getObject('user');
    this.userModel.set(user);

    if (this.userModel()) {
      const {userName, userLastName, email, phone} = this.userModel();
      this.form.patchValue({
        userName,
        userLastName,
        email,
        phone,
      });
    }
  }

  initForm(): void {
    this.form = this.fb.group({
      userName: ['', Validators.required],
      userLastName: [''],
      userSurname: [''],
      // passport: ['', Validators.required],
      phone: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, {validator: matchingPasswordsValidator('password', 'confirmPassword')});

    this.assignFormControls();
  }

  async ngOnInit(): Promise<void> {
    this.initForm();
    await this.setUserData();
  }
}
