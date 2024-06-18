import { Component } from '@angular/core';
import {
  IonApp,
} from '@ionic/angular/standalone';
import { logOutOutline } from 'ionicons/icons';
import {addIcons} from "ionicons";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, RouterOutlet],
})
export class AppComponent {
  constructor() {
    addIcons({ logOutOutline });
  }
}
