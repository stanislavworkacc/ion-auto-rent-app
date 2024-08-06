import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component, DestroyRef, effect,
  inject,
  OnInit, Renderer2,
  signal,
  ViewChild,
  WritableSignal
} from '@angular/core';
import {BackButtonComponent} from "../../../../../shared/ui-kit/components/back-button/back-button.component";
import {CloseBtnComponent} from "../../../../../shared/ui-kit/components/close-btn/close-btn.component";
import {
  CompaniesMarqueeComponent
} from "../../../../../auth/authorizator/auth-form-wrapper/companies-marquee/companies-marquee.component";
import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonContent, IonDatetime, IonDatetimeButton,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList, IonModal,
  IonPopover,
  IonProgressBar,
  IonRange,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonSpinner, IonText, IonTitle,
  IonToolbar,
  ModalController, PopoverController
} from "@ionic/angular/standalone";
import {SegmentsComponent} from "../../../../../shared/ui-kit/components/segments/segments.component";
import {NgForOf, NgIf, NgOptimizedImage, NgStyle} from "@angular/common";
import {ValidateInputDirective} from "../../../../../shared/directives/validate-input.directive";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {of} from "rxjs/internal/observable/of";
import {delay, tap} from "rxjs";
import {UploadBtnComponent} from "./upload-btn/upload-btn.component";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {filter} from "rxjs/operators";
import {GooglePlacesSerivce} from "../../../../../shared/services/google-places.serivce";
import {GooglePlacesComponent} from "../../../../../shared/components/google-places/google-places.component";
import {MainActionComponent} from "../../../../../shared/components/buttons/main-action/main-action.component";
import {ParkCardComponent} from "../park-card/park-card.component";
import {ScheduleRangeComponent} from "./schedule-range/schedule-range.component";
import {CreateEditParkModalService} from "./create-edit-park-modal.service";
import {StorageService} from "../../../../../shared/services/storage.service";
import {ToasterService} from "../../../../../shared/components/app-toast/toaster.service";

@Component({
  selector: 'app-create-park-modal',
  templateUrl: './create-park-modal.component.html',
  styleUrls: ['./create-park-modal.component.scss'],
  standalone: true,
  imports: [
    BackButtonComponent,
    CloseBtnComponent,
    CompaniesMarqueeComponent,
    IonButtons,
    IonHeader,
    IonToolbar,
    SegmentsComponent,
    IonContent,
    IonItem,
    IonAvatar,
    IonIcon,
    IonButton,
    NgOptimizedImage,
    IonLabel,
    NgIf,
    IonInput,
    IonSpinner,
    ValidateInputDirective,
    ReactiveFormsModule,
    UploadBtnComponent,
    IonProgressBar,
    IonPopover,
    IonRange,
    FormsModule,
    IonSelect,
    IonSelectOption,
    NgForOf,
    IonSearchbar,
    IonList,
    IonText,
    GooglePlacesComponent,
    IonTitle,
    MainActionComponent,
    ParkCardComponent,
    IonDatetime,
    IonDatetimeButton,
    IonModal,
    ScheduleRangeComponent,
    NgStyle
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateParkModalComponent implements OnInit, AfterViewInit {

  private modalCtrl: ModalController = inject(ModalController);
  private fb: FormBuilder = inject(FormBuilder);
  private googlePlacesService: GooglePlacesSerivce = inject(GooglePlacesSerivce);
  private destroyRef: DestroyRef = inject(DestroyRef);
  private renderer: Renderer2 = inject(Renderer2);
  private parkModalService: CreateEditParkModalService = inject(CreateEditParkModalService);
  private storage: StorageService = inject(StorageService);
  private toaster: ToasterService = inject(ToasterService);

  public form!: FormGroup;
  public name!: FormControl;
  public address!: FormControl;

  public isFocused: { [key: string]: boolean } = {
    name: false,
    address: false,
  };
  public uploadedLogoUrl: WritableSignal<string> = signal('');
  public formats: string[] = ['JPEG', 'WEBP', 'PNG', 'SVG', 'JPG'];

  public logoUploaded: WritableSignal<boolean> = signal(false);
  public logoUploading: WritableSignal<boolean> = signal(false);
  public uploadProgress: WritableSignal<number> = signal(0);

  public suggestions: WritableSignal<string[]> = signal([]);
  private userModel: WritableSignal<{
    _id: string,
    email: string,
    phone: string,
    userName: string,
    userLastName: string,
    ssoUser: boolean
  }> = signal(null);
  public parking: WritableSignal<any> = signal(
    {
      label: 'Назва автопарку',
      location: 'Адреса автопарку',
      contact: '+1234567890',
      schedule: '24/7',
      freeCars: 0,
      carsInRent: 0,
    },
  );

  parkTypes = [
    {
      value: 1,
      label: 'Авто та мото',
      icons: [
        {src: '/assets/icon/car-type-ico.png', height: '25px'},
        {src: '/assets/icon/moto-type-ico.png', height: '23px'},
        {src: '/assets/icon/truck-ico.png', height: '18px'}
      ]
    },
    {
      value: 4,
      label: 'Спец.техніка',
      icons: [
        {src: '/assets/icon/tractor-type-ico.png', height: '25px'},
        {src: '/assets/icon/bus-type-ico.png', height: '25px'},
        {src: '/assets/icon/trailer-type-ico.png', height: '25px'}
      ]
    },
    {
      value: 3,
      label: 'Водний транспорт',
      icons: [
        {src: '/assets/icon/water-vehicle-type.png', height: '25px'},
        {src: '/assets/icon/yach-type-ico.png', height: '18px'},
        {src: '/assets/icon/speedboat.png', height: '30px'}
      ]
    }
  ];
  selectedType: WritableSignal<number> = signal(0);

  @ViewChild('addressInput', {static: false}) addressInput!: IonInput;

  get parkService() {
    return this.parkModalService;
  }

  get scheduler() {
    return this.form.get('scheduler') as FormGroup;
  }

  selectParkType(type: number) {
    this.selectedType.set(type);
    this.form.patchValue({type: this.selectedType()});
  }

  onFocus(field: string): void {
    this.isFocused[field] = true;
  }

  onBlur(field: string): void {
    this.isFocused[field] = false;
  }

  closeModal(): void {
    this.modalCtrl.dismiss()
  }

  handleFileUpload(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.logoUploading.set(true);
      const reader: FileReader = new FileReader();

      reader.onload = (e: any) => {
        of(e.target.result)
          .pipe(
            delay(1000),
            tap((result) => {
              this.uploadedLogoUrl.set(result);
              this.logoUploaded.set(true);
              this.logoUploading.set(false);
              this.uploadProgress.set(0);

              this.form.patchValue({
                files: file
              });
            })
          )
          .subscribe();
      };

      reader.readAsDataURL(file);

      let progress: number = 0;
      const interval = setInterval(() => {
        if (progress < 100) {
          progress += 10;
          this.uploadProgress.set(progress);
        } else {
          clearInterval(interval);
        }
      }, 100);
    }
  }

  clearSelectedLogo(): void {
    this.uploadedLogoUrl.set('');
    this.logoUploaded.set(false);
    this.logoUploading.set(false);
    this.uploadProgress.set(0);
  }

  assignFormControls(): void {
    this.name = this.form.get('name') as FormControl;
    this.address = this.form.get('address') as FormControl;
  }

  initForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      address: ['', Validators.required],
      files: [null],
      scheduler: this.fb.group({
        open: ['08:00'],
        close: ['18:00']
      }),
      type: ['', Validators.required]
    });

    this.assignFormControls();
  }

  createFormData(formValue): FormData {
    const formData = new FormData();
    formData.append('name', formValue.name);
    formData.append('address', formValue.address);
    if (formValue.files) {
      formData.append('file', formValue.files, 'files');
    }
    formData.append('open', formValue.scheduler.open);
    formData.append('close', formValue.scheduler.close);
    formData.append('type', formValue.type);
    return formData;
  }

  submit(): void {
    // const park = this.form.getRawValue();
    const park = this.createFormData(this.form.value);
    // const park = this.form.value;


    if (this.form.valid) {
      this.parkService.initParkCreation(park, this.userModel()._id).pipe(
        tap((data) => {
          debugger
        })
      ).subscribe()
    } else {
      this.toaster.show(
        {
          type: 'warning',
          message: 'Будь ласка, заповінть усі необіхідні поля, щоб зареєструватись в системі.'
        })
    }
  }

  formSubscription() {
    this.form.valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef),
      tap((form) => {
        const updates: Partial<{ label: string; location: string }> = {};

        if (form.name) {
          updates.label = form.name;
        }

        if (form.address) {
          updates.location = form.address;
        }

        if (Object.keys(updates).length > 0) {
          this.parking.update((parking) => ({
            ...parking,
            ...updates,
          }));
        }

      })
    ).subscribe()
  }

  async setUserData(): Promise<void> {
    const user = await this.storage.getObject('user');
    this.userModel.set(user);
  }

  async ngOnInit(): Promise<void> {
    this.initForm();
    this.formSubscription();
    await this.setUserData();
  }

  initGooglePlaces(): void {
    this.googlePlacesService.googlePlacesLoaded$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter((loaded: boolean) => loaded),
      )
      .subscribe();

    this.googlePlacesService.loadGoogleSSOScript(this.renderer).subscribe();
  }

  fetchSuggestions(query: any): void {
    //@ts-ignore
    const autocompleteService = new google.maps.places.AutocompleteService();
    autocompleteService.getPlacePredictions({input: query}, (predictions, status) => {
      //@ts-ignore
      if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
        this.suggestions.set(predictions.map(prediction => prediction.description));
      }
    });
  }

  selectSuggestion(suggestion: string): void {
    this.address.setValue(suggestion);
    this.suggestions.set([]);
  }

  ngAfterViewInit(): void {
    this.initGooglePlaces();
  }

  protected readonly FormControl = FormControl;
}
