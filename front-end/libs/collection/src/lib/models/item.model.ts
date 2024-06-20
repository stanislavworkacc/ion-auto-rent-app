import { ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../entity-item';
import { LoadingCrudModel } from './models';

export interface ItemModel {
  loading$: Observable<boolean>;
  loadingCrud$: Observable<any>;
  onLoad$: Observable<any>;
  loading: boolean;
  loaded: boolean;
  data: any;
  params: any;
  initParams: any;
  routeParams: any;
  api: object | any;
  apiGetMethod: string;
  apiSaveMethod: string;
  apiUpdateMethod: string;
  apiDeleteMethod: string;

  apiGetPath: string;
  apiDeletePath: string;
  apiUpdatePath: string;
  apiSavePath: string;
  loadingCrud: LoadingCrudModel;

  view: ChangeDetectorRef | any;

  createItem({ data, method, params, path }?: { data?: object, method?: string, params?: object, path?: string }): Observable<any>;

  updateItem({ data, params, path }?: { data: object, method?: string, params?: object, path?: string }): Observable<any>;

  deleteItem({ method, params, path }?: { method?: string, params?: object, path?: string }): Observable<any>;

  setParams(key: string, value: any): Item;

  getParams(key): any;

  clearParams(key: string): Item;

  setProperty(key, value): Item;

  setRouteParams(key: string, value: any): Item;

  getRouteParams(key): any;

  clearRouteParams(key: string): Item;

  load(params?: object, path?): Observable<any>;

  clear(reload?: boolean): void;

  mapItem(item: any): any;

  mapResponse(res: any): any;

  detectChanges(): void;
}
