import {inject, Injectable} from "@angular/core";
import {ItemModel} from "../../../../../../../libs/collection/src/lib/models/item.model";
import {Item} from "../../../../../../../libs/collection/src/lib/entity-item";
import {Observable, take, tap} from "rxjs";
import {CrudService} from "../../../../../../../libs/collection/src/lib/crud.service";
import {environment} from "../../../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CreateEditParkModalService {
  private _crud: CrudService = inject(CrudService);
  parkItem: ItemModel;

  initParkCreation(data) {
    // const name = `${environment.matchPassword}/${id}`;

    this.createDynamicItem(name, {
      // password,
    }).pipe(
      take(1),
      tap(({data}) => {
        // resolve(data.result.matchPassword);
      })
    ).subscribe()
  }

  createDynamicItem(name, payload): Observable<any> {
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
  constructor() {
    this.parkItem = new Item({
      api: ''
    })
  }
}
