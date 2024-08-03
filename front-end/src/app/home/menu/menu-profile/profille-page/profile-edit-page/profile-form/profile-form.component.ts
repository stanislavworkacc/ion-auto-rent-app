import {ChangeDetectionStrategy, Component, inject, Input, OnInit, signal, WritableSignal} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {
  AlertController, IonButton,
  IonFab,
  IonFabButton,
  IonIcon,
  IonInput,
  IonLabel,
  IonSpinner
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
    RippleBtnComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileFormComponent  implements OnInit {

  private storage: StorageService = inject(StorageService);
  private fb: FormBuilder = inject(FormBuilder);
  private profileEditService: ProfileEditService = inject(ProfileEditService);
  private alertCtrl: AlertController = inject(AlertController);
  private authService: AuthService = inject(AuthService);

  @Input() isBlurred: WritableSignal<boolean> = signal(true)

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
  passwordBlurred: WritableSignal<boolean> = signal(true);

  protected readonly DOC_TYPE = DOC_TYPE;

  get profile() {
    return this.profileEditService;
  }

  get auth() {
    return this.authService;
  }

  get userInfoDirty() {
    return this.form.get('userName').dirty ||
      this.form.get('userLastName').dirty ||
      this.form.get('userSurname').dirty ||
      this.form.get('phone').dirty ||
      this.form.get('email').dirty;
  }

  get userPasswordDirty() {
    return this.form.get('password').dirty ||
      this.form.get('confirmPassword').dirty
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

  async confirmEditPassword(): Promise<void> {
    const user = await this.storage.getObject('user');

    await this.auth.confirmPassword(user._id)
      .then((confirmed: boolean): void => {
        this.isBlurred.set(confirmed);
        // debugger;
      })
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

  initForm(): void {
    this.form = this.fb.group({
      userName: ['', Validators.required],
      userLastName: [''],
      userSurname: [''],
      // passport: ['', Validators.required],
      phone: ['', [Validators.minLength(14)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, {validator: matchingPasswordsValidator('password', 'confirmPassword')});

    this.assignFormControls();
  }

  async setUserData(): Promise<void> {
    const user = await this.storage.getObject('user');

    if (user) {
      const { userName, userLastName, email } = user;
      this.form.patchValue({
        userName: userName,
        userLastName: userLastName,
        email: email
      });
    }
  }

  async saveChanges(): Promise<void> {
    this.phoneHandler();
    await this.profile.editUser(this.form.getRawValue())
  }

  async changePassword() {
    const user = await this.storage.getObject('user');

    if(this.password.valid && this.confirmPassword.valid) {
      this.auth.initPasswordChange(this.password.value, user._id).subscribe()
    }
  }

  // TODO: create service for handling phones of different countries
  phoneHandler() {
    let phone = this.phone.value;

    if (phone.length > 14) {
      phone = phone.substring(0, 14);
    }

    this.form.patchValue({ phone });
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

  async ngOnInit(): Promise<void> {
    this.initForm();
    await this.setUserData();
  }
}
