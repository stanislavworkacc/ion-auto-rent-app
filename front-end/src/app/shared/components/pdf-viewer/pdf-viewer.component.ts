import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component, effect, ElementRef, inject,
  Input, NgZone,
  OnInit,
  signal,
  ViewChild,
  WritableSignal
} from '@angular/core';
import {
  IonButton,
  IonContent, IonFab, IonFabButton, IonFabList,
  IonFooter,
  IonHeader, IonIcon, IonLabel,
  IonTitle,
  IonToolbar,
  ModalController
} from "@ionic/angular/standalone";
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import {SignaturePad, SignaturePadModule} from "angular2-signaturepad";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {JsonPipe, NgClass, NgForOf, NgIf, NgStyle} from "@angular/common";
import {BackButtonComponent} from "../../ui-kit/components/back-button/back-button.component";
import {NavController} from "@ionic/angular";
import {DomSanitizer} from "@angular/platform-browser";
import {PdfLoaderComponent} from "./pdf-loader/pdf-loader.component";

pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonContent,
    SignaturePadModule,
    PdfViewerModule,
    JsonPipe,
    NgIf,
    IonHeader,
    IonToolbar,
    BackButtonComponent,
    IonFooter,
    IonTitle,
    IonIcon,
    IonLabel,
    IonFab,
    IonFabButton,
    IonFabList,
    PdfLoaderComponent,
    NgForOf,
    NgStyle,
    NgClass
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PdfViewerComponent implements AfterViewInit {

  private modalCtrl: ModalController = inject(ModalController);
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private sanitizer: DomSanitizer = inject(DomSanitizer);

  pdfSrc: WritableSignal<string> = signal('');
  pdfOnLoaded: WritableSignal<boolean> = signal(false);
  signatureImage: WritableSignal<any> = signal(null);
  isSignPad: WritableSignal<boolean> = signal(false);

  isFabEdged: WritableSignal<boolean> = signal(true);

  public signaturePadOptions: Object = {
    penColor: '#000',
    canvasHeight: 300,
    canvasWidth: 600,
    minWidth: 2,
  };
  @ViewChild(SignaturePad) signaturePad: SignaturePad;
  @ViewChild('generateBtn') generateBtn: ElementRef;
  @ViewChild('signSvg') signSvg: ElementRef;
  @ViewChild('fileInput') fileInput: ElementRef;

  signaturePadActions = [
    {
      label: 'Печатка',
      icon: 'assets/icon/svg/stamp.svg',
      callback: () => this.fileInput.nativeElement.click(),
      bgColor: '#dbe8ff'
    },
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
    {
      label: 'Готово',
      icon: 'assets/icon/svg/done.svg',
      callback: () => this.closeSignaturePad(),
      bgColor: '#f8f8ff'
    }
  ];

  pdfOnLoad(): void {
    setTimeout((): void => {
      this.pdfOnLoaded.set(true);
    },2000)
  }

  pdfReset(): void {
    this.pdfOnLoaded.set(false);
    setTimeout(()=> {
      this.pdfOnLoaded.set(true);
    },700)
  }

  drawComplete(): void {
    this.signatureImage.set(this.signaturePad.toDataURL());
    this.pdfReset();
    this.generateAndViewPDF();
  }

  clearSignature(): void {
    this.signaturePad.clear();
    this.signatureImage.set('');
    this.pdfReset();
    this.generateAndViewPDF()
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.signatureImage.set(reader.result);
        this.pdfReset();
        this.generateAndViewPDF();
      };
      reader.readAsDataURL(file);
    }
  }

  addStamp() {

  }

  saveSignature() {
    this.signatureImage.set(this.signaturePad.toDataURL());
  }

  generateAndViewPDF(): void {
    const documentDefinition = {
      content: [
        { text: 'Form Data', style: 'header' },
        { text: 'Name: John Doe', style: 'subheader' },
        { text: 'Email: john.doe@example.com', style: 'subheader' },
        { text: 'Message: This is a test message.', style: 'subheader' },
        { text: 'Signature:', style: 'subheader' },
        { text: 'Signature:', style: 'subheader' },
        { text: 'Signature:', style: 'subheader' },
        { text: 'Signature:', style: 'subheader' },
        this.signatureImage() ? { image: this.signatureImage(), width: 75, height: 75 } : ''
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 10, 0, 5]
        }
      }
    };

    if(documentDefinition) {
      const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
      if(pdfDocGenerator) {
        pdfDocGenerator?.getBlob((blob) => {
          this.pdfSrc.set(URL.createObjectURL(blob))
        });
      }
    }
  }

  goBack() {
    this.modalCtrl.dismiss()
  }

  downloadPdf(): void {
    const link = document.createElement('a');
    link.href = this.pdfSrc();
    link.download = 'document.pdf';
    link.click();
  }

  showSignaturePad(): void {
    this.isSignPad.set(true);
    this.isFabEdged.set(false)
  }

  closeSignaturePad(): void {
    this.isSignPad.set(false);
    this.isFabEdged.set(true)
  }

  hideSignSvg() {
    this.signSvg.nativeElement.style.display = 'none';
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.generateBtn.nativeElement.click();
    },16)
  }

  constructor() {
    effect(() => {
      if(this.isSignPad()) {
        setTimeout(() => {
          if(this.signSvg.nativeElement) {
            this.signSvg.nativeElement.style.display = 'none';
          }
        },2000)
      }

      if(this.pdfOnLoaded()) {
        this.pdfOnLoaded.set(false);
      }
    });
  }
}
