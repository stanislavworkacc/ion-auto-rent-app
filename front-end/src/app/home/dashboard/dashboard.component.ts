import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {NavController} from "@ionic/angular";
import {IonFabComponent} from "../../shared/ui-kit/components/ion-fab/ion-fab.component";
import {AuthFormWrapperComponent} from "../../auth/authorizator/auth-form-wrapper/auth-form-wrapper.component";
import {AuthorizatorComponent} from "../../auth/authorizator/authorizator.component";
import {AndroidFormComponent} from "../../auth/authorizator/android-form/android-form.component";
import {AppleIosComponent} from "../../auth/authorizator/apple-ios/apple-ios.component";
import {BackButtonComponent} from "../../shared/ui-kit/components/back-button/back-button.component";
import {GoogleSsoComponent} from "../../auth/authorizator/google-sso/google-sso.component";
import {SegmentsComponent} from "../../shared/ui-kit/components/segments/segments.component";
import {SignUpFormComponent} from "../../auth/authorizator/sign-up-form/sign-up-form.component";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonToolbar,
  ModalController
} from "@ionic/angular/standalone";
import {NgIf} from "@angular/common";
import {CardListComponent} from "../../shared/components/card-list/card-list.component";
import {NearByComponent} from "./near-by/near-by.component";
import {RippleBtnComponent} from "../../shared/components/buttons/ripple-btn/ripple-btn.component";
import {
  CompaniesMarqueeComponent
} from "../../auth/authorizator/auth-form-wrapper/companies-marquee/companies-marquee.component";
import {CardListFiltersComponent} from "./card-list-filters/card-list-filters.component";
import {DashboardHeaderComponent} from "./dashboard-header/dashboard-header.component";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    IonFabComponent,
    AuthFormWrapperComponent,
    AuthorizatorComponent,
    AndroidFormComponent,
    AppleIosComponent,
    BackButtonComponent,
    GoogleSsoComponent,
    SegmentsComponent,
    SignUpFormComponent,
    IonContent,
    IonButton,
    NgIf, CardListComponent, NearByComponent, IonHeader, IonToolbar, IonLabel, RippleBtnComponent, CompaniesMarqueeComponent, IonIcon, CardListFiltersComponent, DashboardHeaderComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {

  private modalCtrl: ModalController = inject(ModalController);
  private navCtrl: NavController = inject(NavController);

  async openModal(): Promise<void> {
    const modal: HTMLIonModalElement = await this.modalCtrl.create({
      component: AuthorizatorComponent,
      cssClass: 'auth-modal',
      initialBreakpoint: 1,
      breakpoints: [0, 1]
    });

    await modal.present();

    modal.onWillDismiss().then((): void => {
      this.navCtrl.navigateForward('home/menu');
    })
  }

  ngOnInit(): void {
    // this.openModal();
  }
}
