import {ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {NgForOf} from "@angular/common";
import {IonContent, IonItem, IonLabel, IonList, IonRadio, IonRadioGroup, IonSearchbar} from "@ionic/angular/standalone";

@Component({
  selector: 'app-phone-codes',
  templateUrl: './phone-codes.component.html',
  styleUrls: ['./phone-codes.component.scss'],
  standalone: true,
  imports: [
    NgForOf,
    IonSearchbar,
    IonList,
    IonRadioGroup,
    IonItem,
    IonLabel,
    IonRadio,
    IonContent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class PhoneCodesComponent implements OnInit {

  @Input() codes: { code: string, name: string }[] = [];

  filteredCodes: { code: string, name: string }[] = [];

  filterCodes(event: any) {
    const query = event.target.value.toLowerCase();
    if (query.trim() === '') {
      this.filteredCodes = this.codes;
    } else {
      this.filteredCodes = this.codes.filter(code =>
        code.name.toLowerCase().includes(query) || code.code.includes(query)
      );
    }
  }

  selectCode(code: { code: string, name: string }) {
    const popover = document.querySelector('ion-popover');
    popover.dismiss(code);
  }

  ngOnInit() {
    this.filteredCodes = this.codes;
  }
}
