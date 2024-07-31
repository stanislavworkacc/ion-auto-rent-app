import {inject, Injectable, OnChanges, OnInit} from "@angular/core";
import {CrudService} from "../../../../../../../libs/collection/src/lib/crud.service";
import {AlertController} from "@ionic/angular/standalone";
import {environment} from "../../../../../../environments/environment";
import {StorageService} from "../../../../../shared/services/storage.service";
import {PostEntityModel} from "../../../../../../../libs/collection/src/lib/models/post-entity.model";

@Injectable({
  providedIn: 'root'
})
export class ProfileEditService implements OnInit {

  private crud: CrudService = inject(CrudService);
  private alertCtrl: AlertController = inject(AlertController);
  private storage: StorageService = inject(StorageService);

  editEntity: PostEntityModel;

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

  async editUser(userData) {
    const user = await this.storage.getObject('user');

    debugger
    this.editEntity.save({data: userData, name: environment.editUser + '/' + user._id})
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


   constructor () {
    this.ngOnInit();
  }

  // eslint-disable-next-line @angular-eslint/contextual-lifecycle
  async ngOnInit() {
    const user = await this.storage.getObject('user');

    this.editEntity = this.crud.createPostEntity({
      name: environment.editUser + '/' + user._id,
    })
  }
}
