import {ChangeDetectionStrategy, Component, inject, OnInit, signal, ViewChild, WritableSignal} from '@angular/core';
import {
    AlertController,
    IonAlert,
    IonAvatar, IonBreadcrumb, IonBreadcrumbs,
    IonButton, IonButtons, IonChip,
    IonContent, IonFab, IonFabButton, IonFabList,
    IonHeader, IonIcon,
    IonInput,
    IonItem, IonItemDivider,
    IonLabel, IonList, IonPopover, IonRange, IonSearchbar, IonSpinner,
    IonTitle,
    IonToolbar
} from "@ionic/angular/standalone";
import {BackButtonComponent} from "../../../../../shared/ui-kit/components/back-button/back-button.component";
import {NotificationsPreviewComponent} from "../../notifications-preview/notifications-preview.component";
import {ActionSheetController, NavController} from "@ionic/angular";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass, NgForOf, NgStyle} from "@angular/common";
import {ValidateInputDirective} from "../../../../../shared/directives/validate-input.directive";
import {matchingPasswordsValidator} from "../../../../../shared/utils/validators/matchingPasswordValidator";
import {PhoneNumberFormatterDirective} from "../../../../../shared/directives/phone-formatter.directive";
import {BreadcrumbLabelPipe} from "../../../../../shared/breadcrumb-map-name.pipe";
import {BreadcrumbService} from "../../../../../shared/services/breadcrumb.service";
import {StorageService} from "../../../../../shared/services/storage.service";
import {ProfileEditService} from "./profile-edit.service";

@Component({
  selector: 'app-profile-edit-page',
  templateUrl: './profile-edit-page.component.html',
  styleUrls: ['./profile-edit-page.component.scss'],
  standalone: true,
    imports: [
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonItem,
        IonLabel,
        IonInput,
        IonButton,
        BackButtonComponent,
        IonAvatar,
        IonButtons,
        NotificationsPreviewComponent,
        IonRange,
        FormsModule,
        NgStyle,
        NgClass,
        IonIcon,
        IonSpinner,
        ValidateInputDirective,
        ReactiveFormsModule,
        PhoneNumberFormatterDirective,
        IonItemDivider,
        IonAlert,
        IonChip,
        IonPopover,
        IonList,
        BreadcrumbLabelPipe,
        IonBreadcrumb,
        IonBreadcrumbs,
        IonSearchbar,
        NgForOf,
        IonFab,
        IonFabButton,
        IonFabList,
    ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileEditPage implements OnInit {

  private navCtrl: NavController = inject(NavController);
  private alertCtrl: AlertController = inject(AlertController);
  private actionSheetCtrl: ActionSheetController = inject(ActionSheetController);
  private fb: FormBuilder = inject(FormBuilder);
  private breadcrumbs: BreadcrumbService = inject(BreadcrumbService);
  private storage: StorageService = inject(StorageService);
  private profileEditService: ProfileEditService = inject(ProfileEditService);

  public form!: FormGroup;
  public name!: FormControl;
  public lastName!: FormControl;
  public surname!: FormControl;
  public email!: FormControl;
  public phone!: FormControl;
  public password!: FormControl;
  public confirmPassword!: FormControl;
  public isFocused: { [key: string]: boolean } = {
    name: false,
    lastName: false,
    surname: false,
    google: false,
    lockOpen: false,
    lockClosed: false,
    phone: false,
  };

  public collapsedBreadcrumbs: any[] = [];
  public isBreadCrumbPopoverOpen: boolean = false;

  @ViewChild('popover') popover;

  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  passwordBlurred: WritableSignal<boolean> = signal(true);
  isBlurred: WritableSignal<boolean> = signal(true);

  get breadcrumbsService() {
    return this.breadcrumbs;
  }

  get profile() {
    return this.profileEditService;
  }

  goBack(): void {
    this.navCtrl.back()
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


  async openActionSheet(): Promise<void> {
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Редагувати профіль',
          handler: () => {
            this.isBlurred.set(false);
          }
        },
        {
          text: 'Видалити профіль',
          handler: () => {
            this.deleteAccount();
          }
        },
        {
          text: 'Скасувати',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();
  }

  async deleteAccount(): Promise<void> {
    await this.profile.deleteAccount()
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

  async presentPopover(e: Event): Promise<void> {
    const eventDetail = (e as CustomEvent).detail;
    this.collapsedBreadcrumbs = this.breadcrumbsService.buildCollapsedBreadcrumbs(
      eventDetail.collapsedBreadcrumbs,
      ['/home'],
      [
        { url: '/home/menu/profile', label: 'Профіль' },
      ]
    );
    this.popover.event = e;
    this.isBreadCrumbPopoverOpen = true;
  }

  assignFormControls(): void {
    this.name = this.form.get('name') as FormControl;
    this.lastName = this.form.get('lastName') as FormControl;
    this.surname = this.form.get('surname') as FormControl;
    this.email = this.form.get('email') as FormControl;
    this.phone = this.form.get('phone') as FormControl;
    this.password = this.form.get('password') as FormControl;
    this.confirmPassword = this.form.get('confirmPassword') as FormControl;
  }

  initForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      surname: ['', Validators.required],
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
