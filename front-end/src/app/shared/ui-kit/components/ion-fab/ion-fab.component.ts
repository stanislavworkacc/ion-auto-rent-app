import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {NgForOf} from "@angular/common";
import {IonFab, IonFabButton, IonFabList, IonIcon} from "@ionic/angular/standalone";

@Component({
  selector: 'app-fab',
  templateUrl: './ion-fab.component.html',
  styleUrls: ['./ion-fab.component.scss'],
  standalone: true,
  imports: [
    NgForOf,
    IonFab,
    IonFabButton,
    IonFabList,
    IonIcon
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IonFabComponent  implements OnInit {

  @Input() fabItems: { icon: string, action: () => void }[] = [];
  @Input() icon: string = '';
  @Input() title: string = '';
  ngOnInit() {}
}
