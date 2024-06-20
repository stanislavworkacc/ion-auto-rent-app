import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Toast } from '../toast.interface';
import {ToasterService} from "../toaster.service";
import {RxFor} from "@rx-angular/template/for";
import {AppToastComponent} from "../app-toast/app-toast.component";

@Component({
  selector: 'toast-wrapper',
  templateUrl: './app-toast-container.component.html',
  styleUrls: ['./app-toast-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RxFor,
    AppToastComponent
  ],
  standalone: true
})
export class AppToastContainerComponent implements OnInit {

  _toasts: Toast[] = [];
  toasts$: BehaviorSubject<Toast[]> = new BehaviorSubject<Toast[]>(this._toasts);

  ngOnInit() {
    this._toaster.toast$.subscribe(toast => {
      this._toasts.push(toast);
      this.toasts$.next(this._toasts);
    });
  }

  remove(index: number) {
    this._toasts = this._toasts.filter((v, i) => i !== index);
    this.toasts$.next(this._toasts);
  }

  constructor(
    private _cdr: ChangeDetectorRef,
    private _toaster: ToasterService) {}
}
