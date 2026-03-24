import { useTranslation } from 'react-i18next'
import { features } from '../../constants/features'
import FeatureItem from './FeatureItem'

export default function FeatureList() {
  const { t } = useTranslation()

  return (
    <section className="py-16 sm:py-24 bg-gray-50 dark:bg-[#111]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-12">
          {t('features.title')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureItem key={index} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  )
}
