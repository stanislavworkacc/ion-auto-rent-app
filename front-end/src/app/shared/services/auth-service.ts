import {ChangeDetectorRef, inject, Injectable} from "@angular/core";
import {PostEntityModel} from "../../../../libs/collection/src/lib/models/post-entity.model";
import {CrudService} from "../../../../libs/collection/src/lib/crud.service";
import {environment} from "../../../environments/environment";
import {Observable, take, tap} from "rxjs";
import {StorageService} from "./storage.service";
import {GetEntityModel} from "../../../../libs/collection/src/lib/models/get-entity.model";
import {ToasterService} from "../components/app-toast/toaster.service";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginEntity!: PostEntityModel;
  registerEntity!: PostEntityModel;
  loginGoogleSsoEntity!: PostEntityModel;

  private storageService: StorageService = inject(StorageService);

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

  constructor(private _crud: CrudService) {
    this.loginEntity = this._crud.createPostEntity({ name: environment.login });
    this.registerEntity = this._crud.createPostEntity({ name: environment.register });
    this.loginGoogleSsoEntity = this._crud.createPostEntity({ name: environment.googleSsoLogin });
  }
}
