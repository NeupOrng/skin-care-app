import { createI18n } from 'vue-i18n'
import cookieHelper from './cookieHelper'

// name should be same as lang filename, and it is case sensitive.
const langs: Array<string> = [
  'en',
  'km_KH',
  'ko_KR',
  'th_TH'
]

const defaultLang = cookieHelper.getCookie('alanguage') ?? 'en'

const i18n = createI18n({
  fallbackLocale: defaultLang
})

async function importLanguage (language: string) {
  const json = await import(/* webpackChunkName: "i18n/[request]" */ `@/lang/${language}.json`)
  i18n.global.setLocaleMessage(language, json)
}

async function setI18nLanguage (newLang = defaultLang) {
  if (i18n.global.locale === newLang) {
    return
  }

  const hasThisLang = langs.find((lang) => lang === newLang)
  if (!hasThisLang) {
    i18n.global.locale = defaultLang
    return
  }

  const hasImported = Object.prototype.hasOwnProperty.call(i18n.global.messages, newLang)
  if (!hasImported) {
    await importLanguage(newLang)
  }
  i18n.global.locale = newLang
}

importLanguage(defaultLang).then(() => {
  const lang = cookieHelper.getCookie('alanguage')
  setTimeout(() => {
    if (lang) {
      setI18nLanguage(lang)
    } else {
      setI18nLanguage()
    }
  }, process.env.NODE_ENV === 'production' ? 0 : 3000)
})

export default i18n
export const { t } = i18n.global
