import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'ion-rent-auto',
  webDir: 'www',
  plugins: {
    CapacitorHttp: {
      enabled: true
    },
    CapacitorCookies: {
      enabled: true,
    },
  },
  server: {
    hostname: '143.198.120.163:8000'
  }
};


export default config;
