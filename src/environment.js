const { VUE_APP_BASE_URL, NODE_ENV, VUE_APP_VERSION, VUE_APP_NAME, VUE_APP_I18N_LOCALE, VUE_APP_I18N_FALLBACK_LOCALE } = process.env

const environment = NODE_ENV.toLowerCase()
const appBaseUrl = VUE_APP_BASE_URL
const appName = VUE_APP_NAME
const appVersion = VUE_APP_VERSION
const i18nLocale = VUE_APP_I18N_LOCALE
const i18nFallbackLocale = VUE_APP_I18N_FALLBACK_LOCALE

export { environment, appBaseUrl, appName, appVersion, i18nLocale, i18nFallbackLocale }
