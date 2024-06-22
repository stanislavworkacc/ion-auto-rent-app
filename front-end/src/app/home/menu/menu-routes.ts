import {Routes} from "@angular/router";
import {MenuComponent} from "./menu.component";
import {ProfilePage} from "./menu-profile/profille-page/profile-page.component";

export const MENU_ROUTES: Routes = [
  {
    path: '',
    component: MenuComponent,
  },
  {
    path: 'profile',
    component: ProfilePage
  }
]
