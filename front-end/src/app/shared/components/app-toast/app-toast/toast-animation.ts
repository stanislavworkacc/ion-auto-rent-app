import {
  animate,
  AnimationTriggerMetadata,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

export const toastAnimations: {
  readonly fadeToast: AnimationTriggerMetadata;
} = {
  fadeToast: trigger('fadeAnimation', [
    transition('void => *', [
      style({ opacity: 0 }),
      animate('{{ fadeIn }}ms', style({ opacity: 1 }))
    ]),
    transition('* => void', [
      animate('{{ fadeOut }}ms', style({ opacity: 0 }))
    ])
  ])
};

export type ToastAnimationState = 'default' | 'closing';
