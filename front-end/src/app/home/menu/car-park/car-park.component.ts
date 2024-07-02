import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  InputSignal,
  OnInit, signal,
  ViewChild,
  WritableSignal
} from '@angular/core';
import {NavController, Platform} from "@ionic/angular";
import {
  IonBreadcrumb,
  IonBreadcrumbs,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPopover,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonThumbnail,
  IonToolbar
} from "@ionic/angular/standalone";
import {BackButtonComponent} from "../../../shared/ui-kit/components/back-button/back-button.component";
import {MenuDataService} from "../menu-data.serivce";
import {MenuSection} from "../menu-enums";
import {BreadcrumbLabelPipe} from "../../../shared/breadcrumb-map-name.pipe";
import {BreadcrumbService} from "../../../shared/services/breadcrumb.service";
import {NgForOf} from "@angular/common";
import {SegmentsComponent} from "../../../shared/ui-kit/components/segments/segments.component";
import {CarParkDataService} from "./car-park-data.service";
import {SelectedSegment} from "./car-park.enums";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'car-park',
  templateUrl: './car-park.component.html',
  styleUrls: ['./car-park.component.scss'],
  standalone: true,
  imports: [
    IonCardHeader,
    IonCardSubtitle,
    IonCol,
    IonGrid,
    IonIcon,
    IonLabel,
    IonRow,
    IonCard,
    IonCardContent,
    IonHeader,
    IonToolbar,
    IonContent,
    BackButtonComponent,
    BreadcrumbLabelPipe,
    IonBreadcrumb,
    IonBreadcrumbs,
    IonButtons,
    IonItem,
    IonList,
    IonPopover,
    NgForOf,
    IonSegment,
    IonSegmentButton,
    SegmentsComponent,
    RouterOutlet,
    IonCardTitle,
    IonThumbnail
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarParkComponent  implements OnInit {

  private navCtrl: NavController = inject(NavController);
  private menuDataService: MenuDataService = inject(MenuDataService);
  private carParkDataService: CarParkDataService = inject(CarParkDataService);
  private breadcrumbs: BreadcrumbService = inject(BreadcrumbService);

  @ViewChild('popover') popover;

  public collapsedBreadcrumbs: any[] = [];
  public isBreadCrumbPopoverOpen: WritableSignal<boolean> = signal(false);

  get dataService() {
    return this.menuDataService;
  }

  get carDataService() {
    return this.carParkDataService;
  }


  get breadcrumbsService() {
    return this.breadcrumbs;
  }

  async presentPopover(e: Event): Promise<void> {
    const eventDetail = (e as CustomEvent).detail;

    this.collapsedBreadcrumbs = this.breadcrumbsService.buildCollapsedBreadcrumbs(
      eventDetail.collapsedBreadcrumbs,
      this.carDataService.excludedRoutes(),
      this.carDataService.additionalRoutes()
      );

    this.popover.event = e;
    this.isBreadCrumbPopoverOpen.set(true);
  }
  navigateBack(): void {
    this.navCtrl.navigateBack(['home/menu']);
    this.dataService.selectedMenuChip.set(MenuSection.PROFILE);
  }

  setSegmentOptions(): void {
    this.carDataService.options.set([
      {value: SelectedSegment.ALL, icon: '/assets/icon/all-cars-ico.png', label: 'Всі', isVisible: true},
      {value: SelectedSegment.IN_RENT, icon: '/assets/icon/car-in-rent-ico.png', label: 'В оренді', isVisible: true},
    ])
  }

  onSegmentChanged(event: any): void {
    this.carDataService.selectedSegment.update(() => event.detail.value);
    this.navCtrl.navigateForward([`home/menu/car-park/${this.carDataService.selectedSegment()}`])
  }
  ngOnInit(): void {
    this.setSegmentOptions();
    this.carDataService.routes.set(['/home', '/home/menu/car-park']);
  }

}
