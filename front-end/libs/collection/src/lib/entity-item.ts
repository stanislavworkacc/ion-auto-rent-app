import { ChangeDetectorRef} from '@angular/core';
import { BehaviorSubject, Observable, of, Subject, throwError} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LoadingCrudModel } from './models/models';

export class Item {
  api: object | any;
  data: any = {};
  loading: boolean = false;
  loaded: boolean = false;
  apiGetMethod: string = 'get';
  apiSaveMethod: string = 'save';
  apiUpdateMethod: string = 'update';
  apiDeleteMethod: string = 'delete';
  params: any = {};
  initParams: any = {};
  routeParams: any = {};
  loadingCrud: LoadingCrudModel = {
    creating: false,
    updating: false,
    deleting: false,
  };

  apiGetPath: string = '';
  apiDeletePath: string = '';
  apiUpdatePath: string = '';
  apiSavePath: string = '';

  private onLoadSubject$ = new Subject<any>();

  onLoad$ = this.onLoadSubject$.asObservable();

  private loadingCrudSubject$: BehaviorSubject<any> = new BehaviorSubject({
    creating: false,
    updating: false,
    deleting: false
  });

  loadingCrud$ = this.loadingCrudSubject$.asObservable();

  private loadingSubject$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  loading$ = this.loadingSubject$.asObservable();

  view: ChangeDetectorRef;

  setProperty(key, value): Item {
    if (value !== null) {
      this[key] = value;
    } else {
      console.error('Value is undefined');
    }
    return this;
  }

  setRouteParams(key, value): Item {
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

  clearRouteParams(key): Item {
    if (this.routeParams.hasOwnProperty(key)) {
      delete this.routeParams[key];
    }
    return this;
  }

  setParams(key, value): Item {
    if (value !== null) {
      this.params[key] = value;
    } else {
      console.error('Value is undefined');
    }
    return this;
  }

  getParams(key): any {
    return this.params[key];
  }

  clearParams(key): Item {
    if (this.params.hasOwnProperty(key)) {
      delete this.params[key];
    }

    return this;
  }

  clear(reload = false): void {
    this.data = {};
    this.loading = false;
    this.loaded = false;
    this.params = { ...this.initParams };
    this.routeParams = {};

    if (reload) {
      this.load()
        .subscribe();
    }
  }

  mapItem(res: any): any {
    return res;
  }

  mapResponse(res) {
    return res;
  }

  detectChanges(): void {
    if (this.view) {
      this.view.detectChanges();
    } else {
      // console.error('Please, set property view');
    }
  }

  load(params = {}, path = null): Observable<any> {
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
        id: this.params['id'] || this.routeParams['id'], // Todo change this.parmas to this.routeParams
        query: queryParams,
        routeParams: this.routeParams,
        path: apiPath
      }
    );

    this.detectChanges();

    return request
      .pipe(
        map(response => {
            this.loaded = true;
            this.loading = false;
            this.loadingSubject$.next(this.loading);
            this.data = this.mapResponse(response);
            this.data = this.mapItem(this.data);
            this.onLoadSubject$.next(this.data);
            this.detectChanges();
          // TODO should replace to response
            return this.data;
          }
        ),
        catchError((error): any => {
          this.loaded = false;
          this.loading = false;
          this.loadingSubject$.next(this.loading);
          this.detectChanges();
          return throwError(error);
        })
      );
  }

  createItem({ data, method, params, path }: { data?: object, method?: string, params?: object, path?: string } = {}): Observable<any> {
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
    this.detectChanges();
    return this.api[apiMethod]({ data, routeParams: config, path: apiPath })
      .pipe(
        map(response => {
            this.loadingCrud.creating = false;
            this.loadingCrudSubject$.next(this.loadingCrud);
            this.detectChanges();
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

  updateItem({ data, method, params, path }: { data?: object, method?: string, params?: object, path?: string } = {}): Observable<any> {
    if (this.loadingCrud.updating) {
      return of(false);
    }
    const config = { ...this.routeParams, ...params };
    let apiMethod = this.apiUpdateMethod;

    if (method) {
      apiMethod = method;
    }

    let apiPath = this.apiSavePath;

    if (path) {
      apiPath = path;
    }

    this.loadingCrud.updating = true;
    this.loadingCrudSubject$.next(this.loadingCrud);
    this.detectChanges();

    return this.api[apiMethod]({
      id: this.data['id'],
      data, routeParams: config,
      path: apiPath
    }).pipe(
      map(response => {
          this.loadingCrud.updating = false;
          this.loadingCrudSubject$.next(this.loadingCrud);
          this.detectChanges();
          return response;
        }
      ),
      catchError((error): any => {
        this.loadingCrud.updating = false;
        this.loadingCrudSubject$.next(this.loadingCrud);
        this.detectChanges();
        return throwError(error);
      })
    );
  }

  deleteItem({ method, params, path }: { method?: string, params?: object, path?: string } = {}): Observable<any> {
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

    this.detectChanges();

    return this.api[apiMethod]({
      id: this.data['id'],
      routeParams: config,
      path: apiPath
    }).pipe(
      map(response => {
          this.loadingCrud.deleting = false;
          this.loadingCrudSubject$.next(this.loadingCrud);
          this.detectChanges();
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

  constructor(private config: object = {}) {
    if (config.hasOwnProperty('api')) {
      this.api = config['api'];
    }

    if (config.hasOwnProperty('params')) {
      this.params = config['params'];
      this.initParams = { ...this.initParams, ...config['params'] };
    }
  }
}
