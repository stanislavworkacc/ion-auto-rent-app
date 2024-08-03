import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit, signal,
  ViewEncapsulation,
  WritableSignal
} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {NgForOf} from "@angular/common";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonRadio,
  IonRadioGroup,
  IonSearchbar, IonTitle, IonToolbar, PopoverController
} from "@ionic/angular/standalone";

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
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButton
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class PhoneCodesComponent implements OnInit {

  private popoverCtrl: PopoverController = inject(PopoverController);

  @Input() codes: { code: string, name: string }[] = [];
  filteredCodes: { code: string, name: string }[] = [];

  selectedCode: WritableSignal<{ code: string, name: string }> = signal(null);

  filterCodes(event: any): void {
    const query = event.target.value.toLowerCase();
    if (query.trim() === '') {
      this.filteredCodes = this.codes;
    } else {
      this.filteredCodes = this.codes.filter(code =>
        code.name.toLowerCase().includes(query) || code.code.includes(query)
      );
    }
  }

  selectCode(code: { code: string, name: string }): void {
    this.selectedCode.set(code);
  }

  async submitSelection(): Promise<void> {
    await this.popoverCtrl.dismiss(this.selectedCode())
  }

  ngOnInit(): void {
    this.filteredCodes = this.codes;
  }
}
