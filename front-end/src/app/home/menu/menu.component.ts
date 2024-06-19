import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [

  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
