import Vue from 'vue'
import VueRouter from 'vue-router'
import { apiBaseUrl, environment } from '@/environment'
import { _ } from 'vue-underscore'
import { requireDirectory } from '@/app/shared/services/requester'

// Components
import UI from '@/app/shared/components/Ui'
// Hooks
import HookAuth from '@/app/shared/router-hooks/hook-auth'

Vue.use(VueRouter)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const ctxModules = require.context('./entities', true, /routes\.js$/)

// it will auto require all vuex module from modules file
const routeModules = requireDirectory(ctxModules, 'routes')

const devRoutes = [
  {
    path: '/ui',
    component: UI,
  },
]

let routes = [
  {
    path: '/',
    redirect: { name: 'dashboardMain' },
  },
].concat(_.values(routeModules).map(r => r[0]))

if (environment === 'development') {
  routes = routes.concat(devRoutes)
}

const router = new VueRouter({
  mode: 'history',
  base: apiBaseUrl,
  routes,
})

HookAuth(router)

export default router
