import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-fab',
  templateUrl: './ion-fab.component.html',
  styleUrls: ['./ion-fab.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    NgForOf
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IonFabComponent  implements OnInit {

  @Input() fabItems: { icon: string, action: () => void }[] = [];
  @Input() icon: string = '';
  @Input() title: string = '';
  ngOnInit() {}
}
