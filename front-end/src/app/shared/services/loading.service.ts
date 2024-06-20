import { Injectable } from '@angular/core';
import {BehaviorSubject, distinctUntilChanged, Observable, Observer, Subject, takeUntil, takeWhile} from "rxjs";
import {filter, map} from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class LoadingService {
  isLoading$: Observable<boolean>;
  private loadingCount$ = new BehaviorSubject(0);
  private blockGlobalLoading$ = new BehaviorSubject<boolean>(false);


  inc() {
    this.updateCount((c) => c + 1);
  }

  dec() {
    this.updateCount(c => c > 0 ? c - 1 : 0);
  }

  updateCount(fn: (count: number) => number) {
    this.loadingCount$.next(fn(this.loadingCount$.value));
  }

  public track<T>(destroyed$: Observable<void>) {
    return (target: Observable<T>) => Observable.create((observer: Observer<T>) => {
      this.inc();

      const subscription = target.pipe(takeUntil(destroyed$)).subscribe(observer);

      return () => {
        this.dec();
        subscription.unsubscribe();
      };
    });
  }

  blockGlobalLoader(block: boolean): void {
    this.blockGlobalLoading$.next(block);
  }

  constructor() {
    this.isLoading$ = this.loadingCount$.pipe(
      map((count) => count > 0 && !this.blockGlobalLoading$.value),
      distinctUntilChanged(),
    );

  }
}
