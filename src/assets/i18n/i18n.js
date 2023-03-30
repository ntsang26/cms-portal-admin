import i18n from 'i18next'
import detector from 'i18next-browser-languagedetector'
// import { initReactI18next } from 'react-i18next'

import translationEN from './en.json'
import translationVI from './vi.json'

// the translations
const resources = {
  en: {
    translation: translationEN,
  },
  vi: {
    translation: translationVI,
  },
}

i18n
  .use(detector)
  // .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en', // use en if detected lng is not available

    keySeparator: ".", // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  })

export default i18n
