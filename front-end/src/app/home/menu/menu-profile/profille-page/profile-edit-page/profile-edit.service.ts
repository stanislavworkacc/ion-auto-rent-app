import {inject, Injectable, OnChanges, OnInit} from "@angular/core";
import {CrudService} from "../../../../../../../libs/collection/src/lib/crud.service";
import {AlertController, ModalController} from "@ionic/angular/standalone";
import {environment} from "../../../../../../environments/environment";
import {StorageService} from "../../../../../shared/services/storage.service";
import {PostEntityModel} from "../../../../../../../libs/collection/src/lib/models/post-entity.model";
import {PassportModalComponent} from "./profile-form/passport/passport-modal/passport-modal.component";
import {take} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProfileEditService {

  private alertCtrl: AlertController = inject(AlertController);
  private modalCtrl: ModalController = inject(ModalController);

  public alertButtons = [
    {
      text: 'Відмінити',
      role: 'cancel',
      handler: () => {

      },
    },
    {
      text: 'Підтвердити',
      role: 'confirm',
      handler: () => {
        this.onDeleteAccount('confirm')
      },
    },
  ];

  editUser(userData, id, editEntity) {
    return editEntity.save(
      {data: userData, name: environment.editUser + '/' + id}
    ).pipe(
      take(1)
    )
  }

  async deleteAccount(): Promise<void> {
    const alert: HTMLIonAlertElement = await this.alertCtrl.create({
      header: 'Дійсно бажаєте видалити свій профіль?',
      buttons: [
        {
          text: 'Скасувати',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Підтвердити',
          role: 'confirm',
          handler: () => {
            this.onDeleteAccount('confirm')
          }
        },
      ]
    });

    await alert.present()
  }

  onDeleteAccount(confirm: string): void {
    if (confirm) {
      this.presentAccountAlert()
    }
  }

  async presentAccountAlert(): Promise<void> {
    const alert: HTMLIonAlertElement = await this.alertCtrl.create({
      header: 'Введіть пароль',
      inputs: [
        {
          name: 'password',
          type: 'password',
          placeholder: 'Пароль'
        }
      ],
      buttons: [
        {
          text: 'Скасувати',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Підтвердити',
          role: 'confirm',
          handler: () => {
          }
        },
      ]
    });

    await alert.present();
  }

  async openPassport(): Promise<HTMLIonModalElement> {
    const modal: HTMLIonModalElement = await this.modalCtrl.create({
      component: PassportModalComponent,
      cssClass: 'auth-modal',
      initialBreakpoint: 1,
    })

    return modal;
  }
}
