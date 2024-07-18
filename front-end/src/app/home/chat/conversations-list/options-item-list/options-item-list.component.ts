import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {IonIcon, IonItemOption, IonItemOptions, IonLabel} from "@ionic/angular/standalone";

@Component({
  selector: 'options-item',
  templateUrl: './options-item-list.component.html',
  styleUrls: ['./options-item-list.component.scss'],
  standalone: true,
  imports: [
    IonItemOptions,
    IonItemOption,
    IonIcon,
    IonLabel,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptionsItemListComponent  implements OnInit {

  @Input({ required: true }) deleteConversation: () => void;
  constructor() { }

  ngOnInit() {}

}
