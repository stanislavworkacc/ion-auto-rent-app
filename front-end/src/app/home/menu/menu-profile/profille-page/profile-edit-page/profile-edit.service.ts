import {inject, Injectable} from "@angular/core";
import {CrudService} from "../../../../../../../libs/collection/src/lib/crud.service";
import {Item} from "../../../../../../../libs/collection/src/lib/entity-item";
import {ItemModel} from "../../../../../../../libs/collection/src/lib/models/item.model";
import {AlertController} from "@ionic/angular/standalone";

@Injectable({
  providedIn: 'root'
})
export class ProfileEditService {

  private crud: CrudService = inject(CrudService);
  private alertCtrl: AlertController = inject(AlertController);

  userItem: ItemModel;

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

  editUser(userData) {
    debugger
    this.userItem.updateItem({data: {}, method: 'PATCH'})
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



  constructor() {

    this.userItem = new Item({
      api: this.crud.createEntity({ name: '' }),
    })
  }
}
