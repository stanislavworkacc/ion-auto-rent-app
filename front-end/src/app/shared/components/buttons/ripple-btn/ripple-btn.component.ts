import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {IonIcon, IonRippleEffect} from "@ionic/angular/standalone";

@Component({
  selector: 'ripple-btn',
  templateUrl: './ripple-btn.component.html',
  styleUrls: ['./ripple-btn.component.scss'],
  standalone: true,
  imports: [IonRippleEffect, IonIcon],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RippleBtnComponent  implements OnInit {

  @Input({ required: true }) title: string = 'Підтвердити'
  @Input() icon: string = ''
  @Input() styles: string = ''
  @Input() image: string = ''
  constructor() { }

  ngOnInit() {}

}
