import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-all-parks',
  templateUrl: './all-parks.component.html',
  styleUrls: ['./all-parks.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllParksComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
