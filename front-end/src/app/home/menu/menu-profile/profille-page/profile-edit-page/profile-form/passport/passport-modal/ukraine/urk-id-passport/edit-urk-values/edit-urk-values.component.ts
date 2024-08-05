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
  IonLabel,
  IonModal,
  IonRadio,
  IonRadioGroup
} from "@ionic/angular/standalone";
import {FormsModule} from "@angular/forms";
import {SignaturePad, SignaturePadModule} from "angular2-signaturepad";
import {NgClass, NgStyle} from "@angular/common";

@Component({
  selector: 'edit-urk-id-values',
  templateUrl: './edit-urk-values.component.html',
  styleUrls: ['./edit-urk-values.component.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonItem,
    IonLabel,
    IonRadio,
    IonRadioGroup,
    FormsModule,
    IonDatetimeButton,
    IonModal,
    IonDatetime,
    IonInput,
    SignaturePadModule,
    IonButton,
    NgStyle,
    NgClass
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditUrkIdValuesComponent  implements OnInit {

  @Input() signatureImage: WritableSignal<string> = signal('');

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


  clearSignature() {

  }

  ngOnInit() {
    setTimeout(() => {
      if(this.signSvg.nativeElement) {
        this.signSvg.nativeElement.style.display = 'none';
      }
    },2000)
  }

}
