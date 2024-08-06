import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef, inject,
  Input,
  OnInit, Renderer2, signal,
  ViewChild,
  WritableSignal
} from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle, IonCardTitle, IonIcon
} from "@ionic/angular/standalone";
import {ScheduleRangeComponent} from "../create-park-modal/schedule-range/schedule-range.component";
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'park-card',
  templateUrl: './park-card.component.html',
  styleUrls: ['./park-card.component.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonIcon,
    ScheduleRangeComponent,
    NgIf,
    NgClass
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParkCardComponent  implements OnInit, AfterViewInit {
  private renderer: Renderer2 = inject(Renderer2);

  @Input() selectParking: () => void;
  @Input() editMode: boolean = true;
  @Input() uploadedLogoUrl: string = '';
  @Input() parking: { label: string, location: string, contact: string, schedule: string, freeCars: number, carsInRent: number };

  @ViewChild('title', { static: false }) title: ElementRef;
  isExpanded: WritableSignal<boolean> = signal(false);
  isTruncated: WritableSignal<boolean> = signal(false);

  toggleExpand(): void {
    this.isExpanded.set(!this.isExpanded());
  }

  checkTruncated(): void {
    const el = this.title?.nativeElement;
    if(el) {
      this.isTruncated.set(el.scrollWidth > el.clientWidth)
    }
  }

  ngOnInit() {}
  ngAfterViewInit() {
    this.checkTruncated();
  }
}
