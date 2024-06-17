import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {SwitcherComponent} from "../../../shared/ui-kit/components/switcher/switcher.component";
import {RxIf} from "@rx-angular/template/if";
import {LocalLoaderComponent} from "../../../shared/ui-kit/components/local-loader/local-loader.component";
import {NgIf} from "@angular/common";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ValidateInputDirective} from "../../../shared/directives/validate-input.directive";
import {matchingPasswordsValidator} from "../../../shared/utils/validators/matchingPasswordValidator";

@Component({
  selector: 'sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    SwitcherComponent,
    LocalLoaderComponent,
    RxIf,
    LocalLoaderComponent,
    NgIf,
    ReactiveFormsModule,
    ValidateInputDirective
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpFormComponent  implements OnInit {

  private fb: FormBuilder = inject(FormBuilder);

  public form!: FormGroup;
  public name!: FormControl;
  public email!: FormControl;
  public password!: FormControl;
  public confirmPassword!: FormControl;

  public isFocused: { [key: string]: boolean } = {
    name: false,
    google: false,
    lockOpen: false,
    lockClosed: false,
  };

  onFocus(field: string): void {
    this.isFocused[field] = true;
  }

  onBlur(field: string): void {
    this.isFocused[field] = false;
  }

  onSubmit(): void {

  }
  assignFormControls(): void {
    this.name = this.form.get('name') as FormControl;
    this.email = this.form.get('email') as FormControl;
    this.password = this.form.get('password') as FormControl;
    this.confirmPassword = this.form.get('confirmPassword') as FormControl;
  }

  initForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: matchingPasswordsValidator('password', 'confirmPassword') });

    this.assignFormControls();
  }
  ngOnInit(): void {
    this.initForm();
  }
  constructor() { }
}
