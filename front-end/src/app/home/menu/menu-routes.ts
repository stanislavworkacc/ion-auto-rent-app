import {Routes} from "@angular/router";
import {MenuComponent} from "./menu.component";
import {ProfilePage} from "./menu-profile/profille-page/profile-page.component";
import {ProfileEditPage} from "./menu-profile/profille-page/profile-edit-page/profile-edit-page.component";
import {FileComponent} from "./file/file.component";
import {CarParkComponent} from "./car-park/car-park.component";
import {AllCarsComponent} from "./car-park/all-cars/all-cars.component";
import {InRentComponent} from "./car-park/in-rent/in-rent.component";

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
  },
  {
    path: 'files',
    component: FileComponent,
  },
  {
    path: 'car-park',
    component: CarParkComponent,
    children: [
      {
        path: '',
        redirectTo: 'all-cars',
        pathMatch: 'full'
      },
      {
        path: 'all-cars',
        component: AllCarsComponent
      },
      {
        path: 'in-rent',
        component: InRentComponent
      }
    ]
  },

]
