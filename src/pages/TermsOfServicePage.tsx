import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

export default function TermsOfServicePage() {
  const { t } = useTranslation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const content = t('terms.content')
  const sections = content.split('\n\n')

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">{t('terms.title')}</h1>
      <p className="text-sm text-gray-400 dark:text-gray-500 mb-10">{t('terms.lastUpdated')}</p>

      <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
        {sections.map((section, i) => {
          if (section.startsWith('## ')) {
            return (
              <h2 key={i} className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-10 mb-4">
                {section.replace('## ', '')}
              </h2>
            )
          }
          if (section.startsWith('- ') || section.includes('\n   - ')) {
            const items = section.split('\n').filter(l => l.trim().startsWith('-'))
            return (
              <ul key={i} className="list-disc pl-6 space-y-1">
                {items.map((item, j) => <li key={j}>{item.replace(/^\s*-\s*/, '')}</li>)}
              </ul>
            )
          }
          if (section.match(/^\d\./)) {
            const items = section.split('\n').filter(l => l.match(/^\d\./))
            return (
              <ol key={i} className="list-decimal pl-6 space-y-1">
                {items.map((item, j) => <li key={j}>{item.replace(/^\d\.\s*/, '')}</li>)}
              </ol>
            )
          }
          return <p key={i}>{section}</p>
        })}
      </div>
    </div>
  )
}
