import {
  mockCrudEntity,
  MockErrorCrudEntity,
  MOCK_ITEM_RESPONSE
} from '@shared/const/test.const';
import { BehaviorSubject, Subject } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { Item } from '../entity-item';
import { ItemModel } from '../models/item.model';


describe('Item', () => {
  let item: ItemModel;
  let api: any;

  beforeEach(() => {
    api = mockCrudEntity(MOCK_ITEM_RESPONSE);
    item = new Item({
      api: api
    });

    item.mapResponse = (res) => {
      return res.data;
    };
  });

  it('should create item instance', () => {
    expect(item).toBeTruthy();
    expect(item.api).toEqual(api);
    expect(item.data).toEqual({});
    expect(item.loading).toEqual(false);
    expect(item.loaded).toEqual(false);
    expect(item.apiGetMethod).toEqual('get');
    expect(item.apiSaveMethod).toEqual('save');
    expect(item.apiUpdateMethod).toEqual('update');
    expect(item.apiDeleteMethod).toEqual('delete');
    expect(item.params).toEqual({});
    expect(item.initParams).toEqual({});
    expect(item.routeParams).toEqual({});
    expect(item.loadingCrud).toEqual({
      creating: false,
      updating: false,
      deleting: false,
    });

    expect(item.apiGetPath).toEqual('');
    expect(item.apiDeletePath).toEqual('');
    expect(item.apiUpdatePath).toEqual('');
    expect(item.apiSavePath).toEqual('');

    expect(item['onLoadSubject$']).toEqual(new Subject<any>());
    expect(item.onLoad$).toEqual(item['onLoadSubject$'].asObservable());

    expect(item['loadingCrudSubject$']).toEqual(new BehaviorSubject({
      creating: false,
      updating: false,
      deleting: false
    }));
    expect(item.loadingCrud$).toEqual(item['loadingCrudSubject$'].asObservable());

    expect(item['loadingSubject$']).toEqual(new BehaviorSubject(false));
    expect(item.loading$).toEqual(item['loadingSubject$'].asObservable());
  });

  it('should set params and api if exist in constructor arguments', () => {
    item = new Item();
    expect(item.api).toBeUndefined();

    const params = {
      sort: true
    };

    item = new Item({
      params
    });

    expect(item.params).toEqual(params);
    expect(item.initParams).toEqual(params);
  });

  it('setProperty method should set new key, value for item instance', () => {
    item.setProperty('testProperty', true);
    expect(item['testProperty']).toBeTrue();

    item.setProperty('testPropertyWithNull', null);
    expect(item['testPropertyWithNull']).toBeUndefined();
  });

  it('setRouteParams method should set new key, value for item -> routeParams object', () => {
    item.setRouteParams('testParams', true);
    expect(item.routeParams['testParams']).toBeTrue();

    item.setRouteParams('testPropertyWithNull', null);
    expect(item['testPropertyWithNull']).toBeUndefined();
  });

  it('getRouteParams method should get value from item -> routeParams object by key', () => {
    item.setRouteParams('testParams', true);
    expect(item.getRouteParams('testParams')).toBeTrue();
  });

  it('clearRouteParams method should remove key from item -> routeParams object by key', () => {
    item.setRouteParams('testParams', true);
    item.clearRouteParams('testParams');
    expect(item.getRouteParams('testParams')).toBeUndefined();

    item.clearRouteParams('testParams1');
    expect(item.getRouteParams('testParams1')).toBeUndefined();
  });

  it('setParams method should set new key, value for item -> params object', () => {
    item.setParams('testParams', true);
    expect(item.params['testParams']).toBeTrue();

    item.setParams('testPropertyWithNull', null);
    expect(item['testPropertyWithNull']).toBeUndefined();
  });

  it('getParams method should get value from item -> params object by key', () => {
    item.setParams('testParams', true);
    expect(item.getParams('testParams')).toBeTrue();
  });

  it('clearParams method should remove key from item -> params object by key', () => {
    item.setParams('testParams', true);
    item.clearParams('testParams');
    expect(item.getParams('testParams')).toBeUndefined();

    item.clearParams('testParams1');
    expect(item.getParams('testParams1')).toBeUndefined();
  });

  it('clear() method should set all properties to initial', () => {
    item.setParams('testParams', 123);
    item.clear();

    expect(item.data).toEqual({});
    expect(item.loading).toBeFalse();
    expect(item.loaded).toBeFalse();
    expect(item.params).toEqual(item.initParams);
    expect(item.routeParams).toEqual({});
  });

  it('clear(true) method with true params should set all properties to initial and call load method', (done) => {
    item.onLoad$.subscribe(() => {
      done();
      expect(item.loaded).toBeTrue();
    });

    item.setProperty('api', mockCrudEntity(MOCK_ITEM_RESPONSE));
    item.clear(true);
  });

  it('mapItem(res) method should return params res', () => {
    expect(item.mapItem('response 123')).toEqual('response 123');
  });

  it('mapResponse(res) method should return params res', () => {
    item.mapResponse = (res) => {
      return res;
    };
    expect(item.mapResponse('response 123')).toEqual('response 123');
  });

  it('detectChanges() method should call markForCheck function', () => {
    item.view = {
      markForCheck: function () {}
    };

    spyOn(item.view, 'markForCheck');

    item.detectChanges();

    expect(item.view.markForCheck).toHaveBeenCalled();
  });

  it('should send get request on call load() method', (done) => {
    spyOn(item['loadingSubject$'], 'next');
    spyOn(item['onLoadSubject$'], 'next');
    spyOn(item, 'detectChanges');

    const request = item.load(null, 'path');

    expect(item.loading).toBeTrue();
    expect(item['loadingSubject$'].next).toHaveBeenCalledWith(true);
    expect(item.loaded).toBeFalse();

    request.subscribe((res) => {
      done();

      expect(item.loading).toBeFalse();
      expect(item.loaded).toBeTrue();
      expect(item['loadingSubject$'].next).toHaveBeenCalledWith(false);
      expect(item.data).toEqual(MOCK_ITEM_RESPONSE.data);
      expect(item['onLoadSubject$'].next).toHaveBeenCalledWith(item.data);
      expect(item.detectChanges).toHaveBeenCalled();
      expect(res).toEqual(MOCK_ITEM_RESPONSE.data);
    });
  });

  it('on call load({ data }) method with throwError should get error message', (done) => {
    item.setProperty('api', MockErrorCrudEntity);

    spyOn(item['loadingSubject$'], 'next');
    spyOn(item, 'detectChanges');

    item.load().subscribe(
      null,
      ( err ) => {
      done();
        expect(err).toEqual('errorMessage');
        expect(item.loaded).toBeFalse();
        expect(item.loading).toBeFalse();

        expect(item['loadingSubject$'].next).toHaveBeenCalledWith(false);
        expect(item.detectChanges).toHaveBeenCalled();
    });
  });

  it('on call createItem({ data }) method should send post request', (done) => {
    spyOn(item['loadingCrudSubject$'], 'next');
    spyOn(item, 'detectChanges');

    item.api['create'] = item.api.save;

    const dataToCreate = {
      id: 1,
      name: 'Item to Save'
    };

    const request = item.createItem({ data: dataToCreate, method: 'create', path: 'path' });

    expect(item.loadingCrud.creating).toBeTrue();
    expect(item['loadingCrudSubject$'].next).toHaveBeenCalledWith(item.loadingCrud);

    request.subscribe(({ data, path }) => {
      done();

      expect(data).toEqual(dataToCreate);
      expect(item.api['create']).toBeTruthy();
      expect(path).toEqual('path');

      expect(item.loadingCrud.creating).toBeFalse();
      expect(item['loadingCrudSubject$'].next).toHaveBeenCalledWith(item.loadingCrud);
      expect(item.detectChanges).toHaveBeenCalled();
    });
  });

  it('if loadingCrud.creating === true return of(false)', (done) => {
    item.loadingCrud.creating = true;

    const request = item.createItem({ data: {} });

    request.subscribe( (res) => {
      done();
      expect(res).toBeFalse();
    });
  });

  it('on call createItem({ data }) method with throwError should get error message', (done) => {
    item.setProperty('api', MockErrorCrudEntity);

    spyOn(item['loadingCrudSubject$'], 'next');
    spyOn(item, 'detectChanges');

    const dataToCreate = {
      id: 1,
      name: 'Item to Save'
    };

    item.createItem({ data: dataToCreate }).subscribe(
      null,
      err => {
        done();

        expect(err).toEqual('errorMessage');
        expect(item.loadingCrud.creating).toBeFalse();
        expect(item['loadingCrudSubject$'].next).toHaveBeenCalledWith(item.loadingCrud);
        expect(item.detectChanges).toHaveBeenCalled();
    });
  });

  it('on call updateItem({ data }) method should send post request', (done) => {
    spyOn(item['loadingCrudSubject$'], 'next');
    spyOn(item, 'detectChanges');

    item.api['updateMethod'] = function (arg) {
      return of(arg);
    };

    const dataToUpdate = {
      id: 1,
      name: 'Item to Update'
    };

    const request = item.updateItem({ data: dataToUpdate, method: 'updateMethod', path: 'path' });

    expect(item.loadingCrud.updating).toBeTrue();
    expect(item['loadingCrudSubject$'].next).toHaveBeenCalledWith(item.loadingCrud);

    request.subscribe(({ data, path }) => {
      done();

      expect(path).toEqual('path');

      expect(item.loadingCrud.updating).toBeFalse();
      expect(item['loadingCrudSubject$'].next).toHaveBeenCalledWith(item.loadingCrud);
      expect(item.detectChanges).toHaveBeenCalled();

      expect(data).toEqual(dataToUpdate);
    });
  });

  it('if loadingCrud.updating === true return of(false)', (done) => {
    item.loadingCrud.updating = true;

    const request = item.updateItem({ data: {} });

    request.subscribe( (res) => {
      done();
      expect(res).toBeFalse();
    });
  });

  it('on call updateItem({ data }) method with throwError should get error message', (done) => {
    item.setProperty('api', MockErrorCrudEntity);

    spyOn(item['loadingCrudSubject$'], 'next');
    spyOn(item, 'detectChanges');

    const dataToUpdate = {
      id: 1,
      name: 'Item to Update'
    };

    item.updateItem({ data: dataToUpdate }).subscribe(
      null,
      err => {
        done();

        expect(err).toEqual('errorMessage');
        expect(item.loadingCrud.updating).toBeFalse();
        expect(item['loadingCrudSubject$'].next).toHaveBeenCalledWith(item.loadingCrud);
        expect(item.detectChanges).toHaveBeenCalled();
      });
  });

  it('on call deleteItem({ data }) method should send post request', (done) => {
    spyOn(item['loadingCrudSubject$'], 'next');
    spyOn(item, 'detectChanges');

    item.api['deleteMethod'] = item.api.delete;

    const itemToDelete = {
      id: 1,
      name: 'Item to Delete'
    };

    item.setProperty('data', itemToDelete);

    const request = item.deleteItem({ method: 'deleteMethod', path: 'deletePathUrl'});

    expect(item.loadingCrud.deleting).toBeTrue();
    expect(item['loadingCrudSubject$'].next).toHaveBeenCalledWith(item.loadingCrud);

    request.subscribe( ({ message, arg }) => {
      done();

      expect(arg.path).toEqual('deletePathUrl');

      expect(item.loadingCrud.deleting).toBeFalse();
      expect(item['loadingCrudSubject$'].next).toHaveBeenCalledWith(item.loadingCrud);
      expect(item.detectChanges).toHaveBeenCalled();

      expect(message).toEqual('item successfully deleted!');
    });
  });

  it('if loadingCrud.deleting === true return of(false)', (done) => {
    item.loadingCrud.deleting = true;

    const request = item.deleteItem();

    request.subscribe( (res) => {
      done();
      expect(res).toBeFalse();
    });
  });

  it('on call deleteItem({ data }) method with throwError should get error message', (done) => {
    item.setProperty('api', MockErrorCrudEntity);

    spyOn(item['loadingCrudSubject$'], 'next');
    spyOn(item, 'detectChanges');

    const itemToDelete = {
      id: 1,
      name: 'Item to Delete'
    };

    item.setProperty('data', itemToDelete);

    item.deleteItem().subscribe(
      null,
      err => {
        done();

        expect(err).toEqual('errorMessage');
        expect(item.loadingCrud.deleting).toBeFalse();
        expect(item['loadingCrudSubject$'].next).toHaveBeenCalledWith(item.loadingCrud);
        expect(item.detectChanges).toHaveBeenCalled();
      });
  });
});
