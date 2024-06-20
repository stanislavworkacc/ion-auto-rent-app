import {
  mockCrudEntity,
  MockErrorCrudEntity,
  MOCK_COLLECTION_RESPONSE,
} from '@shared/const/test.const';
import { BehaviorSubject, Subject } from 'rxjs';
import { Collection } from '../collection';
import { CollectionModel } from '../models/collection.model';
import { CollectionEventActions} from '../models/models';

describe('Collection', () => {
  let collection: CollectionModel;
  let api: any;

  beforeEach(() => {
    api = mockCrudEntity(MOCK_COLLECTION_RESPONSE);
    collection = new Collection({
      api: api
    });

    collection.mapResponse = (res) => {
      if (!res.data.hasOwnProperty('items')) {
        return res.data;
      }

      return {
        items: res.data.items,
        meta: res.data._meta
      };
    };
  });

  afterEach(() => {
    api = mockCrudEntity(MOCK_COLLECTION_RESPONSE);
    collection = new Collection({
      api: api
    });

    collection.mapResponse = (res) => {
      if (!res.data.hasOwnProperty('items')) {
        return res.data;
      }

      return {
        items: res.data.items,
        meta: res.data._meta
      };
    };
  });

  it('should create collection instance', () => {
    expect(collection).toBeTruthy();
    expect(collection.api).toEqual(api);
    expect(collection.items).toEqual([]);
    expect(collection.meta).toEqual({
      currentPage: 1,
      pageCount: 0,
      perPage: 15,
      totalCount: 0
    });
    expect(collection.loadByScrolling).toEqual(false);
    expect(collection.loading).toEqual(false);
    expect(collection.loaded).toEqual(false);
    expect(collection.loadingCrud).toEqual({
      creating: false,
      updating: false,
      deleting: false,
    });
    expect(collection.selectedItems).toEqual(new Set<number>());
    expect(collection.totalSelectedItems).toEqual(0);
    expect(collection.canSelectItemKey).toEqual('can-select');

    expect(collection.params).toEqual({
      page: 1,
      per_page: 15
    });
    expect(collection.initParams).toEqual({
      page: 1,
      per_page: 15
    });
    expect(collection.routeParams).toEqual({});
    expect(collection.saveType).toEqual('api');
    expect(collection.skeleton).toEqual(false);
    expect(collection.skeletonCount).toEqual(0);

    expect(collection.apiGetMethod).toEqual('get');
    expect(collection.apiDeleteMethod).toEqual('delete');
    expect(collection.apiDeleteManyMethod).toEqual('deleteMany');
    expect(collection.apiUpdateMethod).toEqual('update');
    expect(collection.apiSaveMethod).toEqual('save');


    expect(collection.hardReloadAfter).toEqual({
      creating: true,
      updating: true,
      deleting: true,
    });

    expect(collection.requestPromises).toEqual({
      create: null,
      update: null,
      delete: null,
      get: null
    });

    expect(collection.apiGetPath).toEqual('');
    expect(collection.apiDeletePath).toEqual('');
    expect(collection.apiUpdatePath).toEqual('');
    expect(collection.apiSavePath).toEqual('');

    expect(collection['selectedItemsSubject$']).toEqual(new BehaviorSubject(collection.selectedItems));
    expect(collection.selectedItems$).toEqual(collection['selectedItemsSubject$'].asObservable());

    expect(collection['itemsSubject$']).toEqual(new BehaviorSubject([]));
    expect(collection.items$).toEqual(collection['itemsSubject$'].asObservable());

    expect(collection['loadingSubject$']).toEqual(new BehaviorSubject(false));
    expect(collection.loading$).toEqual(collection['loadingSubject$'].asObservable());

    expect(collection['loadingCrudSubject$']).toEqual(new BehaviorSubject({
      creating: false,
      updating: false,
      deleting: false
    }));
    expect(collection.loadingCrud$).toEqual(collection['loadingCrudSubject$'].asObservable());

    expect(collection['onLoadSubject$']).toEqual(new Subject<any>());
    expect(collection.onLoad$).toEqual(collection['onLoadSubject$'].asObservable());

    expect(collection['changesSubject$']).toEqual(new Subject());
  });

  it('should set params and api if exist in constructor arguments', () => {
    collection = new Collection();
    expect(collection.api).toBeUndefined();

    const params = {
      page: 1,
      per_page: 15,
      sort: true
    };

    const view = {
      markForCheck: () => {}
    };

    collection = new Collection({
      params,
      view
    });

    expect(collection.params).toEqual(params);
    expect(collection.initParams).toEqual(params);
    expect(collection.view).toEqual(view);
  });

  it('emitChanges method should emit event into changesSubject$', () => {
    spyOn(collection['changesSubject$'], 'next');

    const event = {
      name: 'Event name',
      value: 'value'
    };

    collection.emitChanges(event);

    expect(collection['changesSubject$'].next).toHaveBeenCalledWith(event);
  });

  it('on(event: string) method should should subscribe to separate event by eventName', (done) => {
    collection.on(CollectionEventActions.onParamsChanged).subscribe( res => {
      done();
      expect(res).toBeTruthy();
    });

    collection.setParams('name', 'Test');
  });

  it('setProperty method should set new key, value for collection instance', () => {
    collection.setProperty('testProperty', true);
    expect(collection['testProperty']).toBeTrue();

    collection.setProperty('testPropertyWithNull', null);
    expect(collection['testPropertyWithNull']).toBeUndefined();
  });

  it('setRouteParams method should set new key, value for collection -> routeParams object', () => {
    collection.setRouteParams('testParams', true);
    expect(collection.routeParams['testParams']).toBeTrue();

    collection.setRouteParams('testPropertyWithNull', null);
    expect(collection['testPropertyWithNull']).toBeUndefined();
  });

  it('getRouteParams method should get value from collection -> routeParams object by key', () => {
    collection.setRouteParams('testParams', true);
    expect(collection.getRouteParams('testParams')).toBeTrue();
  });

  it('clearRouteParams method should remove key from collection -> routeParams object by key', () => {
    collection.setRouteParams('testParams', true);
    collection.clearRouteParams('testParams');
    expect(collection.getRouteParams('testParams')).toBeUndefined();

    collection.clearRouteParams('testParams1');
    expect(collection.getRouteParams('testParams1')).toBeUndefined();
  });

  it('setParams method should set new key, value for collection -> params object', () => {
    spyOn(collection, 'emitChanges');

    collection.setParams('testParams', true);
    expect(collection.params['testParams']).toBeTrue();
    expect(collection.emitChanges).toHaveBeenCalled();

    collection.setParams('testPropertyWithNull', null);
    expect(collection['testPropertyWithNull']).toBeUndefined();
  });

  it('getParams method should get value from collection -> params object by key', () => {
    collection.setParams('testParams', true);
    expect(collection.getParams('testParams')).toBeTrue();
  });

  it('clearParams method should remove key from collection -> params object by key', () => {
    collection.setParams('testParams', true);
    collection.clearParams('testParams');
    expect(collection.getParams('testParams')).toBeUndefined();

    collection.clearParams('testParams1');
    expect(collection.getParams('testParams1')).toBeUndefined();
  });

  it('clear() method should set all properties to initial', () => {
    collection.setParams('testParams', 123);
    spyOn(collection['itemsSubject$'], 'next');
    spyOn(collection['loadingSubject$'], 'next');
    spyOn(collection, 'cancelPreviousRequest');

    collection.clear();

    expect(collection.items.length).toEqual(0);
    expect(collection.loading).toBeFalse();
    expect(collection.loaded).toBeFalse();
    expect(collection.selectedItems.size).toEqual(0);
    expect(collection.params).toEqual(collection.initParams);
    expect(collection.routeParams).toEqual({});

    expect(collection['itemsSubject$'].next).toHaveBeenCalledWith(collection.items);
    expect(collection['loadingSubject$'].next).toHaveBeenCalledWith(false);
    expect(collection['cancelPreviousRequest']).toHaveBeenCalled();
  });

  it('initData', () => {
    const mockData = {
      data: {
        items1: [],
        _meta: {
          currentPage: 2,
          pageCount: 2,
          perPage: 15,
          totalCount: 0
        }
      }
    };

    const res = collection.mapResponse(mockData);
    expect(collection.initData(res)).toBeFalse();

    const mockDataWithMeta = {
      data: {
        items: [],
        _meta: {
          currentPage: 2,
          pageCount: 2,
          perPage: 15,
          totalCount: 0
        }
      }
    };

    const res2 = collection.mapResponse(mockDataWithMeta);
    collection.initData(res2);

    expect(collection.meta).toEqual({
      currentPage: 2,
      pageCount: 2,
      perPage: 15,
      totalCount: 0
    });

    const mockDataWithoutMeta = {
      data: {
        items: []
      }
    };

    collection.clear();

    const res3 = collection.mapResponse(mockDataWithoutMeta);
    collection.initData(res3);

    expect(collection.meta).toEqual({
      currentPage: 1,
      pageCount: 0,
      perPage: 15,
      totalCount: 0
    });

    const mockDataWithItems = {
      data: {
        items: [{
          id: 1,
          name: 'Item Name',
          user_id: 1
        }]
      }
    };

    class MapItem {
      id: number;
      name: string;

      constructor(data) {
        this.id = data.id;
        this.name = data.name;
      }
    }

    collection.mapItems = (item) => {
      return new MapItem(item);
    };

    const res4 = collection.mapResponse(mockDataWithItems);
    collection.initData(res4);

    expect(collection.items[0].hasOwnProperty('user_id')).toBeTrue();

    collection.loadByScrolling = true;
    collection.items = [{
      id: 2,
      name: 'Item Name',
      user_id: 2
    }];

    const mockDataList = {
      data: {
        items: [{
          id: 2,
          name: 'Item Name',
          user_id: 2
        }],
        _meta: {
          currentPage: 2,
          pageCount: 2,
          perPage: 15,
          totalCount: 0
        }
      }
    };

    const res5 = collection.mapResponse(mockDataList);
    collection.initData(res5);

    expect(collection.items.length).toEqual(2);
  });

  it('clear(true) method with true params should set all properties to initial and call reload method', (done) => {
    collection.onLoad$.subscribe(() => {
      done();
      expect(collection.loaded).toBeTrue();
    });

    collection.setProperty('api', mockCrudEntity(MOCK_COLLECTION_RESPONSE));
    collection.clear(true);
  });

  it('mapItems(res) method should return params res', () => {
    expect(collection.mapItems('response 123')).toEqual('response 123');
  });

  it('mapResponse(res) method should return params res', () => {
    collection.mapResponse = (res) => {
      return res;
    };

    const data = {
      items: [],
      meta: {
        currentPage: 2,
        pageCount: 2,
        perPage: 15,
        totalCount: 0
      }
    };

    expect(collection.mapResponse(data)).toEqual(data);
  });

  it('mapOnSelectItems(item) method should add key canSelectItemKey to item for check can select permission', () => {
    const item = {
      id: 1,
      name: 'Item'
    };

    collection.mapOnSelectItems(item);

    expect(item.hasOwnProperty(collection.canSelectItemKey)).toBeTrue();
  });

  it('calculateTotalSelectedItems() method should calculate totalSelectedItems', () => {
    collection.search();
    collection.selectAll();
    collection['calculateTotalSelectedItems']();
    expect(collection.totalSelectedItems).toEqual(collection.items.length);
  });

  it('detectChanges() method should call markForCheck function', () => {
    collection.view = {
      markForCheck: function () {}
    };

    spyOn(collection.view, 'markForCheck');

    collection.detectChanges();

    expect(collection.view.markForCheck).toHaveBeenCalled();
  });

  it('initItems() method should emit itemsSubject$ subject with this.items', () => {
     spyOn(collection['itemsSubject$'], 'next');
     collection.initItems();
     expect(collection['itemsSubject$'].next).toHaveBeenCalledWith(collection.items);
  });

  it('search() method should call reload() method and cancel prev request', (done) => {
    spyOn(collection, 'cancelPreviousRequest');

    collection.onLoad$.subscribe( res => {
      done();
      expect(res).toBeTruthy();
    });

    collection.search();

    expect(collection.cancelPreviousRequest).toHaveBeenCalled();
  });

  it('should send get request on call reload() method', (done) => {
    collection.clear();
    collection.setProperty('api', mockCrudEntity(MOCK_COLLECTION_RESPONSE));

    spyOn(collection['loadingSubject$'], 'next');
    spyOn(collection['onLoadSubject$'], 'next');
    spyOn(collection, 'detectChanges');

    const request = collection.reload(null, 'loadUrl');

    expect(collection.loaded).toBeFalse();
    expect(collection.loading).toBeTrue();
    expect(collection['loadingSubject$'].next).toHaveBeenCalledWith(true);

    request.subscribe( (res) => {
      done();
      expect(collection.loaded).toBeTrue();
      expect(collection.loading).toBeFalse();

      expect(collection['loadingSubject$'].next).toHaveBeenCalledWith(collection.loading);
      expect(collection['onLoadSubject$'].next).toHaveBeenCalled();

      expect(collection.detectChanges).toHaveBeenCalled();
      expect(res).toEqual(collection.items);
    });
  });

  it('on call reload({ data }) method with throwError should get error message', (done) => {
    collection.setProperty('api', MockErrorCrudEntity);

    spyOn(collection['loadingSubject$'], 'next');
    spyOn(collection, 'detectChanges');

    collection.reload().subscribe(
      null,
      ( err ) => {
        done();
        expect(err).toEqual('errorMessage');
        expect(collection.loaded).toBeFalse();
        expect(collection.loading).toBeFalse();

        expect(collection['loadingSubject$'].next).toHaveBeenCalledWith(false);
        expect(collection.detectChanges).toHaveBeenCalled();
      });
  });

  it('on call createItem({ data }) method should send post request', (done) => {
    spyOn(collection['loadingCrudSubject$'], 'next');
    spyOn(collection, 'detectChanges');

    const dataToCreate = {
      id: 1,
      name: 'Item to Save'
    };

    collection.api['createMethod'] = collection.api.save;

    const request = collection.createItem({ data: dataToCreate, method: 'createMethod', path: 'createUrlPath' });

    expect(collection.loadingCrud.creating).toBeTrue();
    expect(collection['loadingCrudSubject$'].next).toHaveBeenCalledWith(collection.loadingCrud);

    request.subscribe( ({ data, path }) => {
      done();
      expect(path).toEqual('createUrlPath');
      expect(collection.loadingCrud.creating).toBeFalse();
      expect(collection['loadingCrudSubject$'].next).toHaveBeenCalledWith(collection.loadingCrud);
      expect(collection.detectChanges).toHaveBeenCalled();

      expect(data).toEqual(dataToCreate);
    });
  });

  it('on call createItem({ data }) method with throwError should get error message', (done) => {
    collection.setProperty('api', MockErrorCrudEntity);

    spyOn(collection['loadingCrudSubject$'], 'next');
    spyOn(collection, 'detectChanges');

    collection.createItem({ data: {} }).subscribe(
      null,
      err => {
        done();

        expect(err).toEqual('errorMessage');
        expect(collection.loadingCrud.creating).toBeFalse();
        expect(collection['loadingCrudSubject$'].next).toHaveBeenCalledWith(collection.loadingCrud);
        expect(collection.detectChanges).toHaveBeenCalled();
      });
  });

  it('if loadingCrud.creating === true return of(false)', (done) => {
    collection.loadingCrud.creating = true;

    const request = collection.createItem({ data: {} });

    request.subscribe( (res) => {
      done();
      expect(res).toBeFalse();
    });
  });

  it('if hardReloadAfter.creating === true call reload() method', (done) => {
    collection.hardReloadAfter.creating = true;

    collection.onLoad$.subscribe(() => {
      done();
      expect(collection.loaded).toBeTrue();
    });

    collection.createItem({ data: null }).subscribe();
  });

  it('if hardReloadAfter.creating === false call detectChanges method', (done) => {
    spyOn(collection, 'detectChanges');
    collection.hardReloadAfter.creating = false;

    collection.createItem({ data: null }).subscribe(() => {
      done();
      expect(collection.detectChanges).toHaveBeenCalled();
    });
  });

  it('on call updateItem({ data }) method should send post request', (done) => {
    spyOn(collection['loadingCrudSubject$'], 'next');
    spyOn(collection, 'detectChanges');

    const dataToUpdate = {
      id: 1,
      name: 'Item to Update'
    };

    collection.api['updateMethod'] = collection.api.update;

    const request = collection.updateItem({ data: dataToUpdate, method: 'updateMethod', path: 'updateUrlPath' });

    expect(collection.loadingCrud.updating).toBeTrue();
    expect(collection['loadingCrudSubject$'].next).toHaveBeenCalledWith(collection.loadingCrud);

    request.subscribe(({ data, path }) => {
      done();
      expect(path).toEqual('updateUrlPath');
      expect(collection.loadingCrud.updating).toBeFalse();
      expect(collection['loadingCrudSubject$'].next).toHaveBeenCalledWith(collection.loadingCrud);
      expect(collection.detectChanges).toHaveBeenCalled();

      expect(data).toEqual(dataToUpdate);
    });
  });

  it('on call updateItem({ data }) method with throwError should get error message', (done) => {
    collection.setProperty('api', MockErrorCrudEntity);

    spyOn(collection['loadingCrudSubject$'], 'next');
    spyOn(collection, 'detectChanges');

    collection.updateItem({ data: {} }).subscribe(
      null,
      err => {
        done();

        expect(err).toEqual('errorMessage');
        expect(collection.loadingCrud.updating).toBeFalse();
        expect(collection['loadingCrudSubject$'].next).toHaveBeenCalledWith(collection.loadingCrud);
        expect(collection.detectChanges).toHaveBeenCalled();
      });
  });

  it('if loadingCrud.updating === true return of(false)', (done) => {
    collection.loadingCrud.updating = true;

    const request = collection.updateItem({ data: {} });

    request.subscribe( (res) => {
      done();
      expect(res).toBeFalse();
    });
  });

  it('if hardReloadAfter.updating === true call reload() method', (done) => {
    collection.hardReloadAfter.updating = true;

    collection.onLoad$.subscribe(() => {
      done();
      expect(collection.loaded).toBeTrue();
    });

    collection.updateItem({ data: null }).subscribe();
  });

  it('if hardReloadAfter.updating === false call detectChanges method', (done) => {
    spyOn(collection, 'detectChanges');
    collection.hardReloadAfter.updating = false;

    collection.updateItem({ data: null }).subscribe(() => {
      done();
      expect(collection.detectChanges).toHaveBeenCalled();
    });
  });

  it('on call deleteItem({ data }) method should send post request', (done) => {

    spyOn(collection['loadingCrudSubject$'], 'next');
    spyOn(collection, 'detectChanges');

    collection.api['deleteMethod'] = collection.api.delete;

    const request = collection.deleteItem({ id: 1, method: 'deleteMethod', path: 'deleteUrlPath' });

    expect(collection.loadingCrud.deleting).toBeTrue();
    expect(collection['loadingCrudSubject$'].next).toHaveBeenCalledWith(collection.loadingCrud);

    request.subscribe( ({ message, arg }) => {
      done();

      expect(arg.path).toEqual('deleteUrlPath');
      expect(collection.loadingCrud.deleting).toBeFalse();
      expect(collection['loadingCrudSubject$'].next).toHaveBeenCalledWith(collection.loadingCrud);
      expect(collection.detectChanges).toHaveBeenCalled();

      expect(message).toEqual('item successfully deleted!');
    });
  });

  it('on call deleteItem({ data }) method with throwError should get error message', (done) => {
    collection.setProperty('api', MockErrorCrudEntity);

    spyOn(collection['loadingCrudSubject$'], 'next');
    spyOn(collection, 'detectChanges');

    collection.deleteItem({ id: 1 }).subscribe(
      null,
      err => {
        done();

        expect(err).toEqual('errorMessage');
        expect(collection.loadingCrud.deleting).toBeFalse();
        expect(collection['loadingCrudSubject$'].next).toHaveBeenCalledWith(collection.loadingCrud);
        expect(collection.detectChanges).toHaveBeenCalled();
      });
  });

  it('if loadingCrud.deleting === true return of(false)', (done) => {
    collection.loadingCrud.deleting = true;

    const request = collection.deleteItem({ id: 1 });

    request.subscribe( (res) => {
      done();
      expect(res).toBeFalse();
    });
  });

  it('if hardReloadAfter.deleting === true call reload() method', (done) => {
    collection.hardReloadAfter.deleting = true;

    collection.onLoad$.subscribe(() => {
      done();
      expect(collection.loaded).toBeTrue();
    });

    collection.deleteItem({ id: 1 }).subscribe();
  });

  it('if hardReloadAfter.deleting === false call detectChanges() method', (done) => {
    spyOn(collection, 'detectChanges');
    collection.hardReloadAfter.deleting = false;

    collection.deleteItem({ id: 1 }).subscribe(() => {
      done();
      expect(collection.detectChanges).toHaveBeenCalled();
    });
  });

  it('on call deleteMany({ data }) method should send post request', (done) => {
    spyOn(collection['loadingCrudSubject$'], 'next');
    spyOn(collection, 'detectChanges');

    collection.api['deleteManyMethod'] = collection.api.delete;

    const request = collection.deleteMany({ data: {}, method: 'deleteManyMethod', path: 'deleteManyUrlPath' });

    expect(collection.loadingCrud.deleting).toBeTrue();
    expect(collection['loadingCrudSubject$'].next).toHaveBeenCalledWith(collection.loadingCrud);

    request.subscribe( ({ message }) => {
      done();

      expect(collection.loadingCrud.deleting).toBeFalse();
      expect(collection['loadingCrudSubject$'].next).toHaveBeenCalledWith(collection.loadingCrud);
      expect(collection.detectChanges).toHaveBeenCalled();

      expect(message).toEqual('item successfully deleted!');
    });
  });

  it('on call deleteMany({ data }) method with throwError should get error message', (done) => {
    collection.setProperty('api', MockErrorCrudEntity);

    spyOn(collection['loadingCrudSubject$'], 'next');
    spyOn(collection, 'detectChanges');

    collection.deleteMany({ data: {} }).subscribe(
      null,
      err => {
        done();

        expect(err).toEqual('errorMessage');
        expect(collection.loadingCrud.deleting).toBeFalse();
        expect(collection['loadingCrudSubject$'].next).toHaveBeenCalledWith(collection.loadingCrud);
        expect(collection.detectChanges).toHaveBeenCalled();
      });
  });

  it('for deleteMany --- if loadingCrud.deleting === true return of(false)', (done) => {
    collection.loadingCrud.deleting = true;

    const request = collection.deleteMany({ data: {} });

    request.subscribe( (res) => {
      done();
      expect(res).toBeFalse();
    });
  });

  it('for deleteMany --- if hardReloadAfter.deleting === true call reload() method', (done) => {
    collection.hardReloadAfter.deleting = true;

    collection.onLoad$.subscribe(() => {
      done();
      expect(collection.loaded).toBeTrue();
    });

    collection.deleteMany({ data: {} }).subscribe();
  });

  it('for deleteMany --- if hardReloadAfter.deleting === false call detectChanges() method', (done) => {
    spyOn(collection, 'detectChanges');
    collection.hardReloadAfter.deleting = false;

    collection.deleteMany({ data: {} }).subscribe(() => {
      done();
      expect(collection.detectChanges).toHaveBeenCalled();
    });
  });

  it('selectAll() method should add all items to selected', () => {
    spyOn(collection['selectedItemsSubject$'], 'next');
    spyOn(collection, 'detectChanges');

    collection.search();
    collection.selectAll();

    expect(collection.items.length).toEqual(collection.selectedItems.size);
    expect(collection['selectedItemsSubject$'].next).toHaveBeenCalledWith(collection.selectedItems);
    expect(collection.detectChanges).toHaveBeenCalled();
  });

  it('selectAll() method should add nothing', (done) => {
    spyOn(collection['selectedItemsSubject$'], 'next');
    spyOn(collection, 'detectChanges');

    collection.mapOnSelectItems = (item) => {
      item[collection.canSelectItemKey] = false;
      return item;
    };

    collection.reload().subscribe(() => {
      done();
      collection.selectAll();
      expect(collection.selectedItems.size).toEqual(0);
      expect(collection['selectedItemsSubject$'].next).toHaveBeenCalledWith(collection.selectedItems);
      expect(collection.detectChanges).toHaveBeenCalled();
    });
  });

  it('isOwnerCondition() method should return true', () => {
    expect(collection.isOwnerCondition(12)).toBeTrue();
  });

  it('selectItem(item) method should add item to selected or should delete item if exist', () => {
    spyOn(collection['selectedItemsSubject$'], 'next');
    spyOn(collection, 'detectChanges');

    collection.search();
    const itemToSelect = collection.items[0];
    collection.selectItem(itemToSelect);

    expect(collection.selectedItems.size).toEqual(1);
    expect(collection.selectedItems.has(itemToSelect['id'])).toBeTrue();

    collection.selectItem(itemToSelect);

    expect(collection.selectedItems.size).toEqual(0);
    expect(collection.selectedItems.has(itemToSelect['id'])).toBeFalse();

    expect(collection['selectedItemsSubject$'].next).toHaveBeenCalledWith(collection.selectedItems);
    expect(collection.detectChanges).toHaveBeenCalled();
  });

  it('selectItem(item) method should do nothing if isOwnerCondition return false', () => {
    collection.search();
    const itemToSelect = collection.items[0];

    collection.isOwnerCondition = (user_id) => {
      return !!user_id;
    };

    collection.selectItem(itemToSelect);

    expect(collection.selectedItems.size).toEqual(0);
  });

  it('unSelectAll() method should delete all selected items', () => {
    spyOn(collection['selectedItemsSubject$'], 'next');
    spyOn(collection, 'detectChanges');

    collection.search();
    collection.selectAll();

    expect(collection.selectedItems.size).toEqual(collection.items.length);

    collection.unSelectAll();

    expect(collection.selectedItems.size).toEqual(0);

    expect(collection['selectedItemsSubject$'].next).toHaveBeenCalledWith(collection.selectedItems);
    expect(collection.detectChanges).toHaveBeenCalled();
  });

  it('cancelPreviousRequest() method unsubscribe last get request', () => {
    collection.requestPromises.get = new Subject();
    spyOn(collection.requestPromises.get, 'unsubscribe');
    collection.cancelPreviousRequest();
    expect(collection.requestPromises.get.unsubscribe).toHaveBeenCalled();
  });

  it('unshiftItem should unshift item to items', () => {
    spyOn(collection['itemsSubject$'], 'next');
    spyOn(collection, 'detectChanges');

    const unshiftEl = {
      id: 999,
      name: 'Ivan Perun'
    };

    collection.items = MOCK_COLLECTION_RESPONSE.data.items;
    collection.unshiftItem(unshiftEl);

    expect(collection.items[0]).toEqual(unshiftEl);
    expect(collection['itemsSubject$'].next).toHaveBeenCalledWith(collection.items);
    expect(collection.detectChanges).toHaveBeenCalled();
  });

  it('pushItem should push item to items', () => {
    spyOn(collection['itemsSubject$'], 'next');
    spyOn(collection, 'detectChanges');

    const newEl = {
      name: 'Ivan Perun'
    };

    collection.items = MOCK_COLLECTION_RESPONSE.data.items;
    collection.pushItem(newEl);
    collection.pushItem(collection.items[0]);

    expect(collection.items[collection.items.length - 1]).toEqual(newEl);
    expect(collection['itemsSubject$'].next).toHaveBeenCalledWith(collection.items);
    expect(collection.detectChanges).toHaveBeenCalled();
  });

  it('spliceItem should splice item from items', () => {
    spyOn(collection['itemsSubject$'], 'next');
    spyOn(collection, 'detectChanges');

    collection.items = MOCK_COLLECTION_RESPONSE.data.items;

    const itemToSplice = collection.items[2];

    collection.spliceItem(itemToSplice, null);
    expect(collection.items.filter(el => el['id'] === itemToSplice['id']).length).toEqual(0);
    collection.spliceItem(itemToSplice, 2);
    expect(collection.items.filter(el => el['id'] === itemToSplice['id']).length).toEqual(1);

    expect(collection.spliceItem({ name: 'Without id'}, null)).toBeFalse();

    expect(collection['itemsSubject$'].next).toHaveBeenCalledWith(collection.items);
    expect(collection.detectChanges).toHaveBeenCalled();
  });
});
