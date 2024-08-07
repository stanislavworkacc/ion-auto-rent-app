import {Directive, HostListener, ElementRef, Output, EventEmitter} from '@angular/core';

@Directive({
  selector: '[limitEngine]',
  standalone: true
})
export class LimitEngineVolumeDirective {

  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();
  @HostListener('input', ['$event']) onInputChange(event) {
    this.processInput(event);
  }

  @HostListener('ionBlur', ['$event']) onBlur(event) {
    const input = this.el.nativeElement;
    let value = input.value;

    if (value.match(/^\d\.$/)) {
      value += '0';
      input.value = value;
      this.valueChange.emit(value);
    }
  }

  private processInput(event) {
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
    this.valueChange.emit(input.value);

    if (value !== input.value) {
      event.stopPropagation();
    }
  }
  constructor(private el: ElementRef) {}
}
