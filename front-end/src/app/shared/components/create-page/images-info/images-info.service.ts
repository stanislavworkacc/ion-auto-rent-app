import {inject, Injectable, signal, WritableSignal} from "@angular/core";
import {ToasterService} from "../../app-toast/toaster.service";
import {ActionSheetController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class ImagesInfoService {

  private toaster : ToasterService = inject(ToasterService);
  private actionSheetCtrl: ActionSheetController = inject(ActionSheetController);

  formats: string[] = ['JPEG', 'WEBP', 'PNG', 'SVG', 'JPG'];
  uploadedLogoUrls: WritableSignal< { url: string, loading: boolean }[]>  = signal([]);

  handleFileUpload(event: any) {
    const files = event.target.files;
    if (files.length) {
      for (let i = 0; i < files.length; i++) {
        if (this.uploadedLogoUrls().length >= 20) {
          this.toaster.show({
            type: 'info',
            message: 'Ліміт досягнуто',
          });
          break;
        }

        const file = files[i];
        const fileExtension = file.name.split('.').pop().toUpperCase();

        if (this.formats.includes(fileExtension)) {
          const reader = new FileReader();
          const index = this.uploadedLogoUrls().length;
          this.uploadedLogoUrls.set([...this.uploadedLogoUrls(), { url: '', loading: true }]);

          reader.onload = (e: any) => {
            const updatedUrls = this.uploadedLogoUrls().slice();
            updatedUrls[index] = { url: e.target.result, loading: false };
            this.uploadedLogoUrls.set(updatedUrls);
          };
          reader.readAsDataURL(file);
        } else {
          this.toaster.show({
            type: 'warning',
            message: `Формат файлу "${file.name}" не підтримується. Дозволені формати: ${this.formats.join(', ')}`,
          });
        }
      }
    }
  }


  async editImage(img): Promise<void> {
    const actionSheet: HTMLIonActionSheetElement = await this.actionSheetCtrl.create({
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Зробити головним',
          handler: (): void => {
            this.makeMajorImage(img)
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

  makeMajorImage(img) {

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
}
