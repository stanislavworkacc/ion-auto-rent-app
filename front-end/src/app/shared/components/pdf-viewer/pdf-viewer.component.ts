import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component, ElementRef, inject,
  Input, NgZone,
  OnInit,
  signal,
  ViewChild,
  WritableSignal
} from '@angular/core';
import {IonButton, IonContent, IonHeader, IonToolbar, ModalController} from "@ionic/angular/standalone";
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import {SignaturePad, SignaturePadModule} from "angular2-signaturepad";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {JsonPipe, NgIf} from "@angular/common";
import {BackButtonComponent} from "../../ui-kit/components/back-button/back-button.component";
import {NavController} from "@ionic/angular";

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
    BackButtonComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PdfViewerComponent implements AfterViewInit {

  private modalCtrl: ModalController = inject(ModalController);

  pdfSrc: WritableSignal<any> = signal('')

  signatureImage;
  public signaturePadOptions: Object = {
    minWidth: 2,
    canvasWidth: 500,
    canvasHeight: 200
  };

  @ViewChild(SignaturePad) signaturePad: SignaturePad;
  @ViewChild('generateBtn') generateBtn: ElementRef;

  drawComplete() {
    this.signatureImage = this.signaturePad.toDataURL();
    this.generateAndViewPDF()
  }

  clearSignature() {
    this.signaturePad.clear();
    this.signatureImage = null;
    this.generateAndViewPDF()

  }

  saveSignature() {
    this.signatureImage = this.signaturePad.toDataURL();
  }

  generateAndViewPDF(): void {
    const documentDefinition = {
      content: [
        { text: 'Form Data', style: 'header' },
        { text: 'Name: John Doe', style: 'subheader' },
        { text: 'Email: john.doe@example.com', style: 'subheader' },
        { text: 'Message: This is a test message.', style: 'subheader' },
        { text: 'Signature:', style: 'subheader' },
        this.signatureImage ? { image: this.signatureImage, width: 200 } : ''
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
  ngAfterViewInit() {
    setTimeout(() => {
      this.generateBtn.nativeElement.click();

    },16)
  }
}
