import Vue from 'vue'
import { installComponents } from './app/shared/services/requester'
/** App */
import App from './app/App.vue'
import router from './app/app-routes'
import store from './app/app-state'
/** Plugins */
import vuetify from './plugins/vuetify'
import i18n from './plugins/i18n'
require('./plugins/underscore')
require('./plugins/config')
require('./plugins/session')
require('./plugins/moment')
require('./plugins/progressbar')
require('./plugins/notification')
require('./plugins/vuex-wait')

// Подключючение всех компонентов из папки app/shared/components/base с префиксом base
installComponents(
  require.context(
  '@/app/shared/components/base', true, /\.(vue|js)$/,
  ), 'base',
)

/** Layouts */
Vue.component('auth-layout', () => import('@/app/layouts/auth'))
Vue.component('cabinet-layout', () => import('@/app/layouts/cabinet'))

Vue.config.productionTip = false

export default new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: (h) => h(App),
}).$mount('#app')
