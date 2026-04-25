import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/cn'

const langs = [
  { code: 'en', label: 'EN' },
  { code: 'ru', label: 'RU' },
] as const

export function LanguageSwitcher() {
  const { i18n } = useTranslation()

  return (
    <div className="flex items-center gap-1 rounded-md border border-slate-200 bg-white p-0.5">
      {langs.map((lang) => {
        const active = i18n.resolvedLanguage === lang.code
        return (
          <button
            key={lang.code}
            type="button"
            onClick={() => i18n.changeLanguage(lang.code)}
            className={cn(
              'rounded px-2 py-1 text-xs font-medium transition',
              active ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900',
            )}
            aria-pressed={active}
          >
            {lang.label}
          </button>
        )
      })}
    </div>
  )
}
