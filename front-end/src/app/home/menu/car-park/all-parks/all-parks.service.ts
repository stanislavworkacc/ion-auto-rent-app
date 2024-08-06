import {inject, Injectable} from "@angular/core";
import {CollectionModel} from "../../../../../../libs/collection/src/lib/models/collection.model";
import {CrudService} from "../../../../../../libs/collection/src/lib/crud.service";

@Injectable({
  providedIn: 'root'
})
export class AllParksService {

  private crud: CrudService = inject(CrudService)
  collection: CollectionModel;

  constructor() {
    // th
  }
}
