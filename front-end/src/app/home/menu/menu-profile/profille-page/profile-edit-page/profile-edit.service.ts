import {inject, Injectable} from "@angular/core";
import {CrudService} from "../../../../../../../libs/collection/src/lib/crud.service";
import {Item} from "../../../../../../../libs/collection/src/lib/entity-item";
import {ItemModel} from "../../../../../../../libs/collection/src/lib/models/item.model";

@Injectable({
  providedIn: 'root'
})
export class ProfileEditService {

  private crud: CrudService = inject(CrudService);
  userItem: ItemModel;

  constructor() {

    this.userItem = new Item({
      api: this.crud.createEntity({ name: '' }),
    })
  }
}
