import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {
  IonAvatar,
  IonButton, IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel, IonRange,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";
import {BackButtonComponent} from "../../../../../shared/ui-kit/components/back-button/back-button.component";
import {NotificationsPreviewComponent} from "../../notifications-preview/notifications-preview.component";
import {NavController} from "@ionic/angular";
import {FormsModule} from "@angular/forms";
import {NgClass, NgStyle} from "@angular/common";

@Component({
  selector: 'app-profile-edit-page',
  templateUrl: './profile-edit-page.component.html',
  styleUrls: ['./profile-edit-page.component.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    BackButtonComponent,
    IonAvatar,
    IonButtons,
    NotificationsPreviewComponent,
    IonRange,
    FormsModule,
    NgStyle,
    NgClass,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileEditPage implements OnInit {

  private navCtrl: NavController = inject(NavController);

  profileCompletion: number = 70;

  getRangeGradient(value: number): string {
    if (value <= 50) {
      return `linear-gradient(to right,
        #ff4d4d 0%,
        #ff4d4d ${value}%,
        #d1d5db ${value}%,
        #d1d5db 100%)`;
    } else if (value <= 90) {
      return `linear-gradient(to right,
        #ffcc00 0%,
        #ffcc00 ${value}%,
        #d1d5db ${value}%,
        #d1d5db 100%)`;
    } else {
      return `linear-gradient(to right,
        #4caf50 0%,
        #4caf50 ${value}%,
        #d1d5db ${value}%,
        #d1d5db 100%)`;
    }
  }

  getTextColor(value: number): string {
    if (value <= 50) {
      return 'text-red-600';
    } else if (value <= 90) {
      return 'text-yellow-600';
    } else {
      return 'text-green-600';
    }
  }

  goBack(): void {
    this.navCtrl.back()
  }

  ngOnInit() {
  }

}
