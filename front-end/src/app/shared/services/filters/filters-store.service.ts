import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FilterStorage } from '@core/filterStorage';
import { FilterStorageModel } from '@shared/models/filtersStore.model';

export const reportsMap = new Map()
  .set('status', null)
  .set('clients', null)
  .set('recentClients', null)
  .set('projects', null)
  .set('recentProjects', null)
  .set('tasks', null)
  .set('workers', null)
  .set('period', null)
  .set('fromTime', null)
  .set('toTime', null)
  .set('columnsToHide', null)
  .set('groupBy', null)
  .set('billed', null)
  .set('invoice', null)
  .set('notBilled', null)
  .set('billable', null)
  .set('withTravel', null)
  .set('withTrip', null)
  .set('travel', null)
  .set('type', null)
  .set('columns', null)
  .set('view', null)
  .set('page', null)
  .set('columnsOrder', null)
  .set('exported', null)
  .set('notExported', null)
  .set('showFilter', true)
  .set('showSummary', false)
  .set('haTab', null)
  .set('hadTab', null)
  .set('exported', null)
  .set('showExported', null)
  .set('timelineSort', null)
  .set('timelineViewType', null);

export const reportsNoRouteFilters = [
  'columns',
  'showSummary',
];

const timesheetReportsMap = new Map()
  .set('status', null)
  .set('clients', null)
  .set('recentClients', null)
  .set('projects', null)
  .set('recentProjects', null)
  .set('tasks', null)
  .set('workers', null)
  .set('period', null)
  .set('fromTime', null)
  .set('toTime', null)
  .set('columnsToHide', null)
  .set('billed', null)
  .set('invoice', null)
  .set('notBilled', null)
  .set('billable', null)
  .set('withTravel', null)
  .set('withTrip', null)
  .set('travel', null)
  .set('type', null)
  .set('columns', null)
  .set('view', null)
  .set('columnsOrder', null)
  .set('order_by', null)
  .set('showAbsence', null);

const timesheetReportsNoRouteFilters = [
  'columns'
];

const absenceReportsMap = new Map()
  .set('period', null)
  .set('fromTime', null)
  .set('toTime', null)
  .set('workers', null)
  .set('showFilter', true)
  .set('w_name', null);

const haReportsMap = new Map()
  .set('period', null)
  .set('fromTime', null)
  .set('toTime', null)
  .set('workers', null)
  .set('showFilter', true)
  .set('w_name', null);

const absencePlannerReportsMap = new Map()
  .set('period', null)
  .set('fromTime', null)
  .set('toTime', null)
  .set('types', null)
  .set('showFilter', true)
  .set('showSummary', false)
  .set('workers', null)
  .set('sort', null)
  .set('is_vacation', null)
  .set('viewType', null)
  .set('view', null);

const absencePlannerReportsNoRouteFilters = [
  'showSummary',
];

const projectReportsMap = new Map()
  .set('status', null)
  .set('clients', null)
  .set('recentClients', null)
  .set('projects', null)
  .set('recentProjects', null)
  .set('tasks', null)
  .set('workers', null)
  .set('period', null)
  .set('fromTime', null)
  .set('toTime', null)
  .set('columnsToHide', null)
  .set('groupBy', null)
  .set('billed', null)
  .set('invoice', null)
  .set('notBilled', null)
  .set('billable', null)
  .set('withTravel', null)
  .set('withTrip', null)
  .set('travel', null)
  .set('type', null)
  .set('columns', null)
  .set('view', null)
  .set('columnsOrder', null)
  .set('exported', null)
  .set('notExported', null)
  .set('showFilter', true)
  .set('showSummary', false)
  .set('page', null)
  .set('timelineSort', null)
  .set('timelineViewType', null);

const projectReportsNoRouteFilters = [
  'columns'
];

export const projectsListFilterMap = new Map()
  .set('fromTime', null)
  .set('search_query', null)
  .set('status', null)
  .set('sort', null)
  .set('page', null);

export const clientsMap = new Map()
  .set('search_query', null)
  .set('status', null)
  .set('sort', null)
  .set('columns', null)
  .set('page', null);

export const workersMap = new Map()
  .set('search_query', null)
  .set('status', null)
  .set('sort', null)
  .set('page', null);

const workersHAMap = new Map()
  .set('name', null)
  .set('status', null)
  .set('sort', null)
  .set('page', null);

const qualificationsMap = new Map()
  .set('workers', null)
  .set('qualifications', null)
  .set('showFilter', true)
  .set('name', null)
  .set('sort', null)
  .set('page', null);

export const productsMap = new Map()
  .set('search', null)
  .set('page', null)
  .set('sort', null)
  .set('categories', null)
  .set('showFilter', true)

const clientsNoRouteFilters = [
  'columns',
];

const checklistReportsMap = new Map()
  .set('status', null)
  .set('projects', null)
  .set('workers', null)
  .set('period', null)
  .set('fromTime', null)
  .set('toTime', null)
  .set('columns', null)
  .set('status', null)
  .set('sort', null)
  .set('showFilter', true)
  .set('page', null);

const projectChecklistReportsMap = new Map()
  .set('status', null)
  .set('projects', null)
  .set('workers', null)
  .set('period', null)
  .set('fromTime', null)
  .set('toTime', null)
  .set('columns', null)
  .set('status', null)
  .set('sort', null)
  .set('showFilter', true)
  .set('page', null);

const checklistNoRouteFilters = [
  'columns',
];

const checklistDetailsMap = new Map()
  .set('columns', null);

const checklistCategoriesMap = new Map()
  .set('search_query', null)
  .set('sort', null)
  .set('page', null);

const checklistTemplatesMap = new Map()
  .set('name', null)
  .set('sort', null)
  .set('page', null);

export const projectDeviationsMap = new Map()
  .set('columns', null)
  .set('name', null)
  .set('deviations:period', null)
  .set('deviations:fromTime', null)
  .set('deviations:toTime', null)
  .set('sort', null)
  .set('showFilter', true)
  .set('tags', null)
  .set('employees', null)
  .set('incidents', null)
  .set('types', null)
  .set('severity', null)
  .set('deviations:status', null)
  .set('a_users', null)
  .set('view', null)
  .set('page', null);


export const deviationsMap = new Map()
  .set('columns', null)
  .set('name', null)
  .set('period', null)
  .set('fromTime', null)
  .set('toTime', null)
  .set('sort', null)
  .set('showFilter', true)
  .set('tags', null)
  .set('employees', null)
  .set('incidents', null)
  .set('types', null)
  .set('severity', null)
  .set('status', null)
  .set('a_users', null)
  .set('view', null)
  .set('page', null);

export const projectDocumentsMap = new Map()
  .set('project_id', null)
  .set('parent_id', null)
  .set('docSearch', null)
  .set('docView', null);

const schedulerPlannerMap = new Map()
  .set('view', null)
  .set('period', null)
  .set('fromTime', null)
  .set('toTime', null)
  .set('workers', null)
  .set('w_clients', null)
  .set('projects', null)
  .set('tasks', null)
  .set('showUnscheduled', null)
  .set('status', null)
  .set('showFilter', true)
  .set('sort', null);

const workersSchedulerPlannerMap = new Map()
  .set('period', null)
  .set('fromTime', null)
  .set('toTime', null)
  .set('workers', null)
  .set('clients', null)
  .set('projects', null)
  .set('tasks', null);

const projectSchedulerModalMap = new Map()
  .set('period', null)
  .set('fromTime', null)
  .set('toTime', null);

const projectSchedulerPlannerMap = new Map()
  .set('view', null)
  .set('period', null)
  .set('fromTime', null)
  .set('toTime', null)
  .set('p_clients', null)
  .set('showUnscheduled', true)
  .set('status', null);

const projectSchedulerMap = new Map()
  .set('view', null)
  .set('period', null)
  .set('fromTime', null)
  .set('toTime', null)
  .set('workers', null)
  .set('clients', null)
  .set('projects', null)
  .set('tasks', null)
  .set('showUnscheduled', null)
  .set('showFilter', true)
  .set('sort', null);

const projectModalSchedulerMap = new Map()
  .set('period', null)
  .set('fromTime', null)
  .set('toTime', null)
  .set('workers', null)
  .set('clients', null)
  .set('projects', null)
  .set('tasks', null);

const mobileSchedulerPlannerMap = new Map()
  .set('view', null)
  .set('period', null)
  .set('fromTime', null)
  .set('toTime', null)
  .set('fromFull', null)
  .set('toFull', null)
  .set('workers', null)
  .set('darkMode', null)
  .set('back', null);

const estimatesReportMap = new Map()
  .set('columns', null)

@Injectable({
  providedIn: 'root'
})

export class FiltersStoreService {

  filters: { [key: string]: FilterStorageModel };

  init(): void {
    this.filters = {
      reports: new FilterStorage(
        {
          filters: reportsMap,
          noFiltersInRoute: reportsNoRouteFilters,
          router: this.router
        }
      ),
      timesheetReports: new FilterStorage({
        filters: timesheetReportsMap,
        noFiltersInRoute: timesheetReportsNoRouteFilters,
        router: this.router }
      ),
      absenceReports: new FilterStorage({
        filters: absenceReportsMap,
        router: this.router }
      ),
      haReports: new FilterStorage({
        filters: haReportsMap,
        router: this.router }
      ),
      absencePlannerReports: new FilterStorage({
        filters: absencePlannerReportsMap,
        noFiltersInRoute: absencePlannerReportsNoRouteFilters,
        router: this.router }
      ),
      projectReports: new FilterStorage({
        filters: projectReportsMap,
        noFiltersInRoute: projectReportsNoRouteFilters,
        router: this.router }
      ),
      projectDeviations: new FilterStorage({
        filters: projectDeviationsMap,
        noFiltersInRoute: ['columns'],
        router: this.router
      }),
      deviations: new FilterStorage({
        filters: deviationsMap,
        noFiltersInRoute: ['columns'],
        router: this.router
      }),
      projects: new FilterStorage({ filters: projectsListFilterMap, router: this.router}),
      clients: new FilterStorage({ filters: clientsMap, noFiltersInRoute: clientsNoRouteFilters, router: this.router}),
      workers: new FilterStorage({ filters: workersMap, router: this.router}),
      workersHA: new FilterStorage({ filters: workersHAMap, router: this.router}),
      qualifications: new FilterStorage({
        filters: qualificationsMap,
        noFiltersInRoute: ['showFilter'],
        router: this.router }
      ),
      products: new FilterStorage({
        filters: productsMap,
        noFiltersInRoute: ['showFilter'],
        router: this.router }
      ),
      checklistReports: new FilterStorage({
        filters: checklistReportsMap,
        noFiltersInRoute: checklistNoRouteFilters,
        router: this.router }
      ),
      projectChecklistReports: new FilterStorage(
        {
          filters: projectChecklistReportsMap,
          noFiltersInRoute: checklistNoRouteFilters,
          router: this.router
        }
      ),
      estimatesReport: new FilterStorage(
        {
          filters: estimatesReportMap,
          noFiltersInRoute: ['columns'],
          router: this.router
        }
      ),
      checklistDetails: new FilterStorage({ filters: checklistDetailsMap, router: this.router}),
      checklistCategories: new FilterStorage({ filters: checklistCategoriesMap, router: this.router}),
      checklistTemplates: new FilterStorage({ filters: checklistTemplatesMap, router: this.router}),
      projectDocuments: new FilterStorage({ filters: projectDocumentsMap, router: this.router}),
      mobileScheduler: new FilterStorage({ filters: mobileSchedulerPlannerMap, router: this.router }),
      scheduler: new FilterStorage({ filters: schedulerPlannerMap, router: this.router }),
      projectScheduler: new FilterStorage({ filters: projectSchedulerMap, router: this.router }),
      projectSchedulerModal: new FilterStorage({ filters: projectSchedulerModalMap, router: this.router }),
      projectSchedulerPlanner: new FilterStorage({ filters: projectSchedulerPlannerMap, router: this.router }),
      workersSchedulerPlanner: new FilterStorage({ filters: workersSchedulerPlannerMap, router: this.router }),
      projectModalScheduler: new FilterStorage({ filters: projectModalSchedulerMap, router: this.router })
    };
  }

  setFilter(key: string, filter: FilterStorageModel) {
    this.filters[key] = filter;
  }

  clearAll(): void {
    for (const [key] of Object.entries(this.filters)) {
      const filter = this.filters[key].filters;
      const filtersKeys = Array.from(filter.keys());
      filtersKeys.forEach( itemKey => {
        filter.set(itemKey, null);
        if (itemKey === 'showFilter') {
          filter.set(itemKey, true);
        }
      });
    }
  }

  constructor(private router: Router) {
    this.init();
  }
}
