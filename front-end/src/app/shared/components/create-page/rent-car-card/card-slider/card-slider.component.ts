import {ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-card-slider',
  templateUrl: './card-slider.component.html',
  styleUrls: ['./card-slider.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CardSliderComponent  implements OnInit {

  @Input({ required: true }) images: any;
  constructor() { }

  ngOnInit() {}

}
