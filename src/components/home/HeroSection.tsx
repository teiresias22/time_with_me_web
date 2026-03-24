import { useTranslation } from 'react-i18next'
import DownloadButtons from './DownloadButtons'

export default function HeroSection() {
  const { t } = useTranslation()

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* App Info */}
          <div className="flex-1 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
              <img
                src="/assets/appicon.png"
                alt={t('app.name')}
                className="w-20 h-20 rounded-2xl shadow-lg"
              />
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100">
                  {t('app.name')}
                </h1>
                <span className="inline-block mt-1 px-3 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-medium rounded-full">
                  {t('hero.free')}
                </span>
              </div>
            </div>

            <p className="text-xl sm:text-2xl text-gray-700 dark:text-gray-300 font-medium mb-4">
              {t('app.tagline')}
            </p>
            <p className="text-base text-gray-500 dark:text-gray-400 mb-8 max-w-lg mx-auto lg:mx-0">
              {t('app.description')}
            </p>

            <div className="flex justify-center lg:justify-start">
              <DownloadButtons />
            </div>
          </div>

          {/* Device Mockup */}
          <div className="flex-shrink-0">
            <div className="w-[240px] sm:w-[280px] rounded-[2.5rem] overflow-hidden shadow-2xl border-[8px] border-gray-900 dark:border-gray-200 bg-black">
              <div className="relative aspect-[9/19.5]">
                <img
                  src="/assets/screenshot/screenshot.jpg"
                  alt="App screenshot"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
