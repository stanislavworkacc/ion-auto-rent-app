import {
  ChangeDetectionStrategy,
  Component, effect, Input,
  input,
  InputSignal,
  OnInit,
  ViewEncapsulation,
  WritableSignal
} from '@angular/core';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle, IonChip,
  IonIcon, IonLabel
} from "@ionic/angular/standalone";
import {SegmentsComponent} from "../../../shared/ui-kit/components/segments/segments.component";
import {NotificationsPreviewComponent} from "../menu-profile/notifications-preview/notifications-preview.component";

@Component({
  selector: 'app-profile-greetings',
  templateUrl: './profile-greetings.component.html',
  styleUrls: ['./profile-greetings.component.scss'],
  standalone: true,
  imports: [
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonIcon,
    IonButton,
    SegmentsComponent,
    IonChip,
    IonLabel,
    NotificationsPreviewComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ProfileGreetingsComponent implements OnInit {

  public options: InputSignal<{ value: string, icon: string, label: string }[]> = input([]);
  @Input() selected: WritableSignal<string>;

  chipSelected(type: string): void {
    this.selected.set(type);
  }

  ngOnInit() {

  }

  constructor() {

  }
}
