import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-locator',
  templateUrl: './locator.component.html',
  styleUrls: ['./locator.component.scss'],
  standalone: true,
  imports: [
    IonicModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocatorComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
