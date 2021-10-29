import { environment, apiBaseUrl, appName, appVersion } from '@/environment'

module.exports = Object.freeze({
  title: 'ASKNT HPACE',
  name: appName,
  build: 301,
  version: appVersion,
  env: environment,
  apiHost: apiBaseUrl,
})
