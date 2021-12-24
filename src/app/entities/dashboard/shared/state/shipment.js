import { reflectKeys } from '@/app/shared/services'
import ApiClient from '@/app/shared/services/api-client'

/** Initial state */
const initialState = {
  shipments: [],
}

/** Prefix for mutation types and actiontypes */
const namespacedPrefix = '[SHIPMENT]'

export const mutationTypes = reflectKeys([
  'SET_SHIPMENTS',
], namespacedPrefix)

const {
  SET_SHIPMENTS,
} = mutationTypes

const mutations = {
  [SET_SHIPMENTS] (state, payload) {
    state.shipments = payload
  },
}

export const actionsTypes = reflectKeys([
  'LIST',
], namespacedPrefix)

const actions = {
  async [actionsTypes.LIST] ({ commit }) {
    const res = await ApiClient.get('/api/shipment/list')
    commit(SET_SHIPMENTS, res || [])
  },
}

export const gettersTypes = reflectKeys([
  'SHIPMENTS',
], namespacedPrefix)

const getters = {
  [gettersTypes.SHIPMENTS]: state => {
    return state.shipments
  },
}

export default {
  namespaced: true,
  state: initialState,
  getters,
  mutations,
  actions,
}
