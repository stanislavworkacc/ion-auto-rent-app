import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {IonRippleEffect} from "@ionic/angular/standalone";

@Component({
  selector: 'ripple-btn',
  templateUrl: './ripple-btn.component.html',
  styleUrls: ['./ripple-btn.component.scss'],
  standalone: true,
  imports: [IonRippleEffect],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RippleBtnComponent  implements OnInit {

  @Input({ required: true }) title: string = 'Підтвердити'
  constructor() { }

  ngOnInit() {}

}
