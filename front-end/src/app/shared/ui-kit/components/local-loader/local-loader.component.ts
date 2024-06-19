import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {IonItem} from "@ionic/angular/standalone";
import {IonSpinner} from "@ionic/angular/standalone";

@Component({
  selector: 'local-loader',
  templateUrl: './local-loader.component.html',
  styleUrls: ['./local-loader.component.scss'],
  standalone: true,
  imports: [
    IonItem,
    IonSpinner
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocalLoaderComponent  implements OnInit {

  @Input() spinner!: string;
  @Input() spinnerSize!: string;
  constructor() { }

  ngOnInit() {}

}
