import Vue from 'vue'
import config from '@/app/shared/config'

const plugin = {
  install (Vue) {
    Vue.prototype.$config = config
  },
}

Vue.use(plugin)
