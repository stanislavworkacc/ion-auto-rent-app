import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[limitEngine]',
  standalone: true
})
export class LimitEngineVolumeDirective {

  constructor(private el: ElementRef) {}
  @HostListener('input', ['$event']) onInputChange(event) {
    const input = this.el.nativeElement;
    let value = input.value;

    value = value.replace(/[^0-9]/g, '');

    if (value.length >= 1) {
      value = value.substring(0, 1) + '.' + value.substring(1, 3);
    }

    if (event.inputType === 'deleteContentBackward') {
      value = '';
    }

    input.value = value;

    if (value !== input.value) {
      event.stopPropagation();
    }
  }
}
