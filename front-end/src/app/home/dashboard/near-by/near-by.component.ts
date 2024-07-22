import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {LocatorComponent} from "../../locator/locator.component";

@Component({
  selector: 'app-near-by',
  templateUrl: './near-by.component.html',
  styleUrls: ['./near-by.component.scss'],
  standalone: true,
  imports: [
    LocatorComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NearByComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
