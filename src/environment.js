const {
  VUE_APP_BASE_URL,
  NODE_ENV,
  VUE_APP_VERSION,
  VUE_APP_NAME,
  VUE_APP_I18N_LOCALE,
  VUE_APP_I18N_FALLBACK_LOCALE,
  VUE_APP_YANDEX_MAP_API_KEY,
} = process.env

const environment = NODE_ENV.toLowerCase()
const appBaseUrl = VUE_APP_BASE_URL || 'http://127.0.0.1:8000'
const appName = VUE_APP_NAME || 'ASKNT'
const appVersion = VUE_APP_VERSION || '0.1.0'
const i18nLocale = VUE_APP_I18N_LOCALE || 'en'
const i18nFallbackLocale = VUE_APP_I18N_FALLBACK_LOCALE || 'en'
const yandexMapApiKey = VUE_APP_YANDEX_MAP_API_KEY || ''

export {
  environment,
  appBaseUrl,
  appName,
  appVersion,
  i18nLocale,
  i18nFallbackLocale,
  yandexMapApiKey,
}
