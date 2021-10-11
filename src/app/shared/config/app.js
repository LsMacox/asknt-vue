import { environment, apiBaseUrl, appName, appVersion } from '@/environment'

module.exports = Object.freeze({
  title: 'ASKNT HPACE',
  name: appName || 'pluscards-cabinet',
  build: 301,
  version: appVersion,
  env: environment,
  apiHost: apiBaseUrl || 'http://127.0.0.1:8000',
})
