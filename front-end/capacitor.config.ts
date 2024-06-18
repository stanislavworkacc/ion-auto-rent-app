import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'ion-rent-auto',
  webDir: 'www',
  plugins: {
    CapacitorHttp: {
      enabled: true
    }
  }
};


export default config;
