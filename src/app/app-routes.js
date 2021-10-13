import Vue from 'vue'
import VueRouter from 'vue-router'
import { apiBaseUrl } from '@/environment'
import { _ } from 'vue-underscore'
import { requireDirectory } from '@/app/shared/services/require-modules'

Vue.use(VueRouter)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const ctxModules = require.context('./entities', true, /routes\.js$/)

// it will auto require all vuex module from modules file
const routeModules = requireDirectory(ctxModules, 'routes')

const routes = [
].concat(_.values(routeModules))

const router = new VueRouter({
  mode: 'history',
  base: apiBaseUrl,
  routes,
})

export default router
