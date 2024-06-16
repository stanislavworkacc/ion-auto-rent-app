import {Routes} from "@angular/router";
import {HomePage} from "./home.page";

export const HOME_ROUTES: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard-routes')
            .then(m => m.DASHBOARD_ROUTES),
      },
      {
        path: 'locator',
        loadChildren: () =>
          import('./locator/locator-routes')
            .then(m => m.LOCATOR_ROUTES),
      },
      {
        path: 'chat',
        loadChildren: () =>
          import('./chat/chat-routes')
            .then(m => m.CHAT_ROUTES),
      },
      {
        path: 'menu',
        loadChildren: () =>
          import('./menu/menu-routes')
            .then(m => m.MENU_ROUTES),
      },
    ]
  },
  //home page redirect
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
]
