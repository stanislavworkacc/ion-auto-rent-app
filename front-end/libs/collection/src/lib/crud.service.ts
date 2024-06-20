import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CrudHttpService } from './crud-http.service';
import { CrudEntityModel } from './models/crud-entity.model';
import { DeleteEntityModel } from './models/delete-entity.model';
import { GetEntityModel } from './models/get-entity.model';
import { PostEntityModel } from './models/post-entity.model';
import { UpdateEntityModel } from './models/update-entity.model';


@Injectable({
  providedIn: 'root'
})
export class CrudService {
  version: string = 'v1';

  constructor(private httpService: CrudHttpService) {
  }

  private getUrl(url: string, version?: string) {
    let apiVersion = this.version;
    if (version) {
       apiVersion = version;
    }
    return `${apiVersion}/${url}`;
  }

  /**
   * Generate the rest full api endpoint path
   */
  generatePath(keys, newPath, params) {
    if (keys.length) {
      keys.forEach(( key ) => {
        if (newPath.includes(':' + key)) {
          newPath = newPath.replace(':' + key, params[key]);
        }
      });
      return newPath;
    } else {
      return newPath;
    }
  }

  /**
   * Create the basic endpoints handlers for CRUD operations
   */
  createEntity({ name, keys = [], version = this.version }): CrudEntityModel {
    const endpoints = {
      get: undefined,
      save: undefined,
      update: undefined,
      delete: undefined,
      deleteMany: undefined
    };

    const resourceURL = name;

    endpoints.get = ({ id = null, query = null, routeParams = null, path = null } = {}) => {
      let baseUrl = (id) ? `${resourceURL}/${id}` : resourceURL;

      if (path) {
        baseUrl = path;
      }

      const url = this.generatePath(keys, baseUrl, routeParams);

      return this.httpService.get({ url: this.getUrl(url, version), params: query });
    };

    endpoints.save = ({ data = null, routeParams = null, path = null } = {}) => {
      let baseUrl = resourceURL;

      if (path) {
        baseUrl = path;
      }

      const url =  this.generatePath(keys, baseUrl, routeParams);
      return this.httpService.post({ url: this.getUrl(url, version), data });
    };

    endpoints.update = ({ id = null, data = null, routeParams = null, path = null } = {}) => {
      let baseUrl = (id) ? `${resourceURL}/${id}` : resourceURL;

      if (path) {
        baseUrl = path;
      }

      const url = this.generatePath(keys, baseUrl, routeParams);
      return this.httpService.put({ url: this.getUrl(url, version), data });
    };

    endpoints.delete = ({ id = null, routeParams = null, path = null } = {}) => {
      let baseUrl = `${resourceURL}/${id}`;

      if (path) {
        baseUrl = path;
      }

      const url = this.generatePath( keys, baseUrl, routeParams );
      return this.httpService.delete({ url: this.getUrl(url, version) });
    };

    endpoints.deleteMany = ({ data = null, routeParams = null, path = null } = {}) => {
      let baseUrl = resourceURL;

      if (path) {
        baseUrl = path;
      }

      const newPath =  this.generatePath(keys, baseUrl, routeParams);
      const url = this.getUrl(newPath, version);
      return this.httpService.deleteMany({ url, params: data });
    };

    return endpoints;
  }

  /**
   * Create a single get endpoint
   */
  createGetEntity({ name, keys = [], version = this.version }): GetEntityModel {
    const _loadingAsync: BehaviorSubject<boolean> = new BehaviorSubject(false);

    const endpoints = {
      get: undefined,
      loading$: _loadingAsync
    };

    const resourceURL = name;
    endpoints.get = ({ id = null, query = null } = {}) => {

      const path = (id) ? `${resourceURL}/${id}` : resourceURL;

      const url =  this.generatePath(keys, path, query);
      endpoints.loading$.next(true);

      return this.httpService.get({ url: this.getUrl(url, version), params: query }).pipe(
        map( res => {
          endpoints.loading$.next(false);
          return res;
        }),
        catchError((error): any => {
          endpoints.loading$.next(false);
          return throwError(error);
        }),
      );
    };

    return endpoints;
  }

  /**
   * Create the post endpoints handler for CRUD operations
   */
  createPostEntity({ name, keys = [], version = this.version }): PostEntityModel {
    const _loadingAsync: BehaviorSubject<boolean> = new BehaviorSubject(false);

    const endpoints = {
      save: undefined,
      loading$: _loadingAsync
    };

    const resourceURL = `${name}`;
    endpoints.save = ({ id = null, data = null, params = null } = {}) => {
      const newPath =  this.generatePath(keys, resourceURL, params);
      const url = (id) ? `${newPath}/${id}` : `${newPath}`;

      endpoints.loading$.next(true);

      return this.httpService.post({ url: this.getUrl(url, version), data }).pipe(
        map( res => {
          endpoints.loading$.next(false);
          return res;
        }),
        catchError((error): any => {
          endpoints.loading$.next(false);
          return throwError(error);
        }),
      );
    };

    return endpoints;
  }

  /**
   * Create the update entity handler for CRUD operations
   */
  createUpdateEntity({ name, keys = [], version = this.version }): UpdateEntityModel {
    const _loadingAsync: BehaviorSubject<boolean> = new BehaviorSubject(false);

    const endpoints = {
      update: undefined,
      loading$: _loadingAsync
    };

    const resourceURL = `${name}`;

    endpoints.update = ({ id = null, data = null, params = null } = {}) => {
      const newPath =  this.generatePath(keys, resourceURL, params);
      const url = (id) ? `${newPath}/${id}` : `${newPath}`;
      endpoints.loading$.next(true);
      return this.httpService.put({ url: this.getUrl(url, version), data }).pipe(
        map( res => {
          endpoints.loading$.next(false);
          return res;
        }),
        catchError((error): any => {
          endpoints.loading$.next(false);
          return throwError(error);
        }),
      );
    };

    return endpoints;
  }

  /**
   * Create the basic delete endpoints handlers for CRUD operations
   */
  createDeleteEntity({ name, keys = [], version = this.version }): DeleteEntityModel {
    const _loadingAsync: BehaviorSubject<boolean> = new BehaviorSubject(false);

    const endpoints = {
      delete: undefined,
      loading$: _loadingAsync
    };

    const resourceURL = `${name}`;

    endpoints.delete = ({ id = null, config = null, params = null } = {}) => {
      const newPath =  this.generatePath(keys, resourceURL, params);
      const url = (id) ? `${newPath}/${id}` : `${newPath}`;
      endpoints.loading$.next(true);
      return this.httpService.delete({ url: this.getUrl(url, version), params: config }).pipe(
        map( res => {
          endpoints.loading$.next(false);
          return res;
        }),
        catchError((error): any => {
          endpoints.loading$.next(false);
          return throwError(error);
        }),
      );
    };

    return endpoints;
  }

  /**
   * Create the basic delete many endpoints handlers for CRUD operations
   */
  createDeleteManyEntity({ name, keys = [], version = this.version }): DeleteEntityModel {
    const _loadingAsync: BehaviorSubject<boolean> = new BehaviorSubject(false);

    const endpoints = {
      delete: undefined,
      loading$: _loadingAsync
    };

    const resourceURL = `${name}`;

    endpoints.delete = ({ id = null, params = null, body = null } = {}) => {
      const newPath =  this.generatePath(keys, resourceURL, params);
      const url = (id) ? `${newPath}/${id}` : `${newPath}`;
      endpoints.loading$.next(true);
      return this.httpService.deleteMany({ url: this.getUrl(url, version), params, body }).pipe(
        map( res => {
          endpoints.loading$.next(false);
          return res;
        }),
        catchError((error): any => {
          endpoints.loading$.next(false);
          return throwError(error);
        }),
      );
    };

    return endpoints;
  }

  /**
   * Create the get method handler for CRUD operations
   */
  createGetMethod({ name, keys = [], version = this.version }) {
    return ({ id = null, query = null, routeParams = null, path = null } = {}) => {
      let baseUrl = (id) ? `${name}/${id}` : name;

      if (path) {
        baseUrl = path;
      }

      const url = this.generatePath(keys, baseUrl, routeParams);

      return this.httpService.get({ url: this.getUrl(url, version), params: query });
    };
  }

  /**
   * Create the post method handler for CRUD operations
   */
  createPostMethod({ name, keys = [], version = this.version }) {
    return ({ data = null, routeParams = null, path = null } = {}) => {
      let baseUrl = name;

      if (path) {
        baseUrl = path;
      }

      const url =  this.generatePath(keys, baseUrl, routeParams);
      return this.httpService.post({ url: this.getUrl(url, version), data });
    };
  }

  /**
   * Create the update method handler for CRUD operations
   */
  createUpdateMethod({ name, keys = [], version = this.version }) {
    return ({ id = null, data = null, routeParams = null, path = null } = {}) => {
      let baseUrl = (id) ? `${name}/${id}` : name;

      if (path) {
        baseUrl = path;
      }

      const url = this.generatePath(keys, baseUrl, routeParams);
      return this.httpService.put({ url: this.getUrl(url, version), data });
    };
  }

  /**
   * Create the delete method handler for CRUD operations
   */
  createDeleteMethod({ name, keys = [], version = this.version }) {
    return ({ id = null, routeParams = null, path = null } = {}) => {
      let baseUrl = `${name}/${id}`;

      if (path) {
        baseUrl = path;
      }

      const url = this.generatePath( keys, baseUrl, routeParams );
      return this.httpService.delete({ url: this.getUrl(url, version) });
    };
  }
}
