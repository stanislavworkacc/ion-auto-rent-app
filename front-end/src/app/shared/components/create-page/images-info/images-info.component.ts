import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit, signal, WritableSignal,
} from '@angular/core';
import {
  UploadBtnComponent
} from "../../../../home/menu/car-park/all-parks/create-park-modal/upload-btn/upload-btn.component";
import {UploadGalleryPreviewComponent} from "./upload-gallery-btn/upload-gallery-btn.component";
import {CloseBtnComponent} from "../../../ui-kit/components/close-btn/close-btn.component";
import {
  IonButton,
  IonButtons,
  IonIcon,
  IonItem,
  IonLabel,
  IonSpinner
} from "@ionic/angular/standalone";
import {ToasterService} from "../../app-toast/toaster.service";
import {ActionSheetController} from "@ionic/angular";
import {ImagesInfoService} from "./images-info.service";

@Component({
  selector: 'images-info',
  templateUrl: './images-info.component.html',
  styleUrls: ['./images-info.component.scss'],
  standalone: true,
  imports: [
    UploadBtnComponent,
    UploadGalleryPreviewComponent,
    CloseBtnComponent,
    IonButtons,
    IonLabel,
    IonIcon,
    IonItem,
    IonSpinner,
    IonButton,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImagesInfoComponent  implements OnInit {

  private imagesInfoService: ImagesInfoService = inject(ImagesInfoService);

  get imagesInfo() {
    return this.imagesInfoService;
  }

  handleFileUpload(ev): void {
    this.imagesInfo.handleFileUpload(ev)
  }
  ngOnInit() {}
}
