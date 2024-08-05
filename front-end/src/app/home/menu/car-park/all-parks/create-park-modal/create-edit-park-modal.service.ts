import {Injectable} from "@angular/core";
import {ItemModel} from "../../../../../../../libs/collection/src/lib/models/item.model";
import {Item} from "../../../../../../../libs/collection/src/lib/entity-item";

@Injectable({
  providedIn: 'root'
})
export class CreateEditParkModalService {
  parkItem: ItemModel;

  initParkCreation(data) {
    this.parkItem.createItem({

    })
  }
  constructor() {
    this.parkItem = new Item({
      api: ''
    })
  }
}
