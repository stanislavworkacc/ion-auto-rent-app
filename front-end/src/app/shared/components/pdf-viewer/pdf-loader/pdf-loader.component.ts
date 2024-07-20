import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {IonContent, IonIcon} from "@ionic/angular/standalone";
import {PdfViewerModule} from "ng2-pdf-viewer";

@Component({
  selector: 'pdf-loader',
  templateUrl: './pdf-loader.component.html',
  styleUrls: ['./pdf-loader.component.scss'],
  standalone: true,
  imports: [
    IonContent,
    PdfViewerModule,
    IonIcon
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PdfLoaderComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
