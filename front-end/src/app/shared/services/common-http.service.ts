import {inject, Injectable} from '@angular/core';
import {StrMap} from "../../../../libs/collection/src/lib/crud-http.service";
import {from, Observable, Subject, tap} from "rxjs";
import {LoadingService} from "./loading.service";
import {CapacitorHttp} from "@capacitor/core";
import {map} from "rxjs/operators";

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

  get<TResponse>({url, params, additionalOptions}: {
    url: string, params?: StrMap<string>,
    additionalOptions?: any
  }) {
    return this.track(
      from(CapacitorHttp.get({
        url: this.setUrl(url, this.getStringParams(getOptions(params, additionalOptions))),
        headers: this.addHeader(),
      })).pipe(
        map((responseData) => ({
          meta: responseData?.data?.meta || [],
          items: responseData?.data?.items || [],
          ...responseData,
        }))
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
        },
      ))
    );
  }

  put<TResponse, TData = any>(
    {url, params, data, additionalOptions}: {
      url: string,
      data?: TData,
      additionalOptions?: any,
      params?: StrMap<string>
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


  addHeader(): any {
    const token = localStorage.getItem('access_token');

    if (token) {

      return {
        Authorization: `Bearer ${token}`,
        'content-type': "application/json"
      }
    } else {
      return {
        'content-type': "application/json"
      }
    }
  }

  constructor(
    private loadingService: LoadingService,
  ) {
    this.track = this.loadingService.track(this.destroyed$);
  }
}
