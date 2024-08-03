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
export class ProfileEditService implements OnInit {

  private crud: CrudService = inject(CrudService);
  private alertCtrl: AlertController = inject(AlertController);
  private modalCtrl: ModalController = inject(ModalController);
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

  editUser(userData, id) {
    return this.editEntity.save(
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
      breakpoints: [0]
    })

     return modal;
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
