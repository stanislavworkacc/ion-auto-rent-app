# Collection

**Update**: This library is Ivy Compatible and is tested against an Angular 12 server.

* Collection class contain all method for work with list of items (load, create, update, delete, deleteMany).
* Item class contain all method for work with single item (load, create, update, delete).
* It is developed using `Angular >=12.0.0` and its newly introduced `ng g library` schematics.
* Library location: `projects/libs/collection` directory of this repository.

## Examples/Demo

* A simple Example can be found under `src/server` directory of this repository.

## Installation

`npm i collection`

## API

`import { Collection } from 'collection'`<br>
`import { Item } from 'collection'`<br>
`import { CrudService } from 'collection'`

### Methods

|                    | Type    | Required                   | Description                                                                                               |
| ------------------ | ------- | -------------------------- | --------------------------------------------------------------------------------------------------------- |
| reload()           | string  | **YES**                    | the url of a remote app that supports http/jsonp calls.                                                |
| search()           | number  | Optional, default: 300     | the debounce time for this request.                                                                       |
| createItem()       | object  | Optional, default: {}      | { key: string, value: any} object as additional parameters                                                |
| updateItem()       | string  | Optional, default: 'query' | a string value which is used a query parameter in the url. Ex: `http://localhost:3000/countries?query='c` |
| deleteItem()       | string  | Optional, default: 'get'   | the http/jsonp method to be used.                                                                         |
| selectAll()        | string  | Optional, default: 'http'  | http or jsonp method types.                                                                               |
| unSelectAll()      | string  | Optional                   | a string value for the callback query parameter.                                                          |
| selectItem()       | boolean | Optional, default: true    | if true, it allows empty strings to pass and invoke search                                                |
| setParams()        | boolean | Optional, default: true    | if true, it allows empty strings to pass and invoke search                                                |
| clearParams()      | boolean | Optional, default: true    | if true, it allows empty strings to pass and invoke search                                                |
| getRouteParams()   | boolean | Optional, default: true    | if true, it allows empty strings to pass and invoke search                                                |
| setRouteParams()   | boolean | Optional, default: true    | if true, it allows empty strings to pass and invoke search                                                |
| clearRouteParams() | boolean | Optional, default: true    | if true, it allows empty strings to pass and invoke search                                                |


## Usage

1) Override the `NgxMatTypeaheadModule` service in your server module.
> `import { CrudHttpService } from 'collection';`
 ```typescript
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatInputModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MonthMainComponent } from './server.component';

export const apiUrl = new InjectionToken('apiUrl');

export function apiUrlFactory(url: string) {
  return url;
}


@NgModule({
  declarations: [MonthMainComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    HttpClientModule,
    NgxMatTypeaheadModule
  ],
  providers: [
    {
      provide: apiUrl,
      useFactory: apiUrlFactory,
      useValue: environment.apiUrl
    },
    { provide: CrudHttpService, useClass: HttpService },
  ],
  bootstrap: [MonthMainComponent]
})
export class TimeTrackingModule {}
 ```

2) Use the `Collection` in your component.

```typescript
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppService } from './server.service';
import { 
  OllectionModel, 
  CrudService, 
  Collection 
} from 'collection';

@Component({
  selector: 'projects-list',
  templateUrl: ['./projects-list.component.html'],
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit {

  collection: OllectionModel;
  
  getAll() {
    this.collection.reload().subscribe( res => {
      // Send GET request into path '/projects' with default query params 
      // per_page, page, search_query
    })
    
    /*
    For set query params use collection.setParams(key, value),
    
    this.collection
      .setParams('page', 2)
      .setParams('search_query', '1234')
      .search();
    
     */
  }
  
  create(data) {
    this.collection.createItem({ data }).subscribe( res => {
      // Send POST request into path '/projects' with data
      this.collection.search();
    })
  }

  update(data) {
    this.collection.updateItem({ id: data.id, data }).subscribe( res => {
      // Send PUT request into path '/projects/:id' with data
      this.collection.search();
    })
  }

  delete(id) {
    this.collection.deleteItem({ id }).subscribe( res => {
      // Send DELETE request into path '/projects/:id'
      this.collection.search();
    })
  }

  deleteMany(idsArray) {
    this.collection.deleteMany({ ids: idsArray }).subscribe( res => {
      // Send DELETE request into path '/projects' with body data ids: [...idsArray]
      this.collection.search();
    })
  }

  ngOnInit() {
    this.collection.search();
  }

  constructor(private _crud: CrudService) {
    this.collection = new Collection({
      api: this._crud.createEntity({ name: 'projects' }),
      params: {
        page: 1,
        per_page: 15,
        search_quesry: 'Project Name'
      }
    });
  }
}
```

```html

// projects-list.component.html

<section class="projects-wrapper">
  <ng-container *ngFor="let project of collection.items$ | async">
    <div class="project-item">
      {{ project?.name }}
    </div>
  </ng-container>
  
  <ng-container *ngIf="collection.loading$ | async">
    <span>...Loading</span>
  </ng-container>
</section>

```

## Running the example in local env

* `npm i`
* Run `ng serve` for a dev app and running the demo server. Navigate to `http://localhost:4200/`. The server will automatically reload if you change any of the source files.
* The demo server uses `json-app` module for enabling the url and filter funtionality. Make sure you have [json-app](https://www.npmjs.com/package/json-app#getting-started) installed and running.

## Build the Collection library

Run `ng build collection` to build the library. The build artifacts will be stored in the `dist/collection` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test collection` to execute the unit tests via [Karma](https://karma-runner.github.io).
