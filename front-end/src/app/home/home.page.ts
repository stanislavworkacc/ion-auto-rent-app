import {
  ChangeDetectionStrategy,
  Component, DestroyRef, inject, signal, WritableSignal,
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
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

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
  private destroyRef: DestroyRef = inject(DestroyRef);

  public tabs: WritableSignal<TabConfig[]> = signal<TabConfig[]>([]);

  private translateLabels(): void {
    const translatedTabs = tabConfig.map((tab: TabConfig) => ({
      ...tab,
      label: this.translate.instant(tab.label)
    }));
    this.tabs.set(translatedTabs);
  }

  ngOnInit(): void {
    this.translateLabels();

    this.translate.onLangChange.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((): void => {
      this.translateLabels();
    });
  }

  initIcons(): void {
    addIcons({ logOutOutline });

    for (const iconName in icons) {
      addIcons({ [iconName]: (icons as any)[iconName] });
    }
  }

  constructor() {
   this.initIcons();
  }
}
