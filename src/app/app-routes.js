import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/app/layouts/Home.vue'
import About from '@/app/layouts/About.vue'
import { apiBaseUrl } from '@/environment'
import { _ } from 'vue-underscore'

Vue.use(VueRouter)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./entities', true, /routes\.js$/)

// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1').replace(/\/?routes$/, '')
  const value = modulesFiles(modulePath)

  if (value.default) modules[moduleName] = value.default

  return modules
}, {})

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: About,
  },
].concat(_.values(modules))

const router = new VueRouter({
  mode: 'history',
  base: apiBaseUrl,
  routes,
})

export default router
