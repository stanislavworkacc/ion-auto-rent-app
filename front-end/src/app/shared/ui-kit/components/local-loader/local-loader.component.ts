import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'local-loader',
  templateUrl: './local-loader.component.html',
  styleUrls: ['./local-loader.component.scss'],
  standalone: true,
  imports: [
    IonicModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocalLoaderComponent  implements OnInit {

  @Input() spinner!: string;
  @Input() spinnerSize!: string;
  constructor() { }

  ngOnInit() {}

}
