import { ToastType } from './toast.type';

export interface Toast {
  type: ToastType;
  message: string;
  delay?: number;
}
