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
import {Platform} from "@ionic/angular";

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
    NgIf
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuProfileComponent implements OnInit {

  public platform: Platform = inject(Platform);
  public pages: InputSignal<{ value: string, icon: string, label: string }[]> = input([]);

  public MenuPage = MenuPage;

  constructor() {
  }

  ngOnInit() {
  }
}
