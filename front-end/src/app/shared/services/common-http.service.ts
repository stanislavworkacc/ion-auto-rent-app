import {inject, Injectable} from '@angular/core';
import {StrMap} from "../../../../libs/collection/src/lib/crud-http.service";
import {from, Observable, Subject, tap} from "rxjs";
import {LoadingService} from "./loading.service";
import {CapacitorHttp} from "@capacitor/core";
import {map} from "rxjs/operators";
import {StorageService} from "./storage.service";
import {of} from "rxjs/internal/observable/of";
import {ModalController} from "@ionic/angular/standalone";
import {HttpResponse} from "@angular/common/http";
import {AuthorizatorComponent} from "../../auth/authorizator/authorizator.component";
import {ToasterService} from "../components/app-toast/toaster.service";

const defaultOptions = {
  responseType: 'json'
};

export function getOptions(params?: StrMap<string>, additionalOptions?: any): any {
  return {
    ...additionalOptions,
    ...params
  };
}

@Injectable({
  providedIn: 'root'
})
export class CommonHttpService {
  apiUrl!: string;
  private destroyed$ = new Subject<void>();
  private readonly track: <T>(observable: Observable<T>) => Observable<T>;

  private storageService: StorageService = inject(StorageService);
  private modalController: ModalController = inject(ModalController);
  private toasterService: ToasterService = inject(ToasterService);

  get toaster() {
    return this.toasterService;
  }
  get<TResponse>({url, params, additionalOptions}: {
    url: string, params?: StrMap<string>,
    additionalOptions?: any
  }) {
    return this.track(
      from(CapacitorHttp.get({
        url: this.setUrl(url, this.getStringParams(getOptions(params, additionalOptions))),
        headers: this.addHeader(),
        webFetchExtra: {
          credentials: "include",
        },
      })).pipe(
        this.intercept()
        // map((responseData) => ({
        //   meta: responseData?.data?.meta || [],
        //   items: responseData?.data?.items || [],
        //   ...responseData,
        // }))
      )
    );
  }

  post<TResponse, TData = any>({url, params, data, additionalOptions}: {
    url: string, data?: TData, additionalOptions?: any,
    params?: StrMap<string>
  }) {
    return this.track(
      from(CapacitorHttp.post({
            url: this.setUrl(url, this.getStringParams(getOptions(params, additionalOptions))),
            data: data,
            headers: this.addHeader(),
            webFetchExtra: {
              credentials: "include",
            },
          },
        )
      ).pipe(
        this.intercept()
      )
    );
  }

  put<TResponse, TData = any>(
    {url, params, data, additionalOptions}: {
      url: string,
      data?: TData,
      additionalOptions?: any,
      params?: StrMap<string>
      webFetchExtra: {
        credentials: "include",
      },
    }
  ) {
    return this.track(
      from(CapacitorHttp.put(
        {
          url: this.setUrl(url, this.getStringParams(getOptions(params, additionalOptions))),
          data,
          // params: getOptions(params, additionalOptions),
          headers: this.addHeader(),
        },
      ))
    );
  }

  delete({url, params}: { url: string, params?: StrMap<string> }) {
    return this.track(
      from(CapacitorHttp.delete(
        {
          url: this.setUrl(url, this.getStringParams(getOptions(params))),
          // params: getOptions(params),
          headers: this.addHeader(),
          webFetchExtra: {
            credentials: "include",
          },
        },
      ))
    );
  }

  deleteMany({url, params, body}: { url: string, params?: StrMap<string>, body?: any }) {
    const options = getOptions(params);

    if (body) {
      options['body'] = body;
    }
    return this.track(
      from(CapacitorHttp.request({
        method: 'delete',
        url: this.setUrl(url, this.getStringParams(getOptions(params))),
        // params: options,
        headers: this.addHeader(),
        webFetchExtra: {
          credentials: "include",
        },
      }))
    );
  }

  private getUrl(url: string) {
    return `${this.apiUrl}/${url}`;
  }

  getStringParams(params: any) {
    return Object.keys(params).reduce((accum, param) => {
      accum += `${param}=${params[param]}&`
      return accum
    }, '')
  }

  setUrl(url: string, params: string) {
    if (params) {
      url += `?${params}`
    }

    return this.getUrl(url);
  }

  intercept<T>() {
    return (source: Observable<T>) => {
      return source.pipe(
        tap( async (serverResponse: any): Promise<void> => {
          switch (serverResponse.status) {
            case 401:
              this.toaster.show({ type: 'error', message: 'Будь ласка, повторно авторизуйтесь для продовження роботи.' })
              const authModal: HTMLIonModalElement = await this.modalController.create({
                component: AuthorizatorComponent,
                cssClass: 'auth-modal',
                initialBreakpoint: 1,
                breakpoints: [0, 1]
              });

              await authModal.present();
          }
        })
      )
    }
  }


  addHeader() {
    // const token = localStorage.getItem('access_token');
    // const tokenData: any = await this.storageService.getObject('token');

    if (false) {

      return {
        // Authorization: `${tokenData.accessToken}`,
        'Content-Type': "application/json",
      }
    } else {
      return {
        'Content-Type': "application/json",
      }
    }
  }

  constructor(
    private loadingService: LoadingService,
  ) {
    this.track = this.loadingService.track(this.destroyed$);
  }
}
