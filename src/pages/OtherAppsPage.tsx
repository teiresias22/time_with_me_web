import { useTranslation } from 'react-i18next'

interface AppInfo {
  id: string
  name: string
  tagline: string
  description: string
  icon: string
  websiteUrl: string
  appStoreUrl: string
  playStoreUrl: string
}

const DEVELOPER_APPS: AppInfo[] = [
  {
    id: 'yeowun',
    name: 'Yeowun (여운)',
    tagline: 'AI 여행 지도 다이어리',
    description: '사진만 올리면 AI가 자동으로 여행 경로를 완성합니다. 도시 뱃지 수집, 친구와 지도 공유.',
    icon: 'https://trace-line-7fc12.web.app/logo.png',
    websiteUrl: 'https://trace-line-7fc12.web.app',
    appStoreUrl: 'https://apps.apple.com/app/id6759911276',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.traceline.joon.trace_line',
  },
  {
    id: 'colorofdays',
    name: 'Color of Days',
    tagline: '하루를 색으로 기록하는 무드 다이어리',
    description: '매일의 감정을 색으로 표현하고 캘린더에 채워나가는 나만의 무드 트래커.',
    icon: 'https://color-of-days.web.app/assets/appicon.png',
    websiteUrl: 'https://color-of-days.web.app',
    appStoreUrl: 'https://apps.apple.com/app/id6443436725',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.colorofdays.color_of_days',
  },
  {
    id: 'gilmok',
    name: 'Gilmok (길목)',
    tagline: '나만의 장소를 기록하는 커뮤니티 지도',
    description: '숨겨진 장소를 지도에 기록하고 다른 여행자와 공유하는 커뮤니티 지도 서비스.',
    icon: 'https://way-archive.web.app/logo.png',
    websiteUrl: 'https://way-archive.web.app',
    appStoreUrl: 'https://apps.apple.com/app/id6761645899',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.wayArchive.joonhwan.way_archive',
  },
  {
    id: 'timewithme',
    name: 'Time with Me',
    tagline: '소중한 사람과 함께 쓰는 공유 캘린더',
    description: '연인·가족과 일정을 공유하고 소통하는 커플/패밀리 캘린더 앱.',
    icon: 'https://time-with-me-745b5.web.app/assets/appicon.png',
    websiteUrl: 'https://time-with-me-745b5.web.app',
    appStoreUrl: 'https://apps.apple.com/app/id6705135769',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.joonhwan.timewithme.time_with_me',
  },
]

const CURRENT_APP_ID = 'timewithme'

export default function OtherAppsPage() {
  const { t } = useTranslation()

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-3">
          {t('otherApps.title')}
        </h1>
        <p className="text-base text-gray-500 dark:text-gray-400">
          {t('otherApps.subtitle')}
        </p>
      </div>

      <div className="flex flex-col gap-5">
        {DEVELOPER_APPS.map((app) => {
          const isCurrent = app.id === CURRENT_APP_ID
          return (
            <div
              key={app.id}
              className={`relative rounded-2xl border p-6 transition-shadow hover:shadow-md ${
                isCurrent
                  ? 'border-primary/40 bg-blue-50/60 dark:bg-primary/10'
                  : 'border-gray-200 dark:border-[#222] bg-white dark:bg-[#1a1a1a]'
              }`}
            >
              {isCurrent && (
                <span className="absolute top-4 right-4 text-xs font-semibold px-2.5 py-1 rounded-full bg-primary text-white">
                  {t('otherApps.currentApp')}
                </span>
              )}

              <div className="flex gap-4">
                <img
                  src={app.icon}
                  alt={app.name}
                  className="w-16 h-16 rounded-2xl shadow-md flex-shrink-0 object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-0.5">
                    {app.name}
                  </h2>
                  <p className="text-sm font-medium text-primary mb-2">{app.tagline}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    {app.description}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-3 items-center">
                <a href={app.appStoreUrl} target="_blank" rel="noopener noreferrer">
                  <img
                    src="/assets/appstore.png"
                    alt="App Store"
                    className="h-9 object-contain"
                  />
                </a>
                <a href={app.playStoreUrl} target="_blank" rel="noopener noreferrer">
                  <img
                    src="/assets/playstore.png"
                    alt="Google Play"
                    className="h-9 object-contain"
                  />
                </a>
                {!isCurrent && (
                  <a
                    href={app.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto text-sm font-medium text-primary hover:opacity-80 transition-opacity no-underline"
                  >
                    {t('otherApps.visitWebsite')} →
                  </a>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
