import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component, DestroyRef,
  ElementRef,
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
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPopover,
  IonProgressBar,
  IonRange,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonSpinner, IonText,
  IonToolbar,
  ModalController
} from "@ionic/angular/standalone";
import {SegmentsComponent} from "../../../../../shared/ui-kit/components/segments/segments.component";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {ValidateInputDirective} from "../../../../../shared/directives/validate-input.directive";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {matchingPasswordsValidator} from "../../../../../shared/utils/validators/matchingPasswordValidator";
import {of} from "rxjs/internal/observable/of";
import {delay, tap} from "rxjs";
import {UploadBtnComponent} from "./upload-btn/upload-btn.component";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {catchError, filter, map} from "rxjs/operators";
import {handleError} from "../../../../../shared/utils/errorHandler";
import {GoogleSsoService} from "../../../../../auth/authorizator/google-sso.service";
import {GooglePlacesSerivce} from "../../../../../shared/services/google-places.serivce";
import {GooglePlacesComponent} from "../../../../../shared/components/google-places/google-places.component";

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
    GooglePlacesComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateParkModalComponent  implements OnInit, AfterViewInit {

  private modalCtrl: ModalController = inject(ModalController);
  private fb: FormBuilder = inject(FormBuilder);
  private googlePlacesService: GooglePlacesSerivce = inject(GooglePlacesSerivce);
  private destroyRef: DestroyRef = inject(DestroyRef);
  private renderer: Renderer2 = inject(Renderer2);

  public form!: FormGroup;
  public name!: FormControl;
  public address!: FormControl;
  public isFocused: { [key: string]: boolean } = {
    name: false,
    address: false,
  };
  uploadedLogoUrl: string = '';

  logoUploaded: WritableSignal<boolean> = signal(false);
  logoUploading: WritableSignal<boolean> = signal(false);
  uploadProgress: WritableSignal<number>  = signal(0);

  suggestions: WritableSignal<string[]> = signal([]);

  @ViewChild('addressInput', { static: false }) addressInput!: IonInput;


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
              this.uploadedLogoUrl = result;
              this.logoUploaded.set(true);
              this.logoUploading.set(false);
              this.uploadProgress.set(0);
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
    this.uploadedLogoUrl = '';
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
      name: ['', Validators.required],
      address: [''],
    });

    this.assignFormControls();
  }
  ngOnInit(): void {
    this.initForm();
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
    autocompleteService.getPlacePredictions({ input: query }, (predictions, status) => {
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


}
