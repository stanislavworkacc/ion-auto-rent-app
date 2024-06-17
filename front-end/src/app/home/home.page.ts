import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import {IonicModule, NavController} from "@ionic/angular";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {tabConfig, TabConfig} from "./tab-config";
import {NgForOf} from "@angular/common";
import {addIcons} from "ionicons";
import {logOutOutline} from "ionicons/icons";

import * as icons from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterOutlet, NgForOf, RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage {
  public homeTabs: TabConfig[] = tabConfig;

  constructor() {
    addIcons({ logOutOutline });

    for (const iconName in icons) {
      addIcons({ [iconName]: (icons as any)[iconName] });
    }
  }

  ngOnInit(): void {}
}
