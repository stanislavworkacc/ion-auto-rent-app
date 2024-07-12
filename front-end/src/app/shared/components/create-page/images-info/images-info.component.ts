import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
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
import {ImagesInfoService} from "./images-info.service";
import {NgClass} from "@angular/common";

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
    NgClass,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImagesInfoComponent  implements OnInit {

  private imagesInfoService: ImagesInfoService = inject(ImagesInfoService);
  isGridView = true;
  get imagesInfo() {
    return this.imagesInfoService;
  }

  toggleView() {
    this.isGridView = !this.isGridView;
  }

  handleFileUpload(ev): void {
    this.imagesInfo.handleFileUpload(ev)
  }
  ngOnInit() {}
}
