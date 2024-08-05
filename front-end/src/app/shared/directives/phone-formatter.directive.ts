import {Directive, ElementRef, HostListener} from "@angular/core";

@Directive({
  selector: '[phoneFormatter]',
  standalone: true
})
export class PhoneNumberFormatterDirective {

  constructor(private el: ElementRef) {}

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (this.isInvalidKey(event)) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }

  @HostListener('ionInput', ['$event'])
  onInput(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    const cleanedInputValue = this.cleanPhoneNumber(input.value);

    if (input.value !== cleanedInputValue) {
      input.value = cleanedInputValue;
    }
  }

  private isInvalidKey(event: KeyboardEvent): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if ((charCode < 48 || charCode > 57) && charCode !== 8 && charCode !== 46 && (charCode < 37 || charCode > 40)) {
      return true;
    }
    return false;
  }

  private cleanPhoneNumber(value: string): string {
    return value.replace(/\D/g, '');
  }
}
