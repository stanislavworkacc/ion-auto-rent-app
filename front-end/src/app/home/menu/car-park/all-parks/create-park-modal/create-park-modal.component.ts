import {ChangeDetectionStrategy, Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {BackButtonComponent} from "../../../../../shared/ui-kit/components/back-button/back-button.component";
import {CloseBtnComponent} from "../../../../../shared/ui-kit/components/close-btn/close-btn.component";
import {
  CompaniesMarqueeComponent
} from "../../../../../auth/authorizator/auth-form-wrapper/companies-marquee/companies-marquee.component";
import {
  IonAvatar, IonButton,
  IonButtons,
  IonContent,
  IonHeader, IonIcon, IonInput,
  IonItem, IonLabel, IonSpinner,
  IonToolbar,
  ModalController
} from "@ionic/angular/standalone";
import {SegmentsComponent} from "../../../../../shared/ui-kit/components/segments/segments.component";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {ValidateInputDirective} from "../../../../../shared/directives/validate-input.directive";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {matchingPasswordsValidator} from "../../../../../shared/utils/validators/matchingPasswordValidator";
import {of} from "rxjs/internal/observable/of";
import {delay, tap} from "rxjs";
import {UploadBtnComponent} from "./upload-btn/upload-btn.component";

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
    UploadBtnComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateParkModalComponent  implements OnInit {

  private modalCtrl: ModalController = inject(ModalController);
  private fb: FormBuilder = inject(FormBuilder);

  public form!: FormGroup;
  public name!: FormControl;
  public address!: FormControl;
  public isFocused: { [key: string]: boolean } = {
    name: false,
    address: false,
  };

  logoUploaded: WritableSignal<boolean> = signal(false);
  logoUploading: WritableSignal<boolean> = signal(false);
  uploadProgress: WritableSignal<number>  = signal(0);

  uploadedLogoUrl: string = '';

  onFocus(field: string): void {
    this.isFocused[field] = true;
  }

  onBlur(field: string): void {
    this.isFocused[field] = false;
  }

  closeModal(): void {
    this.modalCtrl.dismiss()
  }
  handleFileUpload(event: any) {
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

}
