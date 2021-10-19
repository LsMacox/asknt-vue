import Vue from 'vue'
import { installComponents } from './app/shared/services/requester'
/** App */
import App from './app/App.vue'
import router from './app/app-routes'
import store from './app/app-state'
/** Plugins */
import vuetify from './plugins/vuetify'
require('./plugins/underscore')
require('./plugins/config')
require('./plugins/session')
require('./plugins/moment')

// Подключючение всех компонентов из папки app/shared/components/base с префиксом base
installComponents(
  require.context(
  '@/app/shared/components/base', true, /\.(vue|js)$/,
  ), 'base',
)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app')
