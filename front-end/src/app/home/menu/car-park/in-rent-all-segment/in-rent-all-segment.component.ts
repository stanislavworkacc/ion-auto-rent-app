import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {CarParkDataService} from "../car-park-data.service";
import {NavController, Platform} from "@ionic/angular";
import {IonLabel, IonSegment, IonSegmentButton} from "@ionic/angular/standalone";

@Component({
  selector: 'in-rent-all-segment',
  templateUrl: './in-rent-all-segment.component.html',
  styleUrls: ['./in-rent-all-segment.component.scss'],
  standalone: true,
  imports: [IonSegment, IonSegmentButton, IonLabel],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InRentAllSegmentComponent  implements OnInit {

  private carParkDataService: CarParkDataService = inject(CarParkDataService);
  private navCtrl: NavController = inject(NavController);
  public platform: Platform = inject(Platform);
  get carDataService() {
    return this.carParkDataService;
  }
  onSegmentChanged(event: any): void {
    this.carDataService.selectedSegment.update(() => event.detail.value);
    this.navCtrl.navigateForward([`home/menu/car-park/${this.carDataService.selectedSegment()}`])
  }

  ngOnInit() {}

}
