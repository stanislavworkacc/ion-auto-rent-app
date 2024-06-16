import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {tabConfig, TabConfig} from "./tab-config";
import {NgForOf} from "@angular/common";

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

  ngOnInit(): void {}
}
