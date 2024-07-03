import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'images-info',
  templateUrl: './images-info.component.html',
  styleUrls: ['./images-info.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImagesInfoComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
