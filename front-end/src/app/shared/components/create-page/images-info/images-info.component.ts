import {ChangeDetectionStrategy, Component, OnInit, signal, WritableSignal} from '@angular/core';
import {
  UploadBtnComponent
} from "../../../../home/menu/car-park/all-parks/create-park-modal/upload-btn/upload-btn.component";
import {UploadGalleryPreviewComponent} from "./upload-gallery-btn/upload-gallery-btn.component";
import {of} from "rxjs/internal/observable/of";
import {delay, tap} from "rxjs";
import {CloseBtnComponent} from "../../../ui-kit/components/close-btn/close-btn.component";
import {IonButtons, IonIcon, IonLabel} from "@ionic/angular/standalone";

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
    IonIcon
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImagesInfoComponent  implements OnInit {


  uploadedLogoUrl: string = '';
  formats: string[] = ['JPEG', 'WEBP', 'PNG', 'SVG', 'JPG'];

  logoUploaded: WritableSignal<boolean> = signal(false);
  logoUploading: WritableSignal<boolean> = signal(false);
  uploadProgress: WritableSignal<number>  = signal(0);

  uploadedLogoUrls: { url: string, loading: boolean }[] = [];

  handleFileUpload(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.logoUploading.set(true);
      const readers: FileReader[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader: FileReader = new FileReader();

        reader.onload = (e: any) => {
          of(e.target.result)
            .pipe(
              tap((result) => {
                this.uploadedLogoUrls.push(result);
                if (i === files.length - 1) {
                  this.logoUploaded.set(true);
                  this.logoUploading.set(false);
                }
              })
            )
            .subscribe();
        };

        readers.push(reader);
        reader.readAsDataURL(file);
      }
    }
  }

  ngOnInit() {}

}
