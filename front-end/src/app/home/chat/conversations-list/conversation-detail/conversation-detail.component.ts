import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {IonContent, IonHeader, IonIcon, IonTitle, IonToolbar} from "@ionic/angular/standalone";
import {RouterOutlet} from "@angular/router";
import {BackButtonComponent} from "../../../../shared/ui-kit/components/back-button/back-button.component";
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-conversation-detail',
  templateUrl: './conversation-detail.component.html',
  styleUrls: ['./conversation-detail.component.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonIcon,
    IonTitle,
    IonToolbar,
    RouterOutlet,
    BackButtonComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConversationDetailComponent  implements OnInit {

  private navCtrl: NavController = inject(NavController);

  constructor() { }

  goBack(): void {
    this.navCtrl.back()
  }
  ngOnInit() {}

}
