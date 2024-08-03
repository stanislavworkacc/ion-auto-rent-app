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
  IonContent, IonFooter,
  IonHeader, IonInfiniteScroll, IonInfiniteScrollContent,
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
    IonButton,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonFooter
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class PhoneCodesComponent implements OnInit {
  readonly PAGE_SIZE: number = 20;
  private popoverCtrl: PopoverController = inject(PopoverController);

  @Input() codes: { code: string, name: string }[] = [];

  selectedCode: WritableSignal<{ code: string, name: string }> = signal(null);

  filteredCodes: { code: string, name: string }[] = [];
  displayedCodes: { code: string, name: string }[] = [];
  currentIndex: number = 0;

  ngOnInit(): void {
    this.filteredCodes = this.codes;
    this.loadMoreData();
  }

  filterCodes(event: any): void {
    const query = event.target.value.toLowerCase();
    if (query.trim() === '') {
      this.filteredCodes = this.codes;
    } else {
      this.filteredCodes = this.codes.filter(code =>
        code.name.toLowerCase().includes(query) || code.code.includes(query)
      );
    }
    this.resetDisplay();
  }

  resetDisplay(): void {
    this.displayedCodes = [];
    this.currentIndex = 0;
    this.loadMoreData();
  }

  loadMoreData(): void {
    const nextIndex = this.currentIndex + this.PAGE_SIZE;
    const nextData = this.filteredCodes.slice(this.currentIndex, nextIndex);
    this.displayedCodes = [...this.displayedCodes, ...nextData];
    this.currentIndex = nextIndex;
  }

  async loadData(event: any): Promise<void> {
    this.loadMoreData();
    event.target.complete();
    if (this.displayedCodes.length >= this.filteredCodes.length) {
      event.target.disabled = true;
    }
  }

  selectCode(code: { code: string, name: string }): void {
    this.selectedCode.set(code);
  }

  async submitSelection(): Promise<void> {
    await this.popoverCtrl.dismiss(this.selectedCode());
  }
}
