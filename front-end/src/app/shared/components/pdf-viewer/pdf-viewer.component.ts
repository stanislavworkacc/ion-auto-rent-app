import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {IonButton, IonContent} from "@ionic/angular/standalone";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {SignaturePadModule} from "angular2-signaturepad";

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonContent,
    PdfViewerModule,
    SignaturePadModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PdfViewerComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
