import {Directive, ElementRef, HostListener} from "@angular/core";

@Directive({
  selector: '[phoneFormatter]',
  standalone: true
})
export class PhoneNumberFormatterDirective {
  private previousValue: string = '';

  constructor(private el: ElementRef) {}

  @HostListener('ionInput', ['$event'])
  onInput(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    const formattedInputValue = this.formatPhoneNumber(input.value);

    if (input.value !== this.previousValue) {
      input.value = formattedInputValue;
      this.previousValue = formattedInputValue;
    }
  }

  @HostListener('ionFocus', ['$event'])
  onFocus(event: FocusEvent): void {
    const input = event.target as HTMLInputElement;
    if (!input.value.startsWith('(')) {
      input.value = '(' + input.value;
    }
  }

  private formatPhoneNumber(value: string): string {
    const digits = value.replace(/\D/g, '');

    let formattedValue = '';

    if (digits.length > 0) {
      formattedValue += '(' + digits.substring(0, 2);
    }
    if (digits.length > 2) {
      formattedValue += ')';
    }
    if (digits.length > 2) {
      formattedValue += '-' + digits.substring(2, 5);
    }
    if (digits.length > 5) {
      formattedValue += '-' + digits.substring(5, 7);
    }
    if (digits.length > 7) {
      formattedValue += '-' + digits.substring(7, 9);
    }

    return formattedValue;
  }
}
