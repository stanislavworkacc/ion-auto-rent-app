import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {RippleBtnComponent} from "../../../buttons/ripple-btn/ripple-btn.component";

@Component({
  selector: 'car-contract',
  templateUrl: './car-contract.component.html',
  styleUrls: ['./car-contract.component.scss'],
  standalone: true,
  imports: [
    RippleBtnComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarContractComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
