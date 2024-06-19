import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  signal,
  WritableSignal
} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {NgForOf} from "@angular/common";
import {SegmentType} from "../../../../auth/authorizator/auth-form-wrapper/auth-enums";
import {IonIcon, IonLabel, IonSegment, IonSegmentButton} from "@ionic/angular/standalone";

@Component({
  selector: 'app-segments',
  templateUrl: './segments.component.html',
  styleUrls: ['./segments.component.scss'],
  standalone: true,
  imports: [
    NgForOf,
    IonSegment,
    IonSegmentButton,
    IonIcon,
    IonLabel
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SegmentsComponent  implements OnInit {

  @Input() options: WritableSignal<{ value: string, icon: string, label: string, isVisible?: boolean } []>  = signal([]);
  @Output() segmentChanged: EventEmitter<string> = new EventEmitter<string>();

  selectedSegment: string = SegmentType.STANTDART;

  onSegmentChanged(event: any): void {
    this.selectedSegment = event.detail.value;
    this.segmentChanged.emit(this.selectedSegment);
  }
  constructor() { }

  ngOnInit() {}

}
