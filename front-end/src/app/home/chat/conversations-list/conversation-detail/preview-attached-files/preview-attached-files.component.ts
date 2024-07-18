import {ChangeDetectionStrategy, Component, inject, Input, OnInit, signal, WritableSignal} from '@angular/core';
import {IonIcon, IonLabel, IonTitle} from "@ionic/angular/standalone";
import {ActionSheetController} from "@ionic/angular";

@Component({
  selector: 'preview-attached-files',
  templateUrl: './preview-attached-files.component.html',
  styleUrls: ['./preview-attached-files.component.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonTitle,
    IonLabel
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewAttachedFilesComponent  implements OnInit {

  private actionSheetCtrl: ActionSheetController = inject(ActionSheetController);

  @Input({ required: true }) attachedFiles: WritableSignal<File[]> = signal([])
  @Input({ required: true }) attachingFile: WritableSignal<boolean> = signal(false)

  async deleteSingleFile(index: number): Promise<void> {
    const actionSheet: HTMLIonActionSheetElement = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Видалити',
          handler: () => {
            this.attachedFiles.update((files: File[]) => {
              const updatedFiles: File[] = [...files];
              updatedFiles.splice(index, 1);
              return updatedFiles;
            });
          }
        },
        {
          text: 'Видалити усі',
          handler: () => {
            this.attachedFiles.set([])
          }
        },
        {
          text: 'Скасувати',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();
  }

  ngOnInit() {}

}
