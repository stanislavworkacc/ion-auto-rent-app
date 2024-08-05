import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  signal,
  ViewChild,
  WritableSignal
} from '@angular/core';
import {
  IonButton,
  IonDatetime,
  IonDatetimeButton,
  IonIcon, IonInput,
  IonItem,
  IonLabel, IonModal,
  IonRadio,
  IonRadioGroup
} from "@ionic/angular/standalone";
import {SignaturePad, SignaturePadModule} from "angular2-signaturepad";
import {NgClass, NgForOf, NgStyle} from "@angular/common";

@Component({
  selector: 'urk-old-passport',
  templateUrl: './urk-old-passport.component.html',
  styleUrls: ['./urk-old-passport.component.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonItem,
    IonLabel,
    IonRadio,
    IonRadioGroup,
    IonDatetimeButton,
    IonDatetime,
    IonModal,
    IonInput,
    SignaturePadModule,
    NgStyle,
    NgClass,
    NgForOf,
    IonButton
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UrkOldPassportComponent  implements OnInit {

  public signatureImage: WritableSignal<string> = signal('');

  @ViewChild('signSvg') signSvg: ElementRef;
  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild(SignaturePad) signaturePad: SignaturePad;

  public signaturePadOptions: Object = {
    penColor: '#000',
    canvasHeight: 300,
    canvasWidth: 600,
    minWidth: 2,
  };

  signaturePadActions = [
    {
      label: 'Підпис',
      icon: 'assets/icon/svg/signature.svg',
      callback: () => this.fileInput.nativeElement.click(),
      bgColor: '#dbe8ff'
    },
    {
      label: 'Стерти',
      icon: 'assets/icon/svg/eraser.svg',
      callback: () => this.clearSignature(),
      bgColor: '#f8f8ff'
    },
  ];

  clearSignature() {

  }

  drawComplete(): void {
    this.signatureImage.set(this.signaturePad.toDataURL());
  }

  hideSignSvg() {
    this.signSvg.nativeElement.style.display = 'none';
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        // this.signatureImage.set(reader.result);
        // this.pdfReset();
        // this.generateAndViewPDF();
      };
      reader.readAsDataURL(file);
    }
  }

  constructor() { }

  ngOnInit() {}

}
