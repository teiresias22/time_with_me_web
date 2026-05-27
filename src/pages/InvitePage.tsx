import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { APP_INFO } from '../constants/appInfo'
import DownloadButtons from '../components/home/DownloadButtons'

const ANDROID_PACKAGE = 'com.joonhwan.timewithme.time_with_me'
const APP_HOST = 'time-with-me-745b5.web.app'
const FALLBACK_DELAY_MS = 2000

function detectPlatform() {
  if (typeof navigator === 'undefined') {
    return { isAndroid: false, isIOS: false, isMobile: false }
  }
  const ua = navigator.userAgent
  const isAndroid = /Android/i.test(ua)
  const isIOS =
    /iPhone|iPad|iPod/i.test(ua) ||
    (ua.includes('Mac') && typeof document !== 'undefined' && 'ontouchend' in document)
  return { isAndroid, isIOS, isMobile: isAndroid || isIOS }
}

export default function InvitePage() {
  const [searchParams] = useSearchParams()
  const inviteId = searchParams.get('id')
  const { t } = useTranslation()
  const [status, setStatus] = useState<'idle' | 'opening' | 'fallback'>('idle')
  const fallbackTimerRef = useRef<number | null>(null)

  const { isAndroid, isIOS, isMobile } = detectPlatform()
  const hasInviteId = Boolean(inviteId)
  const safeInviteId = inviteId ? encodeURIComponent(inviteId) : ''

  const clearFallbackTimer = () => {
    if (fallbackTimerRef.current !== null) {
      window.clearTimeout(fallbackTimerRef.current)
      fallbackTimerRef.current = null
    }
  }

  const tryOpenApp = () => {
    if (!hasInviteId) return
    setStatus('opening')
    clearFallbackTimer()

    if (isAndroid) {
      // Android: intent:// works even when App Link verification fails or app is not yet installed.
      // S.browser_fallback_url ensures Chrome navigates to Play Store cleanly if the app is missing.
      const referrer = encodeURIComponent(`utm_source=invite&inviteId=${safeInviteId}`)
      const fallbackUrl = encodeURIComponent(`${APP_INFO.playStoreLink}&referrer=${referrer}`)
      const intentUrl =
        `intent://invite?id=${safeInviteId}` +
        `#Intent;scheme=https;host=${APP_HOST};package=${ANDROID_PACKAGE};` +
        `S.browser_fallback_url=${fallbackUrl};end`
      window.location.href = intentUrl
      fallbackTimerRef.current = window.setTimeout(() => {
        setStatus('fallback')
        fallbackTimerRef.current = null
      }, FALLBACK_DELAY_MS)
    } else if (isIOS) {
      // iOS: re-navigating to the same Universal Link URL only works if the user gestured.
      // If the app is installed and entitlements are correct, iOS will intercept.
      // If not, we surface a download CTA — we don't force-redirect to the App Store.
      window.location.href = `https://${APP_HOST}/invite?id=${safeInviteId}`
      fallbackTimerRef.current = window.setTimeout(() => {
        setStatus('fallback')
        fallbackTimerRef.current = null
      }, FALLBACK_DELAY_MS)
    } else {
      setStatus('fallback')
    }
  }

  useEffect(() => {
    // Auto-attempt only on Android: intent:// reliably opens the installed app
    // (or falls back to Play Store) without needing user interaction. On iOS,
    // Safari blocks programmatic navigation triggers reliably, and if the user
    // already has the app, the Universal Link would have intercepted before
    // React mounted — auto-bouncing them to the App Store is hostile UX.
    if (hasInviteId && isAndroid) {
      tryOpenApp()
    }
    return clearFallbackTimer
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const handleVisibilityChange = () => {
      // If the page is hidden, the app likely took focus — cancel the store fallback
      // and reset state so the user sees the invite UI when they come back.
      if (document.visibilityState === 'hidden') {
        clearFallbackTimer()
        setStatus('idle')
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  if (!hasInviteId) {
    return (
      <section className="min-h-[80vh] flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 text-center">
          <img
            src="/assets/appicon.png"
            alt={t('app.name')}
            className="w-20 h-20 rounded-2xl shadow-lg mx-auto mb-6"
          />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {t('invite.invalidTitle')}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
            {t('invite.invalidMessage')}
          </p>
          <div className="flex justify-center">
            <DownloadButtons />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 text-center">
        <img
          src="/assets/appicon.png"
          alt={t('app.name')}
          className="w-20 h-20 rounded-2xl shadow-lg mx-auto mb-6"
        />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          {t('invite.title')}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
          {t('invite.message')}
        </p>

        {isMobile && (
          <button
            type="button"
            onClick={tryOpenApp}
            disabled={status === 'opening'}
            className="w-full py-3.5 px-6 rounded-xl font-semibold text-white bg-indigo-500 hover:bg-indigo-600 disabled:opacity-60 disabled:cursor-not-allowed transition-colors mb-4 cursor-pointer"
          >
            {status === 'opening' ? t('invite.opening') : t('invite.openApp')}
          </button>
        )}

        {(!isMobile || status === 'fallback') && (
          <p className="text-sm text-gray-400 dark:text-gray-500 mb-6">
            {isIOS ? t('invite.iosFallback') : t('invite.downloadPrompt')}
          </p>
        )}

        <div className="flex justify-center">
          <DownloadButtons />
        </div>
      </div>
    </section>
  )
}
