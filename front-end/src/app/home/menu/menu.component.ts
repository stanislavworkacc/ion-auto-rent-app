import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {IonButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar} from "@ionic/angular/standalone";
import {TranslateModule, TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, TranslateModule, IonButtons, IonButton
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent  implements OnInit {

  private translate: TranslateService = inject(TranslateService);

  switchLanguage(language: string) {
    this.translate.use(language);
  }
  ngOnInit() {}
}
