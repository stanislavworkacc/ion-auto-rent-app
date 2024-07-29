import {ChangeDetectionStrategy, Component, computed, OnInit, Signal, signal, WritableSignal} from '@angular/core';
import {RippleBtnComponent} from "../../../shared/components/buttons/ripple-btn/ripple-btn.component";
import {IonicModule} from "@ionic/angular";
import {
  CompaniesMarqueeComponent
} from "../../../auth/authorizator/auth-form-wrapper/companies-marquee/companies-marquee.component";
import {SegmentsComponent} from "../../../shared/ui-kit/components/segments/segments.component";
import {SegmentType} from "../../../auth/authorizator/auth-form-wrapper/auth-enums";
import {IonIcon, IonLabel, IonSegment, IonSegmentButton} from "@ionic/angular/standalone";

@Component({
  selector: 'card-list-filters',
  templateUrl: './card-list-filters.component.html',
  styleUrls: ['./card-list-filters.component.scss'],
  standalone: true,
  imports: [
    RippleBtnComponent,
    CompaniesMarqueeComponent,
    SegmentsComponent,
    IonIcon,
    IonLabel,
    IonSegment,
    IonSegmentButton
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardListFiltersComponent  implements OnInit {


  transportTypes: WritableSignal<{ label: string, value: string, icon: string, category_id: number }[]> = signal([
    {
      label: 'Авто',
      value: 'cars',
      icon: '/assets/icon/car-type-ico.png',
      category_id: 1,
    },
    {
      label: 'Спецтехніка',
      value: 'special',
      icon: '/assets/icon/tractor-type-ico.png',
      category_id: 4,
    },
    {
      label: 'Водний транспорт',
      value: '',
      icon: '/assets/icon/water-vehicle-type.png',
      category_id: 0,
    },
  ]);
  selectedType: WritableSignal<{ label: string, value: string, icon: string, category_id: number }> = signal(this.transportTypes()[0]);
  vehicleType: Signal<{ label: string, value: string, icon: string, category_id: number }> = computed(() => this.selectedType());


  ngOnInit() {}

}
