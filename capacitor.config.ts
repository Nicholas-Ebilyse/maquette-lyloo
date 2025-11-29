import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.95ba4bf2bfc14fcda12ab4bf60807369',
  appName: 'LYLOO',
  webDir: 'dist',
  server: {
    url: 'https://95ba4bf2-bfc1-4fcd-a12a-b4bf60807369.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#f5f2e6',
      showSpinner: false
    },
    StatusBar: {
      style: 'light',
      backgroundColor: '#373a37'
    }
  }
};

export default config;
