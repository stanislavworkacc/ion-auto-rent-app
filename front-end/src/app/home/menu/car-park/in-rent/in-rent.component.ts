import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'in-rent',
  templateUrl: './in-rent.component.html',
  styleUrls: ['./in-rent.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InRentComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
