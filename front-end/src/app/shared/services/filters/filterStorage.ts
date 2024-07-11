import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

export class FilterStorage {
  filters: Map<any, any>;
  router: Router;
  noFiltersInRoute: Set<any> = new Set();
  changed: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor({filters, noFiltersInRoute = [], router}) {
    this.filters = filters;
    this.noFiltersInRoute = new Set(noFiltersInRoute);
    this.router = router;
  }

  setToUrl(merge = true) {
    return this.navigationTo(merge);
  }

  set(key: string, value: any): FilterStorage {
    if (this.filters.has(key)) {
      this.filters.set(key, value);
    }
    return this;
  }

  get(key: string): any {
    if (this.filters.has(key)) {
      return this.filters.get(key);
    }
    return null;
  }

  getAll() {
    const filters = {};
    for (const [key, value] of this.filters.entries()) {
      filters[key] = value;
    }
    return filters;
  }

  clear(key: string) {
    this.filters.set(key, null);
    return this;
  }

  clearAll(noClearArrayKeys: Array<string> = []) {
    const noClearSet = new Set(noClearArrayKeys);
    for (const [key] of this.filters.entries()) {
      if (!noClearSet.has(key)) {
        this.clear(key);
      }
    }
    return this;
  }

  generateQueryParams(merge = true) {
    const queryParams = {};

    for (const [key, value] of this.filters.entries()) {
      if (!this.noFiltersInRoute.has(key)) {
        if (value !== null) {
          queryParams[key] = value;
        } else if (!merge) {
          queryParams[key] = value;
        }
      }
    }

    return queryParams;
  }

  generateFilterParams() {
    const queryParams = {};

    for (const [key, value] of this.filters.entries()) {
      if (value !== null) {
        queryParams[key] = value;
      }
    }

    return queryParams;
  }

  navigationTo(merge = true) {
    const queryParamsObject = this.generateQueryParams(merge);
    const urlTree = this.router.createUrlTree([], {
      queryParams: queryParamsObject,
      queryParamsHandling: 'merge',
      preserveFragment: false
    });
    return this.router.navigateByUrl(urlTree, { replaceUrl: true });
  }
}
