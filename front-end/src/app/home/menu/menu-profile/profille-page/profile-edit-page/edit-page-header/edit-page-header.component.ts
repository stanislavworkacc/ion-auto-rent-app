import {ChangeDetectionStrategy, Component, inject, Input, OnInit, ViewChild} from '@angular/core';
import {BackButtonComponent} from "../../../../../../shared/ui-kit/components/back-button/back-button.component";
import {IonAvatar, IonButton, IonButtons, IonIcon, IonText} from "@ionic/angular/standalone";
import {NavController} from "@ionic/angular";
import {BreadcrumbService} from "../../../../../../shared/services/breadcrumb.service";

@Component({
  selector: 'edit-page-header',
  templateUrl: './edit-page-header.component.html',
  styleUrls: ['./edit-page-header.component.scss'],
  standalone: true,
  imports: [
    BackButtonComponent,
    IonButtons,
    IonAvatar,
    IonButton,
    IonIcon,
    IonText
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPageHeaderComponent  implements OnInit {
  private navCtrl: NavController = inject(NavController);
  private breadcrumbs: BreadcrumbService = inject(BreadcrumbService);

  @ViewChild('popover') popover;

  get breadcrumbsService() {
    return this.breadcrumbs;
  }
  goBack(): void {
    this.navCtrl.back()
  }

  ngOnInit() {}
}

// async presentPopover(e: Event): Promise<void> {
//   const eventDetail = (e as CustomEvent).detail;
//   this.collapsedBreadcrumbs = this.breadcrumbsService.buildCollapsedBreadcrumbs(
//     eventDetail.collapsedBreadcrumbs,
//     ['/home'],
//     [
//       { url: '/home/menu/profile', label: 'Профіль' },
//     ]
//   );
//   this.popover.event = e;
//   this.isBreadCrumbPopoverOpen = true;
// }
