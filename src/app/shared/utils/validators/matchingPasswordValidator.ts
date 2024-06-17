import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";

export function matchingPasswordsValidator(controlName: string, matchingControlName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const formGroup = control as FormGroup;
    const passwordControl = formGroup.controls[controlName];
    const confirmPasswordControl = formGroup.controls[matchingControlName];

    if (!passwordControl || !confirmPasswordControl) {
      return { controlNotFound: true };
    }

    if (confirmPasswordControl.errors && !confirmPasswordControl.errors['matchingPasswords']) {
      return null;
    }

    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ matchingPasswords: true });
      return { matchingPasswords: true };
    } else {
      confirmPasswordControl.setErrors(null);
      return null;
    }
  };
}


