import { reflectKeys } from '@/app/shared/services'
import ApiClient from '@/app/shared/services/api-client'

/** Initial state */
const initialState = {
  violations: [],
}

/** Prefix for mutation types and actiontypes */
const namespacedPrefix = '[VIOLATION]'

export const mutationTypes = reflectKeys([
  'SET_VIOLATIONS',
], namespacedPrefix)

const {
  SET_VIOLATIONS,
  REMOVE_VIOLATION_BY_ID,
} = mutationTypes

const mutations = {
  [SET_VIOLATIONS] (state, payload) {
    state.violations = payload
  },
  [REMOVE_VIOLATION_BY_ID] (state, id) {
    state.violations = state.violations.filter(v => {
      return v.id !== id
    })
  },
}

export const actionsTypes = reflectKeys([
  'LIST',
  'REPAID',
], namespacedPrefix)

const actions = {
  async [actionsTypes.LIST] ({ commit }, shipmentId) {
    const res = await ApiClient.get('/api/violation/list/' + shipmentId)
    commit(SET_VIOLATIONS, res || [])
  },
  async [actionsTypes.REPAID] ({ commit }, { id, repaidDescription }) {
    try {
      await ApiClient.post('/api/violation/repaid', { id, repaid_description: repaidDescription })
      commit(REMOVE_VIOLATION_BY_ID, id)
    } catch (err) {
      console.log(err)
    }
  },
}

export const gettersTypes = reflectKeys([
  'VIOLATIONS',
], namespacedPrefix)

const getters = {
  [gettersTypes.VIOLATIONS]: state => {
    return state.violations
  },
}

export default {
  namespaced: true,
  state: initialState,
  getters,
  mutations,
  actions,
}
