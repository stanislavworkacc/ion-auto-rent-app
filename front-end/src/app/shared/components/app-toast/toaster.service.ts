import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { handleError } from '../../utils/errorHandler';
import {Toast} from "./toast.interface";
import {ToastType} from "./toast.type";

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  subject: BehaviorSubject<Toast>;
  toast$: Observable<Toast>;

  constructor() {
    // @ts-ignore
    this.subject = new BehaviorSubject<Toast>(null);
    this.toast$ = this.subject.asObservable()
      .pipe(filter(toast => toast !== null));
  }

  show({ type, message, delay }: { type?: ToastType, message?: string, delay?: number }) {
    // @ts-ignore
    this.subject.next({ type, message, delay });
  }

  // @ts-ignore
  handleError(errors) {
    return handleError(errors, this)
  }
}
