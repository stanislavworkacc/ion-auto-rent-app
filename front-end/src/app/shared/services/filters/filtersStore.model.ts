import { Router } from '@angular/router';
import { FilterStorage } from '@core/filterStorage';
import { BehaviorSubject } from 'rxjs';

export interface FilterStorageModel {
  filters: Map<any, any>;
  router: Router;
  noFiltersInRoute: Set<any>;
  changed: BehaviorSubject<any>;

  // @ts-ignore
  setToUrl(merge: boolean = false);

  set(key: string, value: any): FilterStorage;

  get(key: string): any;

  getAll();

  clear(key: string);

  // @ts-ignore
  clearAll(noClearArrayKeys: Array<string> = []);

  // @ts-ignore
  generateQueryParams(merge = true);

  // @ts-ignore
  navigationTo(merge = true);

  generateFilterParams();
}


