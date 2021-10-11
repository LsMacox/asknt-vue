import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./entities', true, /state\.js$/)

// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1').replace(/\/?state$/, '')
  const value = modulesFiles(modulePath)

  if (value.default) {
    Object.keys(value.default).forEach(name => {
      modules[moduleName + '/' + name] = value.default[name]
    })
  }
  return modules
}, {})

const store = new Vuex.Store({
  state: {},
  actions: {},
  modules,
})

export default store
