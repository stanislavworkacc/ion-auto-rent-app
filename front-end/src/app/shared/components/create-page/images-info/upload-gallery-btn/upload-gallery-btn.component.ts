import {ChangeDetectionStrategy, Component, input, Input, InputSignal, OnInit} from '@angular/core';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle, IonIcon
} from "@ionic/angular/standalone";
import {
  UploadBtnComponent
} from "../../../../../home/menu/car-park/all-parks/create-park-modal/upload-btn/upload-btn.component";

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
    UploadBtnComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadGalleryPreviewComponent  implements OnInit {

  @Input() handleFileUpload: (event) => void;
  logoUploading: InputSignal<boolean> = input(false)
  uploadProgress: InputSignal<number> = input(0)
  constructor() { }

  ngOnInit() {}

}
