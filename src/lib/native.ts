import { App } from '@capacitor/app'
import { Capacitor } from '@capacitor/core'
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics'
import { SplashScreen } from '@capacitor/splash-screen'
import { StatusBar, Style } from '@capacitor/status-bar'

export const isNative = Capacitor.isNativePlatform()
export const platform = Capacitor.getPlatform() as 'web' | 'ios' | 'android'

/**
 * One-time native bootstrap: light status bar icons over the orange backdrop,
 * edge-to-edge web view, then dismiss the splash once React has painted.
 */
export async function initNative(): Promise<void> {
  if (!isNative) return
  try {
    await StatusBar.setStyle({ style: Style.Dark })
    if (platform === 'android') {
      await StatusBar.setOverlaysWebView({ overlay: true })
      await StatusBar.setBackgroundColor({ color: '#00000000' })
    }
  } catch {
    // Status bar plugin is unavailable in some embedded contexts; the UI is still usable.
  }
  requestAnimationFrame(() => {
    void SplashScreen.hide({ fadeOutDuration: 250 })
  })
}

/** Android hardware back: go back in history, or exit at the root. */
export function registerBackButton(canGoBack: () => boolean, goBack: () => void): () => void {
  if (platform !== 'android') return () => {}
  const handle = App.addListener('backButton', () => {
    if (canGoBack()) goBack()
    else void App.exitApp()
  })
  return () => {
    void handle.then((h) => h.remove())
  }
}

export function tapHaptic(): void {
  if (!isNative) return
  void Haptics.impact({ style: ImpactStyle.Light }).catch(() => {})
}

export function successHaptic(): void {
  if (!isNative) return
  void Haptics.notification({ type: NotificationType.Success }).catch(() => {})
}

/** Opens a URL outside the app (WhatsApp, Instagram, Maps, phone dialer). */
export function openExternal(url: string): void {
  if (isNative) {
    window.open(url, '_system')
    return
  }
  window.open(url, '_blank', 'noopener,noreferrer')
}
