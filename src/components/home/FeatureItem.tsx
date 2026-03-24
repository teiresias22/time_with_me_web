import { useTranslation } from 'react-i18next'
import type { Feature } from '../../constants/features'

interface FeatureItemProps {
  feature: Feature
}

export default function FeatureItem({ feature }: FeatureItemProps) {
  const { t } = useTranslation()
  const Icon = feature.icon

  return (
    <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white dark:bg-[#1a1a1a] shadow-sm dark:shadow-none dark:border dark:border-gray-800 hover:shadow-md dark:hover:border-gray-700 transition-all">
      <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-primary-light dark:bg-primary/10 text-primary text-2xl mb-4">
        <Icon />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
        {t(feature.titleKey)}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
        {t(feature.descriptionKey)}
      </p>
    </div>
  )
}
