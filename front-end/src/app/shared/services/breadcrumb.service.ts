import {computed, Injectable, Signal, signal, WritableSignal} from "@angular/core";
import {NavigationEnd, Router} from "@angular/router";
import {filter, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  private breadcrumbs: WritableSignal<{ label: string, url: string }[]> = signal([]);
  public breadcrumbsRoutes: Signal<{ label: string, url: string }[]> = computed(() => this.breadcrumbs())

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.buildBreadcrumbs(this.router.url)),
      map((breadcrumbs) => this.breadcrumbs.set(breadcrumbs))
    ).subscribe();
  }

  private buildBreadcrumbs(url: string): any[] {
    const breadcrumbs = [];
    const segments = url.split('/').filter(segment => segment);
    let currentUrl = '';

    for (const segment of segments) {
      currentUrl += `/${segment}`;
      breadcrumbs.push({label: segment, url: currentUrl});
    }

    return breadcrumbs;
  }

  public buildCollapsedBreadcrumbs(collapsedBreadcrumbs: any[], excludeRoutes: string[] = []) {
    return collapsedBreadcrumbs
      .filter((breadcrumb: any) => !excludeRoutes.includes(breadcrumb.href))
      .map((breadcrumb: any) => {
        return {
          url: breadcrumb.href,
          label: breadcrumb.innerHTML.trim()
        };
      });
  }


}
