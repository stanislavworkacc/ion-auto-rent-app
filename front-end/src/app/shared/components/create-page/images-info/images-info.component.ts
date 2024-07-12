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

  private toaster : ToasterService = inject(ToasterService);
  private actionSheetCtrl: ActionSheetController = inject(ActionSheetController);

  formats: string[] = ['JPEG', 'WEBP', 'PNG', 'SVG', 'JPG'];
  uploadedLogoUrls: WritableSignal< { url: string, loading: boolean }[]>  = signal([]);

  handleFileUpload(event: any) {
    const files = event.target.files;
    if (files.length) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileExtension = file.name.split('.').pop().toUpperCase();

        if (this.formats.includes(fileExtension)) {
          const reader = new FileReader();
          const index = this.uploadedLogoUrls().length;
          this.uploadedLogoUrls.set([...this.uploadedLogoUrls(),{ url: '', loading: true }]);

          reader.onload = (e: any) => {
            const updatedUrls = this.uploadedLogoUrls().slice();
            updatedUrls[index] = { url: e.target.result, loading: false };
            this.uploadedLogoUrls.set(updatedUrls);
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

  deletePhoto(url: string): void {
    const index = this.uploadedLogoUrls().findIndex(item => item.url === url);
    if (index > -1) {
      const updatedUrls = [
        ...this.uploadedLogoUrls().slice(0, index),
        ...this.uploadedLogoUrls().slice(index + 1)
      ];
      this.uploadedLogoUrls.set(updatedUrls);
    }
  }


  async clearGallery(): Promise<void> {
    const actionSheet: HTMLIonActionSheetElement = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Видалити всі',
          role: 'destructive',
          handler: () => {
            this.uploadedLogoUrls.set([])
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
  ngOnInit() {}

}
