import { ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject, throwError } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';
import {
  CollectionEventActions,
  EmitEvent,
  HardReloadAfterModel, LoadingCrudModel,
  RequestPromisesModel,
  ResponseMetaModel
} from './models/models';

export class Collection<T = { [key: string]: any }> {
  items: T[] = [];
  selectedItems: Set<number> = new Set<number>();
  totalSelectedItems: number = 0;
  canSelectItemKey: string = 'can-select';
  meta: ResponseMetaModel = {
    currentPage: 1,
    pageCount: 0,
    perPage: 15,
    totalCount: 0
  };
  loading = false;
  loaded = false;
  loadingCrud: LoadingCrudModel = {
    creating: false,
    updating: false,
    deleting: false,
  };
  loadByScrolling = false;

  routeParams: { [key: string]: any } = {};

  params: { [key: string]: any } = {
    page: 1,
    per_page: 15
  };

  initParams: { [key: string]: any } = {
    page: 1,
    per_page: 15
  };

  api: { [key: string]: Function };
  saveType = 'api';
  skeleton: boolean = false;
  skeletonCount: number = 0;

  apiGetMethod: string = 'get';
  apiDeleteMethod: string = 'delete';
  apiDeleteManyMethod: string = 'deleteMany';
  apiUpdateMethod: string = 'update';
  apiSaveMethod: string = 'save';

  hardReloadAfter: HardReloadAfterModel = {
    creating: true,
    updating: true,
    deleting: true,
  };

  requestPromises: RequestPromisesModel = {
    create: null,
    update: null,
    delete: null,
    get: null
  };

  apiGetPath: string = '';
  apiDeletePath: string = '';
  apiUpdatePath: string = '';
  apiSavePath: string = '';

  view: ChangeDetectorRef | any;

  private selectedItemsSubject$: BehaviorSubject<any> = new BehaviorSubject(this.selectedItems);
  selectedItems$ = this.selectedItemsSubject$.asObservable();

  private itemsSubject$: BehaviorSubject<T[]> = new BehaviorSubject([]);
  items$ = this.itemsSubject$.asObservable();

  private loadingSubject$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  loading$ = this.loadingSubject$.asObservable();

  private loadingCrudSubject$: BehaviorSubject<any> = new BehaviorSubject({
    creating: false,
    updating: false,
    deleting: false
  });

  loadingCrud$ = this.loadingCrudSubject$.asObservable();

  private onLoadSubject$ = new Subject<any>();
  onLoad$ = this.onLoadSubject$.asObservable();

  private changesSubject$ = new Subject();

  emitChanges(event: EmitEvent): void {
    this.changesSubject$.next(event);
  }

  on(event): Observable<any> {
    return this.changesSubject$.pipe(
      filter( (e: EmitEvent) => e.name === event),
      map( e => e.value)
    );
  }

  mapResponse(res): { items: T[], meta: ResponseMetaModel } {
    return res;
  }

  initData(data: { items: T[], meta: ResponseMetaModel }): any {
    try {
      if (data.meta) {
        this.meta = data.meta;
      }

      const items = data.items.map(
        item => {
          const mapItem = this.mapItems(item);
          if (item.hasOwnProperty('user_id')) {
            // @ts-ignore
            mapItem['user_id'] = item.user_id;
          }
          return this.mapOnSelectItems(mapItem);
        }
      );

      if (this.loadByScrolling && this.meta.currentPage !== 1) {
        this.items = this.items.concat(items);
      } else {
        this.items = items;
        this.unSelectAll();
      }

      this.itemsSubject$.next(this.items);

      this.calculateTotalSelectedItems();
    } catch (e) {
      return false;
    }
  }

  private calculateTotalSelectedItems(): void {
    const total = this.items.filter( item => item[this.canSelectItemKey]);
    this.totalSelectedItems = total.length;
  }

  mapOnSelectItems(item: T): T {
    item[this.canSelectItemKey] = true;
    return item;
  }

  mapItems(item: T): T {
    return item;
  }

  setProperty(key, value): Collection<T> {
    if (value !== null) {
      this[key] = value;
    } else {
      console.error('Value is undefined');
    }
    return this;
  }

  setRouteParams(key, value): Collection<T> {
    if (value !== null) {
      this.routeParams[key] = value;
    } else {
      console.error('Value is undefined');
    }

    return this;
  }

  getRouteParams(key): any {
    return this.routeParams[key];
  }

  clearRouteParams(key): Collection<T> {
    if (this.routeParams.hasOwnProperty(key)) {
      delete this.routeParams[key];
    }
    return this;
  }

  setParams(key: string, value: any): Collection<T> {
    if (value !== null) {
      this.params[key] = value;

      this.emitChanges({
        name: CollectionEventActions.onParamsChanged,
        value: this.params
      });
    } else {
      console.error('Value is undefined');
    }

    return this;
  }

  getParams(key): any {
    return this.params[key];
  }

  clearParams(key): Collection<T> {
    if (this.params.hasOwnProperty(key)) {
      delete this.params[key];

      this.emitChanges({
        name: CollectionEventActions.onParamsChanged,
        value: this.params
      });
    }
    return this;
  }

  clear(reload = false): void {
    this.items.length = 0;
    this.loading = false;
    this.loaded = false;
    this.selectedItems.clear();
    this.params = { ...this.initParams };
    this.routeParams = {};

    this.meta = {
      currentPage: 1,
      pageCount: 0,
      perPage: 15,
      totalCount: 0
    };

    this.itemsSubject$.next(this.items);
    this.loadingSubject$.next(this.loading);
    this.cancelPreviousRequest();

    if (reload) {
      this.reload()
        .subscribe();
    }
  }

  initItems(): void {
    this.itemsSubject$.next(this.items);
    this.detectChanges();
  }

  unshiftItem(item: T): void {
    this.items.unshift(item);
    this.itemsSubject$.next(this.items);
    this.detectChanges();
  }

  pushItem(item: T): void {
    // @ts-ignore
    if (item.id) {
      // @ts-ignore
      const elements = this.items.filter(el => el.id === item.id);
      const index = this.items.indexOf(elements[0]);
      this.items[index] = item;
    } else {
      this.items.push(item);
    }

    this.itemsSubject$.next(this.items);
    this.detectChanges();
  }

  shiftItem(): void {
    if (this.items.length) {
      this.items.shift();
      this.itemsSubject$.next(this.items);
      this.detectChanges();
    }
  }

  spliceItem(item: T, indexOf: number): void | boolean {
    // @ts-ignore
    if (!item.id) {
      return false;
    }

    if (indexOf) {
      this.items.splice(indexOf, 0, item);
    } else {
      // @ts-ignore
      const elements = this.items.filter(el => el.id === item.id);
      const index = this.items.indexOf(elements[0]);
      this.items[index] = item;
      this.items.splice(index, 1);
    }

    this.itemsSubject$.next(this.items);
    this.detectChanges();
  }

  search(): Observable<any> {
    this.cancelPreviousRequest();
    this.requestPromises.get = this.reload().subscribe();
    return this.onLoad$;
  }

  reload(params = {}, path = null): Observable<T[]> {
    this.loaded = false;
    this.loading = true;
    this.loadingSubject$.next(this.loading);

    let apiPath = this.apiGetPath;

    if (path) {
      apiPath = path;
    }

    const queryParams = Object.assign({}, this.params, params);
    const request = this.api[this.apiGetMethod](
      {
        id: null,
        query: queryParams,
        routeParams: this.routeParams,
        path: apiPath
      }
    );
    this.detectChanges();

    return request.pipe(
      map(( res: { data: Array<object>} ) => {
        this.loaded = true;
        this.loading = false;
        this.loadingSubject$.next(this.loading);

        const responseData = this.mapResponse(res);
        this.initData(responseData);
        this.onLoadSubject$.next(responseData);
        this.detectChanges();
        // TODO should replace to response
        return this.items;
      }),
      catchError((error): any => {
        this.loaded = false;
        this.loading = false;
        this.loadingSubject$.next(this.loading);
        this.detectChanges();
        return throwError(error);
      })
    );
  }

  createItem({ data, method, params, path }: { data?: object, method?: string, params?: object, path?: string }): Observable<any> {
    if (this.loadingCrud.creating) {
      return of(false);
    }

    const config = { ...this.routeParams, ...params };

    let apiMethod = this.apiSaveMethod;

    if (method) {
      apiMethod = method;
    }

    let apiPath = this.apiSavePath;

    if (path) {
      apiPath = path;
    }

    this.loadingCrud.creating = true;
    this.loadingCrudSubject$.next(this.loadingCrud);
    return this.api[apiMethod]({ data, routeParams: config, path: apiPath })
      .pipe(
        map(response => {
            this.loadingCrud.creating = false;
            this.loadingCrudSubject$.next(this.loadingCrud);

            if (this.hardReloadAfter.creating) {
              this.reload()
                .subscribe();
            } else {
              this.detectChanges();
            }
            return response;
          }
        ),
        catchError((error): any => {
          this.loadingCrud.creating = false;
          this.loadingCrudSubject$.next(this.loadingCrud);
          this.detectChanges();
          return throwError(error);
        })
      );
  }

  updateItem({ id, data, method, params, path }: { id?: number, data: object, method?: string, params?: object, path?: string }): Observable<any> {
    if (this.loadingCrud.updating) {
      return of(false);
    }

    const config = { ...this.routeParams, ...params };
    let apiMethod = this.apiUpdateMethod;

    if (method) {
      apiMethod = method;
    }

    let apiPath = this.apiUpdatePath;

    if (path) {
      apiPath = path;
    }

    this.loadingCrud.updating = true;
    this.loadingCrudSubject$.next(this.loadingCrud);

    return this.api[apiMethod]({ id, data, routeParams: config, path: apiPath })
      .pipe(
        map(response => {
            this.loadingCrud.updating = false;
            this.loadingCrudSubject$.next(this.loadingCrud);

            if (this.hardReloadAfter.updating) {
              this.reload()
                .subscribe();
            } else {
              this.detectChanges();
            }

            return response;
          }
        )
      )
      .pipe(
        catchError((error): any => {
          this.loadingCrud.updating = false;
          this.loadingCrudSubject$.next(this.loadingCrud);
          this.detectChanges();
          return throwError(error);
        })
      );
  }

  deleteItem({ id, method, params, path }: { id: number, method?: string, params?: object, path?: string }): Observable<any> {
    if (this.loadingCrud.deleting) {
      return of(false);
    }

    const config = { ...this.routeParams, ...params };
    let apiMethod = this.apiDeleteMethod;

    if (method) {
      apiMethod = method;
    }

    let apiPath = this.apiDeletePath;

    if (path) {
      apiPath = path;
    }

    this.loadingCrud.deleting = true;
    this.loadingCrudSubject$.next(this.loadingCrud);

    return this.api[apiMethod]({ id, routeParams: config , path: apiPath })
      .pipe(
        map(response => {
            this.loadingCrud.deleting = false;
            this.loadingCrudSubject$.next(this.loadingCrud);

            if (this.hardReloadAfter.deleting) {
              this.reload()
                .subscribe();
            } else {
              this.detectChanges();
            }

            return response;
          }
        ),
        catchError((error): any => {
          this.loadingCrud.deleting = false;
          this.loadingCrudSubject$.next(this.loadingCrud);
          this.detectChanges();
          return throwError(error);
        })
      );
  }

  deleteMany({ data, params, method, path }: { data: object, method?: string, params?: object, path?: string }): Observable<any> {
    if (this.loadingCrud.deleting) {
      return of(false);
    }

    const config = { ...this.routeParams, ...params };

    let apiMethod = this.apiDeleteManyMethod;

    if (method) {
      apiMethod = method;
    }

    let apiPath = this.apiDeletePath;

    if (path) {
      apiPath = path;
    }

    this.loadingCrud.deleting = true;
    this.loadingCrudSubject$.next(this.loadingCrud);

    console.log('data', data);
    console.log('this.api[apiMethod]', this.api[apiMethod]);

    return this.api[apiMethod]({ data, routeParams: config, path: apiPath, body: data})
      .pipe(
        map(response => {
            this.loadingCrud.deleting = false;
            this.loadingCrudSubject$.next(this.loadingCrud);

            if (this.hardReloadAfter.deleting) {
              this.reload()
                .subscribe();
            } else {
              this.detectChanges();
            }

            return response;
          }
        ),
        catchError((error): any => {
          console.log('error', error);
          this.loadingCrud.deleting = false;
          this.loadingCrudSubject$.next(this.loadingCrud);
          this.detectChanges();
          return throwError(error);
        })
      );
  }

  selectAll(): void  {
    this.selectedItems = new Set();
    this.items.forEach((item) => {
      if (item[this.canSelectItemKey]) {
        // @ts-ignore
        this.selectedItems.add(item.id);
      }
    });

    this.selectedItemsSubject$.next(this.selectedItems);
    this.detectChanges();
  }

  isOwnerCondition(user_id: number): boolean {
    return true;
  }

  selectItem(item: { id: number, user_id?: number }): void {
    if (this.isOwnerCondition(item.user_id)) {
      if (this.selectedItems.has(item.id)) {
        this.selectedItems.delete(item.id);
      } else {
        this.selectedItems.add(item.id);
      }

      this.selectedItemsSubject$.next(this.selectedItems);
      this.detectChanges();
    }
  }

  unSelectAll(): void {
    this.selectedItems.clear();
    this.selectedItemsSubject$.next(this.selectedItems);
    this.detectChanges();
  }

  detectChanges(): void {
    if (this.view) {
      this.view.detectChanges();
      console.log('collection detectChanges()');
    } else {
      // console.error('Please, set property view');
    }
  }

  cancelPreviousRequest(): void {
    if (this.requestPromises.get !== null) {
      this.requestPromises.get.unsubscribe();
    }
  }

  constructor(private config: object = {}) {
    if (config.hasOwnProperty('params')) {
      this.params = { ...this.params, ...config['params'] };
      this.initParams = { ...this.initParams, ...config['params'] };
    }

    if (config.hasOwnProperty('api')) {
      this.api = config['api'];
    }

    if (config.hasOwnProperty('view')) {
      this.view = config['view'];
    }

    return this;
  }
}
