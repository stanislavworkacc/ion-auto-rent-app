import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle, IonIcon
} from "@ionic/angular/standalone";

@Component({
  selector: 'upload-gallery-btn',
  templateUrl: './upload-gallery-btn.component.html',
  styleUrls: ['./upload-gallery-btn.component.scss'],
  standalone: true,
  imports: [
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonButton,
    IonIcon,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadGalleryPreviewComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
