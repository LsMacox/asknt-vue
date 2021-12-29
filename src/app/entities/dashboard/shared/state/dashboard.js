import { reflectKeys } from '@/app/shared/services'
import ApiClient from '@/app/shared/services/api-client'

/** Initial state */
const initialState = {
  transports: [],
  transportsTotal: 0,
}

/** Prefix for mutation types and actiontypes */
const namespacedPrefix = '[DASHBOARD]'

export const mutationTypes = reflectKeys([
  'SET_TRANSPORTS',
  'SET_TRANSPORTS_TOTAL',
], namespacedPrefix)

const {
  SET_TRANSPORTS,
  SET_TRANSPORTS_TOTAL,
} = mutationTypes

const mutations = {
  [SET_TRANSPORTS] (state, payload) {
    state.transports = payload
  },
  [SET_TRANSPORTS_TOTAL] (state, payload) {
    state.transportsTotal = payload
  },
}

export const actionsTypes = reflectKeys([
  'LIST',
], namespacedPrefix)

const actions = {
  async [actionsTypes.LIST] ({ commit }, payload) {
    const res = await ApiClient.post('/api/dashboard/list', payload)

    commit(SET_TRANSPORTS, res?.items || [])
    commit(SET_TRANSPORTS_TOTAL, res?.total || 0)
  },
}

export const gettersTypes = reflectKeys([
  'TRANSPORTS',
  'TRANSPORTS_TOTAL',
], namespacedPrefix)

const getters = {
  [gettersTypes.TRANSPORTS]: state => {
    return state.transports
  },
  [gettersTypes.TRANSPORTS_TOTAL]: state => {
    return state.transportsTotal
  },
}

export default {
  namespaced: true,
  state: initialState,
  getters,
  mutations,
  actions,
}
