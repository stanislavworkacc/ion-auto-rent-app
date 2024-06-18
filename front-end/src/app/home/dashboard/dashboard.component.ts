import {AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {IonicModule, IonModal} from "@ionic/angular";
import {IonFabComponent} from "../../shared/ui-kit/components/ion-fab/ion-fab.component";
import {AuthFormWrapperComponent} from "../../auth/authorizator/auth-form-wrapper/auth-form-wrapper.component";
import {AuthorizatorComponent} from "../../auth/authorizator/authorizator.component";
import {AndroidFormComponent} from "../../auth/authorizator/android-form/android-form.component";
import {AppleIosComponent} from "../../auth/authorizator/apple-ios/apple-ios.component";
import {BackButtonComponent} from "../../shared/ui-kit/components/back-button/back-button.component";
import {GoogleSsoComponent} from "../../auth/authorizator/google-sso/google-sso.component";
import {SegmentsComponent} from "../../shared/ui-kit/components/segments/segments.component";
import {SignUpFormComponent} from "../../auth/authorizator/sign-up-form/sign-up-form.component";
import {ModalController} from "@ionic/angular/standalone";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
    imports: [
        IonicModule,
        IonFabComponent,
        AuthFormWrapperComponent,
        AuthorizatorComponent,
        AndroidFormComponent,
        AppleIosComponent,
        BackButtonComponent,
        GoogleSsoComponent,
        SegmentsComponent,
        SignUpFormComponent
    ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent  implements OnInit, AfterViewInit {
  async openModal() {
    const modal = await this.modalController.create({
      component: AuthorizatorComponent,
      cssClass: 'auth-modal',
      initialBreakpoint: 1,
      breakpoints: [0, 1]
    });
    return await modal.present();
  }
  ngOnInit() {}
  ngAfterViewInit(): void {
    this.openModal();
  }

  constructor(private modalController: ModalController) { }
}
