import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
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
    ReactiveFormsModule
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

  onFocus(field: string): void {
    this.isFocused[field] = true;
  }

  onBlur(field: string): void {
    this.isFocused[field] = false;
  }

  closeModal(): void {
    this.modalCtrl.dismiss()
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
