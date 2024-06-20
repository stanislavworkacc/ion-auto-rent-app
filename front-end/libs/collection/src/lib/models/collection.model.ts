import { ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Collection } from '../collection';
import {
  EmitEvent,
  HardReloadAfterModel, LoadingCrudModel,
  RequestPromisesModel,
  ResponseMetaModel
} from './models';

export interface CollectionModel<T = { [key: string]: any }> {
  items: T[];
  items$: Observable<T[]>;
  mapItems: (item: T) => T;
  mapResponse: (res: any) => { items: T[], meta: ResponseMetaModel };
  mapOnSelectItems: (item: T) => T;
  loading$: Observable<boolean>;
  loadingCrud$: Observable<LoadingCrudModel>;
  onLoad$: Observable<any>;
  selectedItems$: Observable<Set<number>>;
  totalSelectedItems: number;
  canSelectItemKey: string;
  selectedItems: Set<number>;
  meta: ResponseMetaModel;
  loading: boolean;
  loaded: boolean;
  loadingCrud: LoadingCrudModel;
  loadByScrolling: boolean;
  params: { [key: string]: any };
  initParams: { [key: string]: any };
  routeParams: { [key: string]: any };
  api: { [key: string]: Function };
  saveType: string;
  skeleton: boolean;
  skeletonCount: number;
  apiGetMethod: string;
  apiDeleteMethod: string;
  apiDeleteManyMethod: string;
  apiUpdateMethod: string;
  apiSaveMethod: string;

  apiGetPath: string;
  apiDeletePath: string;
  apiUpdatePath: string;
  apiSavePath: string;

  requestPromises: RequestPromisesModel;
  hardReloadAfter: HardReloadAfterModel;

  view: ChangeDetectorRef | null;

  emitChanges(event: EmitEvent): void;

  on(event: string): Observable<any>;

  search(): Observable<any>;

  cancelPreviousRequest(): void;

  clear (reload?: boolean): void;

  createItem ({ data, method, params, path }?: { data?: object, method?: string, params?: object, path?: string }): Observable<any>;

  updateItem ({ id, data, method, params, path }?: { id?: number, data?: object, method?: string, params?: object, path?: string }): Observable<any>;

  deleteItem ({ id, method, params, path}?: { id: number, method?: string, params?: object, path?: string }): Observable<any>;

  deleteMany({ data, method, params, path }?: { data: object, method?: string, params?: object, path?: string }): Observable<any>;

  setParams(key: string, value: any): Collection<T>;

  getParams(key): any;

  clearParams(key: string): Collection<T>;

  setRouteParams(key: string, value: any): Collection<T>;

  getRouteParams(key): any;

  clearRouteParams(key: string): Collection<T>;

  initItems(): void;

  unshiftItem(item: T): void;

  pushItem(item: T): void;

  shiftItem(): void;

  spliceItem (item: T, indexOf): void;

  selectAll(): void;

  isOwnerCondition(use_id: number): void;

  selectItem(item: { id: number, user_id?: number }): void;

  unSelectAll(): void;

  detectChanges(): void;

  setProperty(key, value): Collection;

  initData(data: { items: T[], meta: ResponseMetaModel });

  reload(params?, path?): Observable<T[]>;
}
