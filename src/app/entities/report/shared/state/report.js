import { reflectKeys } from '@/app/shared/services'
import ApiClient from '@/app/shared/services/api-client'

/** Initial state */
const initialState = {
  reports: [],
}

/** Prefix for mutation types and actiontypes */
const namespacedPrefix = '[REPORT]'

export const mutationTypes = reflectKeys([
  'SET_REPORTS',
], namespacedPrefix)

const {
  SET_REPORTS,
} = mutationTypes

const mutations = {
  [SET_REPORTS] (state, payload) {
    state.reports = payload
  },
}

export const actionsTypes = reflectKeys([
  'LIST',
], namespacedPrefix)

const actions = {
  async [actionsTypes.LIST] ({ commit }, payload) {
    const res = await ApiClient.post('/api/report/list', payload)
    commit(SET_REPORTS, res || [])
  },
}

export const gettersTypes = reflectKeys([
  'REPORTS',
], namespacedPrefix)

const getters = {
  [gettersTypes.REPORTS]: state => {
    return state.reports
  },
}

export default {
  namespaced: true,
  state: initialState,
  getters,
  mutations,
  actions,
}
