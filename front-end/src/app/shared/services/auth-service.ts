import {inject, Injectable} from "@angular/core";
import {PostEntityModel} from "../../../../libs/collection/src/lib/models/post-entity.model";
import {CrudService} from "../../../../libs/collection/src/lib/crud.service";
import {environment} from "../../../environments/environment";
import {BehaviorSubject, finalize, Observable, take, tap} from "rxjs";
import {StorageService} from "./storage.service";
import {AlertController} from "@ionic/angular/standalone";
import {Item} from "../../../../libs/collection/src/lib/entity-item";
import {ToasterService} from "../components/app-toast/toaster.service";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private storageService: StorageService = inject(StorageService);
  private alertCtrl: AlertController = inject(AlertController);
  private toasterService: ToasterService = inject(ToasterService);

  loginEntity!: PostEntityModel;
  logoutEntity!: PostEntityModel;
  registerEntity!: PostEntityModel;
  loginGoogleSsoEntity!: PostEntityModel;
  changePasswordEntity!: Item;

  dynamicItemLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get toaster() {
    return this.toasterService;
  }

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
    const keys: string[] = ['_id', 'email', 'phone', 'ssoUser', 'userName', 'userLastName', 'ssoUser'];
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
    return new Promise(async (resolve): Promise<void> => {
      const alert: HTMLIonAlertElement = await this.alertCtrl.create({
        header: 'Підтвердити пароль',
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
            handler: async ({password}): Promise<boolean> => {
              const spinner: HTMLIonSpinnerElement = document.createElement('ion-spinner');
              spinner.name = 'dots';

              const content: HTMLElement = alert.querySelector('.alert-message') as HTMLElement;
              if (content) {
                content.appendChild(spinner);
              }

              const name: string = `${environment.matchPassword}/${id}`;

              this.createDynamicItem(name, {
                password,
              }).pipe(
                tap(async ({data}): Promise<void> => {
                  switch (data.result.matchPassword) {
                    case true:
                      resolve(true);

                      this.toaster.show({type: 'success', message: 'Пароль успішно підтверджено.'});
                      await alert.dismiss();
                      break;
                    case false:
                      resolve(false);
                      this.toaster.show({type: 'error', message: 'Пароль введено невірно, будь ласка спробуйте ще.'})
                      break;
                    default:
                  }

                  if (content) {
                    content.removeChild(spinner);
                  }
                })
              ).subscribe();
              return false;
            }
          },
        ]
      });

      await alert.present();
    });
  }

  createDynamicItem(name, payload): Observable<any> {
    this.dynamicItemLoading$.next(true);

    const item = new Item({
      api: this._crud.createPostEntity({
        name
      })
    })


    return item.createItem({
      data: payload
    }).pipe(
      take(1),
      finalize(() => this.dynamicItemLoading$.next(false))
    )
  }

  initPasswordChange(password, id): Observable<any> {
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
  }
}
