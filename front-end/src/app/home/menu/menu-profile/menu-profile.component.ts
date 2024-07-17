import {ChangeDetectionStrategy, Component, inject, input, InputSignal, OnInit} from '@angular/core';
import {
  IonBadge,
  IonButton,
  IonCard, IonCardContent,
  IonCardHeader, IonCardSubtitle,
  IonCardTitle, IonCol, IonContent,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonList, IonRow, IonText
} from "@ionic/angular/standalone";
import {NgForOf, NgIf} from "@angular/common";
import {MenuPage} from "../menu-enums";
import {NavController, Platform} from "@ionic/angular";
import {LogOutComponent} from "./log-out/log-out.component";
import {Router} from "@angular/router";
import {StorageService} from "../../../shared/services/storage.service";
import {MenuDataService} from "../menu-data.serivce";

@Component({
  selector: 'menu-profile',
  templateUrl: './menu-profile.component.html',
  styleUrls: ['./menu-profile.component.scss'],
  imports: [
    IonList,
    IonItem,
    IonIcon,
    IonLabel,
    NgForOf,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonContent,
    IonCardSubtitle,
    IonCardContent,
    IonText,
    IonBadge,
    NgIf,
    LogOutComponent
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuProfileComponent implements OnInit {

  public platform: Platform = inject(Platform);
  public menuDataService: MenuDataService = inject(MenuDataService);
  private navCtrl: NavController = inject(NavController);

  public pages: InputSignal<{ value: string, icon: string, label: string , iconClass: string}[]> = input([]);

  public MenuPage = MenuPage;

  openPage(page: { value: string, icon: string, label: string, iconClass:string }): void {
    // this.navCtrl.navigateForward(['/home/menu/profile']);
    this.menuDataService.selectedMenuChip.set(page)
  }

  get lastTwoPages() {
    return this.pages().slice(-2);
  }

  get mainPages() {
    return this.pages().slice(0, -2).filter(page => page.value !== MenuPage.SETTINGS && page.value !== MenuPage.HELP);
  }

  get settingsAndHelpPages() {
    return this.pages().filter(page => page.value === MenuPage.SETTINGS || page.value === MenuPage.HELP);
  }

  constructor() {
  }

  ngOnInit() {
  }
}
