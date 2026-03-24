import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { APP_INFO } from '../constants/appInfo'
import DownloadButtons from '../components/home/DownloadButtons'

export default function InvitePage() {
  const [searchParams] = useSearchParams()
  const inviteId = searchParams.get('id')
  const { t } = useTranslation()
  const [status, setStatus] = useState<'idle' | 'opening' | 'fallback'>('idle')

  const isAndroid = /Android/i.test(navigator.userAgent)
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent)
  const isMobile = isAndroid || isIOS
  const deepLink = `https://time-with-me-745b5.web.app/invite${inviteId ? `?id=${encodeURIComponent(inviteId)}` : ''}`

  useEffect(() => {
    if (inviteId && isMobile) {
      openApp()
    }
  }, [])

  function openApp() {
    setStatus('opening')

    if (isAndroid) {
      const intentUrl = `intent://invite${inviteId ? `?id=${encodeURIComponent(inviteId)}` : ''}#Intent;scheme=https;host=time-with-me-745b5.web.app;package=com.joonhwan.timewithme.time_with_me;end`
      window.location.href = intentUrl
      setTimeout(() => {
        setStatus('fallback')
        window.location.href = APP_INFO.playStoreLink
      }, 2000)
    } else if (isIOS) {
      window.location.href = deepLink
      setTimeout(() => {
        setStatus('fallback')
        window.location.href = APP_INFO.appStoreLink
      }, 2000)
    } else {
      setStatus('fallback')
    }
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
          {t('app.name')}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
          {t('invite.message', 'You\'ve been invited to join a calendar! Open the app to accept the invitation.')}
        </p>

        {isMobile && (
          <button
            onClick={openApp}
            className="w-full py-3.5 px-6 rounded-xl font-semibold text-white bg-indigo-500 hover:bg-indigo-600 transition-colors mb-4 cursor-pointer"
          >
            {t('invite.openApp', 'Open in App')}
          </button>
        )}

        {status === 'opening' && (
          <p className="text-sm text-gray-400 dark:text-gray-500 mb-4">
            {t('invite.opening', 'Opening app...')}
          </p>
        )}

        {(!isMobile || status === 'fallback') && (
          <p className="text-sm text-gray-400 dark:text-gray-500 mb-6">
            {t('invite.downloadPrompt', 'Download the app to accept the invitation.')}
          </p>
        )}

        <div className="flex justify-center">
          <DownloadButtons />
        </div>
      </div>
    </section>
  )
}
