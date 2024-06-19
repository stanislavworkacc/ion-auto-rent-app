import { Component } from '@angular/core';
import {
  IonApp, IonButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar,
} from '@ionic/angular/standalone';
import { logOutOutline } from 'ionicons/icons';
import {addIcons} from "ionicons";
import {RouterOutlet} from "@angular/router";
import {TranslateModule, TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, RouterOutlet, IonHeader, IonToolbar, IonTitle, IonContent, TranslateModule, IonButtons, IonButton],
})
export class AppComponent {

  switchLanguage(language: string) {
    this.translate.use(language);
  }

  constructor(private translate: TranslateService) {
    this.initializeApp();
  }

  initializeApp() {
    this.translate.addLangs(['en', 'uk']);
    this.translate.setDefaultLang('en');

    const browserLang = this.translate.getBrowserLang();
    if (browserLang) {
      this.translate.use(browserLang.match(/en|uk/) ? browserLang : 'en');
    } else {
      this.translate.use('en');
    }
  }
}
addIcons({ logOutOutline });
