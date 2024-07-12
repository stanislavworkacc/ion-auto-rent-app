import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
import {ToasterService} from "../../app-toast/toaster.service";
import {ActionSheetController} from "@ionic/angular";

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

  private cdRef : ChangeDetectorRef = inject(ChangeDetectorRef);
  private toaster : ToasterService = inject(ToasterService);
  private actionSheetCtrl: ActionSheetController = inject(ActionSheetController);

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

  async editImage(img) {
    const actionSheet = await this.actionSheetCtrl.create({
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Зробити головним',
          handler: () => {
            // this.setAsMainPhoto(url);
          }
        }, {
        text: 'Видалити',
        role: 'destructive',
        handler: () => {
         this.deletePhoto(img.url)
        }
      }, {
        text: 'Скасувати',
        icon: 'close',
        role: 'cancel',
        handler: () => {}
      }]
    });
    await actionSheet.present();
  }

  deletePhoto(url: string) {
    const index = this.uploadedLogoUrls.findIndex(item => item.url === url);
    if (index > -1) {
      this.uploadedLogoUrls.splice(index, 1);
      this.cdRef.detectChanges()
    }
  }
  ngOnInit() {}

}
