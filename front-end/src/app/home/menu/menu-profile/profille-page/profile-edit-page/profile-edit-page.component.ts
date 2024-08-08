import {ChangeDetectionStrategy, Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {
  IonAvatar,
  IonButton,
  IonContent, IonFab, IonFabButton, IonFabList,
  IonHeader, IonIcon,
  IonLabel, IonRefresher, IonRefresherContent,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";
import {ActionSheetController} from "@ionic/angular";
import {ProfileEditService} from "./profile-edit.service";
import {ProfileFormComponent} from "./profile-form/profile-form.component";
import {EditPageHeaderComponent} from "./edit-page-header/edit-page-header.component";

@Component({
  selector: 'app-profile-edit-page',
  templateUrl: './profile-edit-page.component.html',
  styleUrls: ['./profile-edit-page.component.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonLabel,
    IonButton,
    IonAvatar,
    ProfileFormComponent,
    EditPageHeaderComponent,
    IonIcon,
    IonFab,
    IonFabButton,
    IonFabList,
    IonRefresher,
    IonRefresherContent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileEditPage implements OnInit {

  private actionSheetCtrl: ActionSheetController = inject(ActionSheetController);
  private profileEditService: ProfileEditService = inject(ProfileEditService);

  passwordBlurred: WritableSignal<boolean> = signal(true);
  isBlurred: WritableSignal<boolean> = signal(true);


  get profile() {
    return this.profileEditService;
  }

  async openActionSheet(): Promise<void> {
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Редагувати профіль',
          handler: () => {
            this.isBlurred.set(false);
          }
        },
        {
          text: 'Видалити профіль',
          handler: () => {
            this.deleteAccount();
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

  handleRefresh(event) {
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  async deleteAccount(): Promise<void> {
    await this.profile.deleteAccount()
  }

  ngOnInit() {

  }
}
