import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-apple-ios',
  templateUrl: './apple-ios.component.html',
  styleUrls: ['./apple-ios.component.scss'],
  standalone: true,
  imports: [
    IonicModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppleIosComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
