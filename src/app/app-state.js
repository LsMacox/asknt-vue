import Vue from 'vue'
import Vuex from 'vuex'
import { requireDirectory, requireRecursiveDirectory } from '@/app/shared/services/requester'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const ctxModules = require.context('./entities', true, /state\.js$/)
const ctxApp = require.context('./shared/state', true, /\.js$/)

// it will auto require all vuex module from modules file
const stateModule = requireRecursiveDirectory(ctxModules, 'state')
const stateApp = requireDirectory(ctxApp)

const store = new Vuex.Store({
  plugins: [
    createPersistedState({
      paths: [''],
    }),
  ],
  state: {},
  actions: {},
  modules: { ...stateModule, ...stateApp },
})

export default store
