import {Component} from '@angular/core';
import {
  IonApp, IonTabs,
} from '@ionic/angular/standalone';
import {logOutOutline} from 'ionicons/icons';
import {addIcons} from "ionicons";
import {RouterOutlet} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {
  AppToastContainerComponent
} from "./shared/components/app-toast/app-toast-container/app-toast-container.component";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, RouterOutlet, AppToastContainerComponent, IonTabs],
})
export class AppComponent {

  constructor(private translate: TranslateService) {
    this.initializeApp();
  }

  initializeApp() {
    this.translate.addLangs(['en', 'uk']);
    this.translate.setDefaultLang('uk');

    const browserLang = this.translate.getBrowserLang();
    if (browserLang) {
      // this.translate.use(browserLang.match(/en|uk/) ? browserLang : 'uk');
      this.translate.use('uk');
    } else {
      this.translate.use('uk');
    }
  }
}

addIcons({logOutOutline});
