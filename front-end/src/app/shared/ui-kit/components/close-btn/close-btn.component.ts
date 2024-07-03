import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-close-btn',
  templateUrl: './close-btn.component.html',
  styleUrls: ['./close-btn.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CloseBtnComponent  implements OnInit {
  @Input() btnStyles?: string
  @Input() color?: string = '#ffffff'
  constructor() { }

  ngOnInit() {}

}
