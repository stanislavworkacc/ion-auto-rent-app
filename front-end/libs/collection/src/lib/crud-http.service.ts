import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';

export interface StrMap<TValue> { [key: string]: TValue | TValue[] }


@Injectable({
  providedIn: 'root'
})
export class CrudHttpService {
  apiUrl: string;

  get<TResponse>({ url, params, additionalOptions }: {
    url: string, params?: StrMap<string>,
    additionalOptions?: any
  }): Observable<TResponse> {
    return of();
  }


  post<TResponse, TData = any>({ url, params, data, additionalOptions }: {
    url: string, data?: TData, additionalOptions?: any,
    params?: StrMap<string>
  }): Observable<TResponse> {
    return of();
  }

  put<TResponse, TData = any>(
    { url, params, data, additionalOptions }: { url: string, data?: TData, additionalOptions?: any, params?: StrMap<string> }
  ): Observable<TResponse> {
    return of();
  }

  delete({ url, params }: { url: string, params?: StrMap<string> }) {
    return of();
  }

  deleteMany({ url, params, body }: { url: string, params?: StrMap<string>, body?: any }) {
    return of();
  }
}
