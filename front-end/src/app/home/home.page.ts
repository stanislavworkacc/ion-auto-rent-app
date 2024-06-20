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
import {
  AppToastContainerComponent
} from "../shared/components/app-toast/app-toast-container/app-toast-container.component";
import {ToasterService} from "../shared/components/app-toast/toaster.service";
import {AppToastComponent} from "../shared/components/app-toast/app-toast/app-toast.component";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [RouterOutlet, NgForOf, RouterLink, RouterLinkActive, IonHeader, IonToolbar, IonButton, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, AppToastContainerComponent, AppToastComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage {
  public tabs: WritableSignal<TabConfig[]> = signal<TabConfig[]>([]);
  private translate: TranslateService = inject(TranslateService);
  private destroyRef: DestroyRef = inject(DestroyRef);
  private toaster: ToasterService = inject(ToasterService);

  constructor() {
    this.initIcons();
  }

  initIcons(): void {
    addIcons({logOutOutline});

    for (const iconName in icons) {
      addIcons({[iconName]: (icons as any)[iconName]});
    }
  }

  ngOnInit(): void {
    this.translateLabels();

    this.translate.onLangChange.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((): void => {
      this.translateLabels();
    });

    // setInterval(() => {
    //   this.toaster.show({type: 'success', message: 'ssss'})
    //
    // }, 20)
  }

  private translateLabels(): void {
    const translatedTabs = tabConfig.map((tab: TabConfig) => ({
      ...tab,
      label: this.translate.instant(tab.label)
    }));
    this.tabs.set(translatedTabs);
  }
}
