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
import {Platform} from "@ionic/angular";

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
export class ParkCardComponent implements OnInit, AfterViewInit {
  public platform: Platform = inject(Platform);
  @Input() selectParking: () => void;
  @Input() editMode: boolean = true;
  @Input() uploadedLogoUrl: string = '';
  @Input() parking: {
    label: string,
    location: string,
    contact: string,
    schedule: string,
    freeCars: number,
    carsInRent: number
  };

  @ViewChild('title', {static: false}) title: ElementRef;
  @ViewChild('subtitle', {static: false}) subtitle: ElementRef;

  isTitleExpanded: WritableSignal<boolean> = signal(false);
  isSubtitleExpanded: WritableSignal<boolean> = signal(false);
  isTitleTruncated: WritableSignal<boolean> = signal(false);
  isSubtitleTruncated: WritableSignal<boolean> = signal(false);

  toggleTitleExpand(): void {
    this.isTitleExpanded.set(!this.isTitleExpanded());
  }

  toggleSubtitleExpand(): void {
    this.isSubtitleExpanded.set(!this.isSubtitleExpanded());
  }

  checkTitlesTruncated(): void {
    const title = this.title?.nativeElement;
    if (title) {
      this.isTitleTruncated.set(title.scrollWidth > title.clientWidth)
    }

    const subtitle = this.subtitle?.nativeElement;
    if (subtitle) {
      this.isSubtitleTruncated.set(subtitle.scrollWidth > subtitle.clientWidth)
    }

  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.checkTitlesTruncated();
  }
}
