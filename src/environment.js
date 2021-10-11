const { VUE_APP_BASE_URL, NODE_ENV, VUE_APP_VERSION, VUE_APP_NAME } = process.env

const environment = NODE_ENV.toLowerCase()
const appBaseUrl = VUE_APP_BASE_URL
const appName = VUE_APP_NAME
const appVersion = VUE_APP_VERSION

export { environment, appBaseUrl, appName, appVersion }
