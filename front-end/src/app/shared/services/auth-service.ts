import {ChangeDetectorRef, inject, Injectable} from "@angular/core";
import {PostEntityModel} from "../../../../libs/collection/src/lib/models/post-entity.model";
import {CrudService} from "../../../../libs/collection/src/lib/crud.service";
import {environment} from "../../../environments/environment";
import {Observable, tap} from "rxjs";
import {StorageService} from "./storage.service";
import {GetEntityModel} from "../../../../libs/collection/src/lib/models/get-entity.model";



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginEntity!: PostEntityModel;
  testEntity!: GetEntityModel;

  private storageService: StorageService = inject(StorageService);

  login(data: any): Observable<any> {
    return this.loginEntity.save({
      data
    }).pipe(
      tap((responce: any) => {
        this.storageService.setObject('token', {
          accessToken: responce?.data?.result?.token,
        })
      })
    )
  }

  test(): Observable<any> {
    return this.testEntity.get()
  }

  constructor(private _crud: CrudService) {
    this.loginEntity = this._crud.createPostEntity({ name: environment.login });
    this.testEntity = this._crud.createGetEntity({ name: environment.test });
  }
}
