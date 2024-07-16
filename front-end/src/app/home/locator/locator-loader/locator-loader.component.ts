import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {IonIcon} from "@ionic/angular/standalone";

@Component({
  selector: 'locator-loader',
  templateUrl: './locator-loader.component.html',
  styleUrls: ['./locator-loader.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonIcon
  ]
})
export class LocatorLoaderComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
