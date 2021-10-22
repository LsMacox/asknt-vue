import { reflectKeys } from '@/app/shared/services'
import { session } from '@/plugins/session'
import { mutationTypes as authMutationTypes } from '@/app/entities/auth/shared/state/auth'

/** Initial state */
const initialState = {
  loading: false,
}

/** Prefix for mutation types and actiontypes */
const namespacedPrefix = '[APP]'

export const mutationTypes = reflectKeys([
  'SET_LOADING',
], namespacedPrefix)

const {
  SET_LOADING,
} = mutationTypes

const mutations = {
  [SET_LOADING] (state, payload) {
    state.loading = payload
  },
}

export const actionsTypes = reflectKeys([
  'INIT_APP',
], namespacedPrefix)

const actions = {
  [actionsTypes.INIT_APP] ({ commit }) {
    if (session.exists() && session.get('access_token')) {
      commit('auth/auth/' + authMutationTypes.SET_LOGGED_IN, true, { root: true })
    }
  },
}

export default {
  namespaced: true,
  state: initialState,
  mutations,
  actions,
}
