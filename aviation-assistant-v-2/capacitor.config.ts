import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Aviation Assistant V2',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
