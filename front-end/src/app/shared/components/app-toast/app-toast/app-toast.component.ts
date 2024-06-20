import { AnimationEvent } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';

import { setTimeout, clearTimeout } from '@rx-angular/cdk/zone-less/browser';
import {toastAnimations, ToastAnimationState} from "./toast-animation";
import {Toast} from "../toast.interface";
import {DefaultToastConfig} from "./toast.config";
import {NgClass, NgIf} from "@angular/common";
import {ToastStatusEnum} from "../toast-status.enum";
import {SoundService} from "./sound-service";
import {IonIcon} from "@ionic/angular/standalone";


@Component({
  selector: 'toaster',
  templateUrl: './app-toast.component.html',
  styleUrls: ['./app-toast.component.scss'],
  animations: [toastAnimations.fadeToast],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgClass,
    NgIf,
    IonIcon
  ],
  standalone: true
})
export class AppToastComponent implements OnInit, OnDestroy {
  @Input() toast!: Toast;
  @Input() i!: number;
  @Output() remove = new EventEmitter<number>();

  animationState: ToastAnimationState = 'default';
  toastState = 'success';
  toastConfig = DefaultToastConfig;

  private intervalId: number | any;

  closeToast() {
    this.remove.next(this.i);
  }

  onFadeFinished(event: AnimationEvent) {
    const { toState } = event;

    const isFadeOut = (toState as ToastAnimationState) === 'closing';
    const itFinished = this.animationState === 'closing';

    if (isFadeOut && itFinished) {
      this.closeToast();
    }
  }

  getIconName(state: string): string {
    switch (state) {
      case ToastStatusEnum.Success:
        return 'recommend';
      case ToastStatusEnum.Error:
        return 'priority_high';
      case ToastStatusEnum.Warning:
        return 'running_with_errors';
      case ToastStatusEnum.Info:
        return 'info';
      default:
        return 'info';
    }
  }




  ngOnInit(): void {
    this.toastState = this.toast.type;

    this.intervalId = setTimeout(() => {
      this.animationState = 'closing';
      this._cdr.detectChanges();
    }, 3200);
  }

  ngOnDestroy(): void {
    clearTimeout(this.intervalId);
  }

  constructor(private _cdr: ChangeDetectorRef,
              private _el: ElementRef,
              private soundService: SoundService
              ) { }
}
