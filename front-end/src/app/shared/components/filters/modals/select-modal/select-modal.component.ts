import {
  ChangeDetectionStrategy,
  Component,
  inject, Input,
  OnInit, Signal,
  signal,
  WritableSignal
} from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader, IonInfiniteScroll, IonInfiniteScrollContent, IonItem,
  IonLabel,
  IonList, IonRadio, IonRadioGroup, IonSearchbar, IonText, IonTitle,
  IonToolbar,
  ModalController
} from "@ionic/angular/standalone";
import {CloseBtnComponent} from "../../../../ui-kit/components/close-btn/close-btn.component";
import {Platform} from "@ionic/angular";
import {FormsModule} from "@angular/forms";
import {JsonPipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-select-modal',
  templateUrl: './select-modal.component.html',
  styleUrls: ['./select-modal.component.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonButtons,
    CloseBtnComponent,
    IonLabel,
    IonContent,
    IonList,
    IonRadioGroup,
    IonItem,
    IonRadio,
    IonSearchbar,
    FormsModule,
    JsonPipe,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    NgIf,
    IonTitle,
    IonButton,
    IonText
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectModalComponent  implements OnInit {

  private modalCtrl: ModalController = inject(ModalController);
  public platform: Platform = inject(Platform);

  @Input({ required: true }) withSearch: boolean = false;
  @Input({ required: true }) title: string = '';
  @Input({ required: true }) items: WritableSignal<any>;
  @Input({ required: true }) selectedValue: WritableSignal<any>;

  tempSelection: WritableSignal<any> = signal({});

  visibleItems: WritableSignal<any[]> = signal([]);
  pageSize: number = 25;
  currentPage: number = 1;

  closeModal(isSubmit: boolean = false): void {
    this.modalCtrl.dismiss({ isSubmit });
  }

  onSelectChange(value): void {
    this.tempSelection.set(value);
  }

  submitSelection(): void {
    this.selectedValue.set(this.tempSelection());
    this.closeModal(true);
  }

  loadInitialData(): void {
    const initialItems = this.items().slice(0, this.pageSize);
    this.visibleItems.set(initialItems);
  }

  loadMoreData(event: any): void {
    const nextPage: number = this.currentPage + 1;
    const startIndex: number = this.currentPage * this.pageSize;
    const endIndex: number = startIndex + this.pageSize;

    const newItems = this.items().slice(startIndex, endIndex);
    const updatedVisibleItems = [...this.visibleItems(), ...newItems];
    this.visibleItems.set(updatedVisibleItems);
    this.currentPage = nextPage;

    if (this.visibleItems().length >= this.items().length) {
      event.target.disabled = true;
    }

    event.target.complete();
  }

  filterItems(event: any): void {
    const searchTerm: string = event.target.value.toLowerCase();

    if (searchTerm.trim() === '') {
      this.loadInitialData();
      return;
    }

    const filteredItems = this.items().filter((item: any) =>
      (item.name && item.name.toLowerCase().includes(searchTerm)) ||
      (item.label && item.label.toLowerCase().includes(searchTerm))
    );

    this.visibleItems.set(filteredItems.slice(0, this.pageSize));
    this.currentPage = 1;
  }

  ngOnInit() {
    this.loadInitialData();
  }

  protected readonly Array = Array;
}
