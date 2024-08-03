import {ChangeDetectorRef, inject, Injectable} from "@angular/core";
import {PostEntityModel} from "../../../../libs/collection/src/lib/models/post-entity.model";
import {CrudService} from "../../../../libs/collection/src/lib/crud.service";
import {environment} from "../../../environments/environment";
import {Observable, take, tap} from "rxjs";
import {StorageService} from "./storage.service";
import {AlertController} from "@ionic/angular/standalone";
import {Item} from "../../../../libs/collection/src/lib/entity-item";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginEntity!: PostEntityModel;
  logoutEntity!: PostEntityModel;
  registerEntity!: PostEntityModel;
  loginGoogleSsoEntity!: PostEntityModel;
  changePasswordEntity!: Item;
  confirmPasswordEntity!: Item;

  private storageService: StorageService = inject(StorageService);
  private alertCtrl: AlertController = inject(AlertController);

  login(data: any): Observable<any> {
    return this.loginEntity.save({
      data
    }).pipe(
      take(1),
      tap((res: any) => this.setStorageData(res))
    )
  }

  loginGoogleSso(data: any): Observable<any> {
    return this.loginGoogleSsoEntity.save({
      data
    }).pipe(
      take(1),
      tap((res: any) => this.setStorageData(res))
    )
  }

  register(data: any): Observable<any> {
    return this.registerEntity.save({
      data
    })
  }

  setStorageData(res): void {
    const keys: string[] = ['_id', 'email', 'phone', 'ssoUser', 'userName', 'userLastName'];
    const userData: {} = {};

    keys.forEach((key: string): void => {
      userData[key] = res?.data?.result?.[key];
    });

    this.storageService.setObject('user', userData);
  }

  logout(data) {
    return this.logoutEntity.save(
      {data}
    ).pipe(
      take(1)
    )
  }

  async confirmPassword(id?): Promise<boolean> {
    // debugger;
    return new Promise(async (resolve): Promise<void> => {
      const alert: HTMLIonAlertElement = await this.alertCtrl.create({
        header: 'Введіть пароль',
        inputs: [
          {
            name: 'password',
            type: 'password',
            placeholder: 'Пароль',
          }
        ],
        buttons: [
          {
            text: 'Скасувати',
            role: 'cancel',
            handler: () => {
              resolve(false);
            }
          },
          {
            text: 'Підтвердити',
            role: 'confirm',
            handler: ({password}) => {
              const name = `${environment.matchPassword}/${id}`;

              // const item = new Item({
              //   api: this._crud.createPostEntity({
              //     name
              //   })
              // })
              //
              //
              // item.createItem({
              //   data: {
              //     password,
              //   }
              // }).pipe(
              //   take(1),
              //   tap(({data}) => {
              //     resolve(data.result.matchPassword);
              //   })
              // ).subscribe()

              this.createDynamicItem(name, {
                password,
              }).pipe(
                take(1),
                tap(({data}) => {
                  resolve(data.result.matchPassword);
                })
              ).subscribe()
            }
          },
        ]
      });

      await alert.present();
    });
  }

  createDynamicItem(name, payload) {
    const item = new Item({
      api: this._crud.createPostEntity({
        name
      })
    })

    return item.createItem({
      data: payload
    }).pipe(
      take(1),
    )
  }

  initPasswordChange(password, id) {
    // return this.changePasswordEntity.createItem({
    //   data: {
    //     password
    //   },
    //   path: `${environment.changePassword}/${id}`
    // }).pipe(take(1))

    return this.createDynamicItem(`${environment.changePassword}/${id}`, {
      password
    })
  }

  constructor(private _crud: CrudService) {
    this.loginEntity = this._crud.createPostEntity({name: environment.login});
    this.logoutEntity = this._crud.createPostEntity({name: environment.logout});
    this.registerEntity = this._crud.createPostEntity({name: environment.register});
    this.loginGoogleSsoEntity = this._crud.createPostEntity({name: environment.googleSsoLogin});
    this.changePasswordEntity = new Item({
      api: this._crud.createPostEntity({
        name: environment.changePassword,
      })
    })

    this.confirmPasswordEntity = new Item({
      api: this._crud.createPostEntity({
        name: '',
      })
    })
  }
}
