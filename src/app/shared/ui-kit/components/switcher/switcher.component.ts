import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-switcher',
  templateUrl: './switcher.component.html',
  styleUrls: ['./switcher.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SwitcherComponent  implements OnInit {
  @Input() isOn: boolean = false;
  @Output() toggleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  onToggleChange(): void {
    this.isOn = !this.isOn;
    this.toggleChange.emit(this.isOn);
  }
  constructor() { }

  ngOnInit() {}

}
