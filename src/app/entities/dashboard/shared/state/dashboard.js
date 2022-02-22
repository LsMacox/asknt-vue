import { reflectKeys } from '@/app/shared/services'
import ApiClient from '@/app/shared/services/api-client'

/** Initial state */
const initialState = {
  transports: [],
  transportsTotal: 0,
  detailByShipment: {},
}

/** Prefix for mutation types and actiontypes */
const namespacedPrefix = '[DASHBOARD]'

export const mutationTypes = reflectKeys([
  'SET_TRANSPORTS',
  'SET_TRANSPORTS_TOTAL',
  'SET_DETAIL_BY_SHIPMENT',
  'SET_TRANSPORT_VIOLATIONS',
], namespacedPrefix)

const {
  SET_TRANSPORTS,
  SET_TRANSPORTS_TOTAL,
  SET_DETAIL_BY_SHIPMENT,
  SET_TRANSPORT_VIOLATIONS,
} = mutationTypes

const mutations = {
  [SET_TRANSPORTS] (state, payload) {
    state.transports = payload
  },
  [SET_TRANSPORTS_TOTAL] (state, payload) {
    state.transportsTotal = payload
  },
  [SET_DETAIL_BY_SHIPMENT] (state, payload) {
    state.detailByShipment = payload
  },
  [SET_TRANSPORT_VIOLATIONS] (state, { id, payload }) {
    const idx = state.transports.findIndex(tr => tr.id === id)
    state.transports[idx].violations = payload
    state.transports = Object.assign([], state.transports)
  },
}

export const actionsTypes = reflectKeys([
  'LIST',
  'DETAIL_BY_SHIPMENT',
], namespacedPrefix)

const actions = {
  async [actionsTypes.LIST] ({ commit }, payload) {
    const res = await ApiClient.post('/api/dashboard/list', payload)

    commit(SET_TRANSPORTS, res?.items || [])
    commit(SET_TRANSPORTS_TOTAL, res?.total || 0)
  },
  async [actionsTypes.DETAIL_BY_SHIPMENT] ({ commit }, id) {
    const res = await ApiClient.get('/api/dashboard/detail-by-shipment/' + id)

    commit(SET_DETAIL_BY_SHIPMENT, res || {})
  },
}

export const gettersTypes = reflectKeys([
  'TRANSPORTS',
  'TRANSPORTS_TOTAL',
  'DETAIL_BY_SHIPMENT_ID',
  'TRANSPORT_VIOLATIONS',
], namespacedPrefix)

const getters = {
  [gettersTypes.TRANSPORTS]: state => {
    return state.transports
  },
  [gettersTypes.TRANSPORTS_TOTAL]: state => {
    return state.transportsTotal
  },
  [gettersTypes.DETAIL_BY_SHIPMENT]: state => {
    return state.detailByShipment
  },
  [gettersTypes.TRANSPORT_VIOLATIONS] (state) {
    return function (id) {
      return state.transports.find(tr => tr.id === id).violations
    }
  },
}

export default {
  namespaced: true,
  state: initialState,
  getters,
  mutations,
  actions,
}
