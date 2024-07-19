import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit, signal,
  ViewChild,
  WritableSignal
} from '@angular/core';
import {NavController} from "@ionic/angular";
import {IonFabComponent} from "../../shared/ui-kit/components/ion-fab/ion-fab.component";
import {AuthFormWrapperComponent} from "../../auth/authorizator/auth-form-wrapper/auth-form-wrapper.component";
import {AuthorizatorComponent} from "../../auth/authorizator/authorizator.component";
import {AndroidFormComponent} from "../../auth/authorizator/android-form/android-form.component";
import {AppleIosComponent} from "../../auth/authorizator/apple-ios/apple-ios.component";
import {BackButtonComponent} from "../../shared/ui-kit/components/back-button/back-button.component";
import {GoogleSsoComponent} from "../../auth/authorizator/google-sso/google-sso.component";
import {SegmentsComponent} from "../../shared/ui-kit/components/segments/segments.component";
import {SignUpFormComponent} from "../../auth/authorizator/sign-up-form/sign-up-form.component";
import {IonButton, IonContent, ModalController} from "@ionic/angular/standalone";
import {NgIf} from "@angular/common";
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import {SignaturePad, SignaturePadModule} from "angular2-signaturepad";
import {PdfViewerModule} from "ng2-pdf-viewer";

pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    IonFabComponent,
    AuthFormWrapperComponent,
    AuthorizatorComponent,
    AndroidFormComponent,
    AppleIosComponent,
    BackButtonComponent,
    GoogleSsoComponent,
    SegmentsComponent,
    SignUpFormComponent,
    IonContent,
    IonButton,
    NgIf,
    SignaturePadModule,
    PdfViewerModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {

  private modalCtrl: ModalController = inject(ModalController);
  private navCtrl: NavController = inject(NavController);

  async openModal(): Promise<void> {
    const modal: HTMLIonModalElement = await this.modalCtrl.create({
      component: AuthorizatorComponent,
      cssClass: 'auth-modal',
      initialBreakpoint: 1,
      breakpoints: [0, 1]
    });

    await modal.present();

    modal.onWillDismiss().then((): void => {
      this.navCtrl.navigateForward('home/menu');
    })
  }

  pdfSrc: WritableSignal<any> = signal('')
  signatureImage;
  @ViewChild(SignaturePad) signaturePad: SignaturePad;
  public signaturePadOptions: Object = {
    minWidth: 2,
    canvasWidth: 500,
    canvasHeight: 200
  };

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

  ngOnInit(): void {
    // this.openModal();
  }
}
