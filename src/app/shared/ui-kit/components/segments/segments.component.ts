import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {NgForOf} from "@angular/common";
import {SegmentType} from "../../../../auth/authorizator/auth-form-wrapper/auth-enums";

@Component({
  selector: 'app-segments',
  templateUrl: './segments.component.html',
  styleUrls: ['./segments.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    NgForOf
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SegmentsComponent  implements OnInit {

  @Input() options: { value: string, icon: string, label: string, isVisible?: boolean }[] = [];
  @Output() segmentChanged: EventEmitter<string> = new EventEmitter<string>();

  selectedSegment: string = SegmentType.STANTDART;

  onSegmentChanged(event: any): void {
    this.selectedSegment = event.detail.value;
    this.segmentChanged.emit(this.selectedSegment);
  }
  constructor() { }

  ngOnInit() {}

}
