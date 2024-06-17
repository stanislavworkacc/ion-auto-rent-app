import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'ion-rent-auto',
  webDir: 'www',
  server: {
    androidScheme: 'https',
    "url": "http://localhost:4200",
    "cleartext": true
  },
  plugins: {
    CapacitorHttp: {
      enabled: true
    }
  }
};


export default config;
