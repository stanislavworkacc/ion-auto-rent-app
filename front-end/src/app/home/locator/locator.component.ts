import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-locator',
  templateUrl: './locator.component.html',
  styleUrls: ['./locator.component.scss'],
  standalone: true,
  imports: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocatorComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
