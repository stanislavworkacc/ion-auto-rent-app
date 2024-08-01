import {ChangeDetectionStrategy, Component, inject, Input, OnInit, signal, WritableSignal} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {
  AlertController,
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
    DriverLicenceComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileFormComponent  implements OnInit {

  private storage: StorageService = inject(StorageService);
  private fb: FormBuilder = inject(FormBuilder);
  private profileEditService: ProfileEditService = inject(ProfileEditService);
  private alertCtrl: AlertController = inject(AlertController);

  @Input() isBlurred: WritableSignal<boolean> = signal(true)

  public form!: FormGroup;
  public name!: FormControl;
  public lastName!: FormControl;
  public surname!: FormControl;
  public passport!: FormControl;
  public email!: FormControl;
  public phone!: FormControl;
  public password!: FormControl;
  public confirmPassword!: FormControl;
  public isFocused: { [key: string]: boolean } = {
    name: false,
    lastName: false,
    surname: false,
    passport: false,
    google: false,
    lockOpen: false,
    lockClosed: false,
    phone: false,
  };
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  passwordBlurred: WritableSignal<boolean> = signal(true);

  get profile() {
    return this.profileEditService;
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
    const alert: HTMLIonAlertElement = await this.alertCtrl.create({
      header: 'Введіть пароль',
      inputs: [
        {
          name: 'password',
          type: 'password',
          placeholder: 'Пароль'
        }
      ],
      buttons: [
        {
          text: 'Скасувати',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Підтвердити',
          role: 'confirm',
          handler: () => {
            this.passwordBlurred.set(false);
          }
        },
      ]
    });

    await alert.present();
  }

  assignFormControls(): void {
    this.name = this.form.get('name') as FormControl;
    this.lastName = this.form.get('lastName') as FormControl;
    this.surname = this.form.get('surname') as FormControl;
    this.email = this.form.get('email') as FormControl;
    this.passport = this.form.get('passport') as FormControl;
    this.phone = this.form.get('phone') as FormControl;
    this.password = this.form.get('password') as FormControl;
    this.confirmPassword = this.form.get('confirmPassword') as FormControl;
  }

  initForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      surname: ['', Validators.required],
      passport: ['', Validators.required],
      phone: ['', [Validators.required, Validators.minLength(14)]],
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
        name: userName,
        lastName: userLastName,
        email: email
      });
    }
  }

  async saveChanges() {
    await this.profile.editUser(this.form.getRawValue())
  }

  async ngOnInit(): Promise<void> {
    this.initForm();
    await this.setUserData();
  }

}
