import {
  ChangeDetectionStrategy,
  Component, inject,
} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {tabConfig, TabConfig} from "./tab-config";
import {NgForOf} from "@angular/common";
import {addIcons} from "ionicons";
import {logOutOutline} from "ionicons/icons";

import * as icons from 'ionicons/icons';
import {
  IonButton,
  IonHeader,
  IonIcon,
  IonLabel,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonToolbar
} from "@ionic/angular/standalone";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [RouterOutlet, NgForOf, RouterLink, RouterLinkActive, IonHeader, IonToolbar, IonButton, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage {

  private translate: TranslateService = inject(TranslateService);

  public tabs: TabConfig[] = [];

  langSubscription(): void {
    this.tabs = tabConfig.map((tab: TabConfig) => ({
      ...tab,
      label: this.translate.instant(tab.label)
    }));

    this.translate.onLangChange.subscribe(() => {
      this.tabs = tabConfig.map((tab: TabConfig) => ({
        ...tab,
        label: this.translate.instant(tab.label)
      }));
    });
  }

  ngOnInit(): void {
   this.langSubscription();
  }

  constructor() {
    addIcons({ logOutOutline });

    for (const iconName in icons) {
      addIcons({ [iconName]: (icons as any)[iconName] });
    }
  }

}
