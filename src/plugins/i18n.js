import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { i18nLocale, i18nFallbackLocale } from '@/environment'

import en from 'vuetify/lib/locale/en'
import ru from 'vuetify/lib/locale/ru'

Vue.use(VueI18n)

const messages = {
  en: {
    $vuetify: en,
  },
  ru: {
    ...require('@/assets/locales/ru.json'),
    validation: { ...require('@/assets/locales/ru/validation.json') },
    $vuetify: ru,
  },
}

export default new VueI18n({
  locale: i18nLocale,
  fallbackLocale: i18nFallbackLocale,
  messages,
})
