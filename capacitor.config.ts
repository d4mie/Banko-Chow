import type { CapacitorConfig } from '@capacitor/cli'

const BRAND_ORANGE = '#F06800'

const config: CapacitorConfig = {
  appId: 'com.bankochow.app',
  appName: 'Banko Chow',
  webDir: 'dist',
  backgroundColor: BRAND_ORANGE,
  ios: {
    // The web layer owns the safe areas (see index.css), so never add native insets.
    contentInset: 'never',
    scrollEnabled: true,
    backgroundColor: BRAND_ORANGE,
  },
  android: {
    backgroundColor: BRAND_ORANGE,
    allowMixedContent: false,
  },
  plugins: {
    SplashScreen: {
      // Hidden from the web layer once the first screen has rendered (see lib/native.ts).
      launchAutoHide: false,
      backgroundColor: BRAND_ORANGE,
      androidScaleType: 'CENTER_CROP',
      splashFullScreen: true,
      splashImmersive: false,
      showSpinner: false,
    },
    StatusBar: {
      // Light icons on the orange brand background.
      style: 'DARK',
      overlaysWebView: true,
      backgroundColor: BRAND_ORANGE,
    },
    SystemBars: {
      insetsHandling: 'css',
      initialViewportFitValueHint: 'cover',
      style: 'DARK',
    },
  },
}

export default config
