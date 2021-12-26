import { reflectKeys } from '@/app/shared/services'
import ApiClient from '@/app/shared/services/api-client'
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import { session } from '@/plugins/session'
import router from '@/app/app-routes'

let visitorId = null;

(async () => {
  const fpPromise = FingerprintJS.load()
  const fp = await fpPromise
  const fpRes = await fp.get()
  return fpRes.visitorId
})().then((visId) => { visitorId = visId })
/** Initial state */
const initialState = {
  isLoggedIn: false,
  device: null,
  userRole: null,
}

/** Prefix for mutation types and actiontypes */
const namespacedPrefix = '[AUTH]'

export const mutationTypes = reflectKeys([
  'SET_AUTH',
  'SET_DEVICE',
  'SET_LOGGED_IN',
  'SET_USER_ROLE',
], namespacedPrefix)

const {
  SET_AUTH,
  SET_DEVICE,
  SET_LOGGED_IN,
  SET_USER_ROLE,
} = mutationTypes

const mutations = {
  /** user data request */
  [SET_AUTH] (state, payload) {
    session.destroy()
    if (payload) {
      session.start()
      session.set('access_token', payload)
      state.isLoggedIn = true
    } else {
      state.isLoggedIn = false
    }
  },
  [SET_DEVICE] (state, payload) {
    state.device = payload
  },
  [SET_LOGGED_IN] (state, payload) {
    state.isLoggedIn = payload
  },
  [SET_USER_ROLE] (state, payload) {
    state.userRole = payload
  },
}

export const actionsTypes = reflectKeys([
  'LOGIN',
  'LOGOUT',
  'USER_ROLE',
], namespacedPrefix)

const actions = {
  /** fetch user data */
  async [actionsTypes.LOGIN] ({ commit }, authCred) {
    await ApiClient.get('/sanctum/csrf-cookie')
    const token = await ApiClient.post('api/login', { ...authCred, device_name: visitorId })

    if (token) {
      commit(SET_AUTH, token)
      commit(SET_DEVICE, {
        id: visitorId,
        type: 'web',
      })
    }
  },
  async [actionsTypes.LOGOUT] ({ commit }) {
    commit(SET_AUTH, null)
    commit(SET_DEVICE, null)
    commit(SET_USER_ROLE, null)
    router.push({ name: 'authLogin' })
  },
  async [actionsTypes.USER_ROLE] ({ commit }) {
    const role = await ApiClient.get('api/user-role')
    commit(SET_USER_ROLE, role)
  },
}

export const gettersTypes = reflectKeys([
  'USER_ROLE',
], namespacedPrefix)

const getters = {
  [gettersTypes.USER_ROLE]: state => {
    return state.userRole
  },
}

export default {
  namespaced: true,
  state: initialState,
  mutations,
  getters,
  actions,
}
