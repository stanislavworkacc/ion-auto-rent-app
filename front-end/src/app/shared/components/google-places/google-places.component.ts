import {ChangeDetectionStrategy, Component, Input, input, InputSignal, OnInit} from '@angular/core';
import {IonIcon, IonItem, IonList, IonText} from "@ionic/angular/standalone";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'google-places',
  templateUrl: './google-places.component.html',
  styleUrls: ['./google-places.component.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonItem,
    IonList,
    IonText,
    NgForOf
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GooglePlacesComponent  implements OnInit {

  suggestions: InputSignal<any[]> = input([]);

  @Input() selectSuggestion: (suggestion) => void;
  @Input() control: any

  ngOnInit(): void {}
}
