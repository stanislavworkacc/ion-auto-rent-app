export class EmitEvent {
  name: string;
  value: any;

  constructor({ name, value }: { name: string, value: any }) {
    this.name = name;
    this.value = value;
  }
}

export enum CollectionEventActions {
  onLoad = 'onLoad',
  onCreate = 'onCreate',
  onUpdate = 'onUpdate',
  onDelete = 'onDelete',
  onParamsChanged = 'paramsChanged',
  onItemSelected = 'itemSelected',
}

export interface HardReloadAfterModel {
  creating: boolean;
  updating: boolean;
  deleting: boolean;
}

export interface LoadingCrudModel {
  creating: boolean;
  updating: boolean;
  deleting: boolean;
}

export interface RequestPromisesModel {
  create: any;
  update: any;
  delete: any;
  get: any;
}

export interface ResponseMetaModel {
  currentPage: number;
  pageCount: number;
  perPage: number;
  totalCount: number;
}
