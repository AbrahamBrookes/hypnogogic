import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'net.brookesy.hypnogogic',
  appName: 'hypnogogic',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    LocalNotifications: {
      smallIcon: "app_icon",
      iconColor: "#488AFF",
      sound: "extria.mp3",
    },
  },
};

export default config;
