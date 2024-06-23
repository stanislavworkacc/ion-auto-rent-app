import {Routes} from "@angular/router";
import {MenuComponent} from "./menu.component";
import {ProfilePage} from "./menu-profile/profille-page/profile-page.component";
import {ProfileEditPage} from "./menu-profile/profille-page/profile-edit-page/profile-edit-page.component";

export const MENU_ROUTES: Routes = [
  {
    path: '',
    component: MenuComponent,
  },
  {
    path: 'profile',
    component: ProfilePage,
  },
  {
    path: 'edit',
    component: ProfileEditPage
  }
]
