import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '../common/LanguageSwitcher'
import DarkModeToggle from '../common/DarkModeToggle'

export default function Header() {
  const { t } = useTranslation()

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-[#0a0a0a]/85 backdrop-blur-md border-b border-gray-100 dark:border-white/[0.08]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5 no-underline">
            <img src="/assets/appicon.png" alt="Time with Me" className="w-9 h-9 rounded-lg" />
            <span className="font-semibold text-gray-900 dark:text-gray-100 text-lg">{t('app.name')}</span>
          </Link>

          <div className="flex items-center gap-1">
            <LanguageSwitcher />
            <DarkModeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
