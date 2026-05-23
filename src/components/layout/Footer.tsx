import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FaEnvelope, FaComment } from 'react-icons/fa'
import { APP_INFO } from '../../constants/appInfo'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-gray-50 dark:bg-[#111] border-t border-gray-200 dark:border-[#222]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <nav className="flex items-center justify-center gap-6 mb-6">
          <Link to="/" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors no-underline">
            {t('nav.home')}
          </Link>
          <Link to="/privacy" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors no-underline">
            {t('nav.privacy')}
          </Link>
          <Link to="/terms" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors no-underline">
            {t('nav.terms')}
          </Link>
          <Link to="/other-apps" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors no-underline">
            {t('nav.otherApps')}
          </Link>
        </nav>



        <div className="flex items-center justify-center gap-3 mb-6">
          <a href={`mailto:${APP_INFO.email}`}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-primary hover:text-white transition-colors">
            <FaEnvelope className="text-sm" />
          </a>
          <a href={APP_INFO.kakaoChat} target="_blank" rel="noopener noreferrer"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-primary hover:text-white transition-colors">
            <FaComment className="text-sm" />
          </a>
        </div>

        <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
          {t('footer.copyright', { year: 2024 })}
        </p>
      </div>
    </footer>
  )
}
