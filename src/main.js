import Vue from 'vue'
/** App */
import App from './app/App.vue'
import router from './app/app-routes'
import store from './app/app-state'
/** Plugins */
import vuetify from './plugins/vuetify'
require('./plugins/underscore')
require('./plugins/config')

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app')
