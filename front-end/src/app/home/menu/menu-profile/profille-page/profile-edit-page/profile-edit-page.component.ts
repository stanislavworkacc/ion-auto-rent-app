import {ChangeDetectionStrategy, Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {
    IonAlert,
    IonAvatar, IonBreadcrumb, IonBreadcrumbs,
    IonButton, IonButtons, IonChip,
    IonContent, IonFab, IonFabButton, IonFabList,
    IonHeader, IonIcon,
    IonInput,
    IonItem, IonItemDivider,
    IonLabel, IonList, IonPopover, IonRange, IonSearchbar, IonSpinner,
    IonTitle,
    IonToolbar
} from "@ionic/angular/standalone";
import {BackButtonComponent} from "../../../../../shared/ui-kit/components/back-button/back-button.component";
import {NotificationsPreviewComponent} from "../../notifications-preview/notifications-preview.component";
import {ActionSheetController } from "@ionic/angular";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {NgClass, NgForOf, NgStyle} from "@angular/common";
import {ValidateInputDirective} from "../../../../../shared/directives/validate-input.directive";
import {PhoneNumberFormatterDirective} from "../../../../../shared/directives/phone-formatter.directive";
import {BreadcrumbLabelPipe} from "../../../../../shared/breadcrumb-map-name.pipe";
import {ProfileEditService} from "./profile-edit.service";
import {ProfileFormComponent} from "./profile-form/profile-form.component";
import {EditPageHeaderComponent} from "./edit-page-header/edit-page-header.component";

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
    IonIcon,
    IonSpinner,
    ValidateInputDirective,
    ReactiveFormsModule,
    PhoneNumberFormatterDirective,
    IonItemDivider,
    IonAlert,
    IonChip,
    IonPopover,
    IonList,
    BreadcrumbLabelPipe,
    IonBreadcrumb,
    IonBreadcrumbs,
    IonSearchbar,
    NgForOf,
    IonFab,
    IonFabButton,
    IonFabList,
    ProfileFormComponent,
    EditPageHeaderComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileEditPage implements OnInit {

  private actionSheetCtrl: ActionSheetController = inject(ActionSheetController);
  private profileEditService: ProfileEditService = inject(ProfileEditService);

  passwordBlurred: WritableSignal<boolean> = signal(true);
  isBlurred: WritableSignal<boolean> = signal(true);


  get profile() {
    return this.profileEditService;
  }

  async openActionSheet(): Promise<void> {
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Редагувати профіль',
          handler: () => {
            this.isBlurred.set(false);
          }
        },
        {
          text: 'Видалити профіль',
          handler: () => {
            this.deleteAccount();
          }
        },
        {
          text: 'Скасувати',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();
  }

  async deleteAccount(): Promise<void> {
    await this.profile.deleteAccount()
  }

   ngOnInit() {

  }
}
