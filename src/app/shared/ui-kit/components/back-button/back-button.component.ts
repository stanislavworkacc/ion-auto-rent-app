import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss'],
  standalone: true,
  imports: [
    IonicModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BackButtonComponent  implements OnInit {

  @Input() navigateBack!: () => void;
  constructor() { }

  ngOnInit() {}

}
