import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {InRentAllSegmentComponent} from "../in-rent-all-segment/in-rent-all-segment.component";
import {IonContent} from "@ionic/angular/standalone";

@Component({
  selector: 'in-rent',
  templateUrl: './in-rent.component.html',
  styleUrls: ['./in-rent.component.scss'],
  standalone: true,
  imports: [
    InRentAllSegmentComponent,
    IonContent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InRentComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
