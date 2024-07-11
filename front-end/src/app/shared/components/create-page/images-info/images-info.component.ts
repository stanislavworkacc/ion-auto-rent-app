import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal
} from '@angular/core';
import {
  UploadBtnComponent
} from "../../../../home/menu/car-park/all-parks/create-park-modal/upload-btn/upload-btn.component";
import {UploadGalleryPreviewComponent} from "./upload-gallery-btn/upload-gallery-btn.component";
import {CloseBtnComponent} from "../../../ui-kit/components/close-btn/close-btn.component";
import {IonButtons, IonIcon, IonItem, IonLabel, IonSkeletonText, IonSpinner} from "@ionic/angular/standalone";
import {ToasterService} from "../../app-toast/toaster.service";

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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImagesInfoComponent  implements OnInit {

  private cdRef : ChangeDetectorRef = inject(ChangeDetectorRef);
  private toaster : ToasterService = inject(ToasterService);

  formats: string[] = ['JPEG', 'WEBP', 'PNG', 'SVG', 'JPG'];
  uploadedLogoUrls: { url: string, loading: boolean }[] = [];

  handleFileUpload(event: any) {
    const files = event.target.files;
    if (files.length) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileExtension = file.name.split('.').pop().toUpperCase();

        if (this.formats.includes(fileExtension)) {
          const reader = new FileReader();
          const index = this.uploadedLogoUrls.length;
          this.uploadedLogoUrls.push({ url: '', loading: true });
          this.cdRef.detectChanges();

          reader.onload = (e: any) => {
            this.uploadedLogoUrls[index] = { url: e.target.result, loading: false };
            this.cdRef.detectChanges();
          };
          reader.readAsDataURL(file);
        } else {
          this.toaster.show({
            type: 'warning',
            message: `Формат файлу "${file.name}" не підтримується. Дозволені формати: ${this.formats.join(', ')}` })
        }
      }
    }
  }

  ngOnInit() {}

}
