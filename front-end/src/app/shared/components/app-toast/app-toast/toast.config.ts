export interface ToastConfig {
  animation?: {
    fadeOut: number;
    fadeIn: number;
  };
}

export const DefaultToastConfig: ToastConfig = {
  animation: {
    fadeOut: 2500,
    fadeIn : 300
  }
};
