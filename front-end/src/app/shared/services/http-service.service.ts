import { Injectable } from '@angular/core';
// import {HttpClient} from "@angular/common/http";
import {domainName, environment} from "../../../environments/environment";
import {CommonHttpService} from "./common-http.service";
import {LoadingService} from "./loading.service";

@Injectable({ providedIn: 'root' })
export class HttpService extends CommonHttpService {
  constructor(
    loadingService: LoadingService,
  ) {
    super(
      loadingService,
    );
    this.apiUrl = domainName;
  }
}
