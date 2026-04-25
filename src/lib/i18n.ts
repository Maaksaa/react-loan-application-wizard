import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

/**
 * i18n setup.
 *
 * - Two locales for now (en/ru); translation strings inlined to keep the PR
 *   reviewable. If we ever need >2 langs, split into per-locale JSON files
 *   and use i18next-http-backend.
 * - Language is auto-detected from localStorage → navigator, with English as fallback.
 * - We use a single 'translation' namespace because the app is small.
 */

const resources = {
  en: {
    translation: {
      app: {
        title: 'Wiam Group · Test loan application',
      },
      progress: {
        personal: 'Personal',
        address: 'Address',
        loan: 'Loan',
      },
      personal: {
        title: 'Personal data',
        subtitle: 'Tell us a bit about yourself',
        phone: 'Phone',
        firstName: 'First name',
        lastName: 'Last name',
        gender: 'Gender',
        genderPlaceholder: 'Select gender',
        male: 'Male',
        female: 'Female',
      },
      address: {
        title: 'Address & work',
        subtitle: 'Where do you live and work',
        workplace: 'Workplace',
        workplacePlaceholder: 'Select workplace',
        residence: 'Residential address',
        loading: 'Loading workplaces…',
        loadError: 'Failed to load workplaces.',
      },
      loan: {
        title: 'Loan parameters',
        subtitle: 'Choose the amount and term that suit you',
        amount: 'Loan amount',
        term: 'Loan term',
        days: '{{count}} days',
        submitError: 'Submission failed. Please try again.',
      },
      modal: {
        approvedTitle: 'Application approved',
        approvedBody:
          'Congratulations, {{lastName}} {{firstName}}. You are approved for ${{amount}} for {{term}} days.',
        startOver: 'Start over',
      },
      actions: {
        next: 'Next',
        back: 'Back',
        submit: 'Submit application',
        submitting: 'Submitting…',
        retry: 'Try again',
      },
      validation: {
        required: 'This field is required',
        phoneFormat: 'Phone must match 0XXX XXX XXX',
        nameTooLong: 'Too long',
        amountMin: 'Min $200',
        amountMax: 'Max $1000',
        amountStep: 'Step is $100',
        termMin: 'Min 10 days',
        termMax: 'Max 30 days',
        termInt: 'Whole days only',
      },
    },
  },
  ru: {
    translation: {
      app: {
        title: 'Wiam Group · Тестовая заявка на займ',
      },
      progress: {
        personal: 'Данные',
        address: 'Адрес',
        loan: 'Займ',
      },
      personal: {
        title: 'Личные данные',
        subtitle: 'Расскажите немного о себе',
        phone: 'Телефон',
        firstName: 'Имя',
        lastName: 'Фамилия',
        gender: 'Пол',
        genderPlaceholder: 'Выберите пол',
        male: 'Мужской',
        female: 'Женский',
      },
      address: {
        title: 'Адрес и место работы',
        subtitle: 'Где вы живёте и работаете',
        workplace: 'Место работы',
        workplacePlaceholder: 'Выберите место работы',
        residence: 'Адрес проживания',
        loading: 'Загрузка списка…',
        loadError: 'Не удалось загрузить список.',
      },
      loan: {
        title: 'Параметры займа',
        subtitle: 'Выберите подходящие сумму и срок',
        amount: 'Сумма займа',
        term: 'Срок займа',
        days: '{{count}} дн.',
        submitError: 'Не удалось отправить заявку. Попробуйте ещё раз.',
      },
      modal: {
        approvedTitle: 'Заявка одобрена',
        approvedBody:
          'Поздравляем, {{lastName}} {{firstName}}. Вам одобрена сумма ${{amount}} на {{term}} дней.',
        startOver: 'Начать заново',
      },
      actions: {
        next: 'Далее',
        back: 'Назад',
        submit: 'Подать заявку',
        submitting: 'Отправка…',
        retry: 'Повторить',
      },
      validation: {
        required: 'Поле обязательно',
        phoneFormat: 'Формат: 0XXX XXX XXX',
        nameTooLong: 'Слишком длинно',
        amountMin: 'Минимум $200',
        amountMax: 'Максимум $1000',
        amountStep: 'Шаг $100',
        termMin: 'Минимум 10 дней',
        termMax: 'Максимум 30 дней',
        termInt: 'Только целые дни',
      },
    },
  },
} as const

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'ru'],
    interpolation: {
      // React already escapes by default — i18next's own escaping would double-escape.
      escapeValue: false,
    },
    detection: {
      // Persist user choice across sessions, prefer it over browser language.
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  })

export default i18n
