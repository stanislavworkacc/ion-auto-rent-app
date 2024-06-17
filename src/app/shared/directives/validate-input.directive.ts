import {
  Directive,
  Input,
  OnInit,
  ElementRef,
  Renderer2,
  OnDestroy,
  DestroyRef,
  inject,
  AfterViewInit,
} from '@angular/core';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {map} from "rxjs/operators";

@Directive({
  selector: '[appValidateInput]',
  standalone: true,
})
export class ValidateInputDirective implements OnInit, OnDestroy, AfterViewInit {
  @Input() control: any;
  @Input() errorMessages: { [key: string]: string } = {};
  @Input('appValidateInput') ref: any;

  private errorDiv!: HTMLElement;
  private destroyRef: DestroyRef = inject(DestroyRef);
  private defaultErrorMessages: { [key: string]: string } = {
    required: 'Поле обов\'язкове до заповнення.',
    maxlength: 'Максимальну кількість символів досягнуто.',
    minlength: 'Мінімальна кількість символів не досягнута.',
    email: 'Введіть дійсну адресу електронної пошти.',
    min: 'Значення повинно бути не менше ${min}.',
    max: 'Значення повинно бути не більше ${max}.',
    phoneLength: 'Стандартизована довжина телефону 9 символів.'
  };

  controlSubscription(): void {
    this.control?.statusChanges.pipe(
      takeUntilDestroyed(this.destroyRef),
      map(() => this.setErrorMessages())
    ).subscribe();

    this.control?.valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef),
      map(() => this.setErrorMessages())
    ).subscribe();

    this.setErrorMessages();
  }
  createErrorDiv(): void {
    this.errorDiv = this.renderer.createElement('div');
    this.renderer.setStyle(this.errorDiv, 'color', 'red');
    this.renderer.setStyle(this.errorDiv, 'font-size', '14px');
    this.renderer.setStyle(this.errorDiv, 'min-height', '1.4em');
    this.renderer.setStyle(this.errorDiv, 'opacity', '0');
    this.renderer.setStyle(this.errorDiv, 'transition', 'opacity 0.5s ease, transform 0.5s ease');
    this.renderer.appendChild(this.el.nativeElement.parentNode, this.errorDiv);
  }

  private setErrorMessages(): void {
    const errors: any = this.control?.errors;
    const touchedOrDirty = this.control?.touched || this.control?.dirty;

    if (touchedOrDirty && errors) {
      this.renderer.addClass(this.el.nativeElement, 'invalid-input');
      const firstErrorKey = Object.keys(errors).find(key => key !== 'minlength' && key !== 'maxlength') || Object.keys(errors)[0];
      let message = this.errorMessages[firstErrorKey] || this.defaultErrorMessages[firstErrorKey];

      if (firstErrorKey === 'max') {
        message = message.replace(`\${${firstErrorKey}}`, errors?.max?.max);
      }

      if (firstErrorKey === 'min') {
        message = message.replace(`\${${firstErrorKey}}`, errors?.min?.min);
      }

      this.renderer.setProperty(this.errorDiv, 'textContent', message);
      this.renderer.setStyle(this.errorDiv, 'opacity', '1');
      this.renderer.setStyle(this.errorDiv, 'transform', 'translateY(0)');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'invalid-input');
      this.renderer.setProperty(this.errorDiv, 'textContent', '');
      this.renderer.setStyle(this.errorDiv, 'opacity', '0');
      this.renderer.setStyle(this.errorDiv, 'transform', 'translateY(-10px)');
    }
  }

  markControlAsTouchedAndValidate() {
    this.control.markAsTouched();
    this.setErrorMessages();
  }

  ngAfterViewInit(): void {
    if (this.ref) {
      this.renderer.listen(this.ref, 'ionBlur', () => {
        this.setErrorMessages();
      });
    } else {
      console.error('No listener provided in ValidateInputDirective');
    }
  }

  ngOnInit(): void {
    this.createErrorDiv()
    this.controlSubscription()
  }

  ngOnDestroy(): void {
    if (this.errorDiv) {
      this.renderer.removeChild(this.el.nativeElement.parentNode, this.errorDiv);
    }
  }

  constructor(private el: ElementRef, private renderer: Renderer2) {}
}
