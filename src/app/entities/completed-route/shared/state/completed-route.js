import { reflectKeys } from '@/app/shared/services'
import ApiClient from '@/app/shared/services/api-client'

/** Initial state */
const initialState = {
  completedRoutes: [],
  completedRoutesTotal: 0,
}

/** Prefix for mutation types and actiontypes */
const namespacedPrefix = '[COMPLETED ROUTE]'

export const mutationTypes = reflectKeys([
  'SET_COMPLETED_ROUTES',
  'SET_COMPLETED_ROUTES_TOTAL',
], namespacedPrefix)

const {
  SET_COMPLETED_ROUTES,
  SET_COMPLETED_ROUTES_TOTAL,
} = mutationTypes

const mutations = {
  [SET_COMPLETED_ROUTES] (state, payload) {
    state.completedRoutes = payload
  },
  [SET_COMPLETED_ROUTES_TOTAL] (state, payload) {
    state.completedRoutesTotal = payload
  },
}

export const actionsTypes = reflectKeys([
  'LIST',
  'DOWNLOAD_FILES',
], namespacedPrefix)

const actions = {
  async [actionsTypes.LIST] ({ commit }, payload) {
    const res = await ApiClient.post('/api/completed-routes/list', payload)

    commit(SET_COMPLETED_ROUTES, res?.items || [])
    commit(SET_COMPLETED_ROUTES_TOTAL, res?.total || 0)
  },
  async [actionsTypes.DOWNLOAD_FILES] ({ commit }, payload) {
    await ApiClient.downloadFile('/api/completed-routes/download-files/' + payload.item.shipment_id, {}, 'get', 'asknt-files_' +
      this._vm.$moment(payload.item.created_at).utc().format('DD.MM.YYYY') + '_' + payload.item.shipment_id + '.zip')
  },
}

export const gettersTypes = reflectKeys([
  'COMPLETED_ROUTES',
  'COMPLETED_ROUTES_TOTAL',
], namespacedPrefix)

const getters = {
  [gettersTypes.COMPLETED_ROUTES]: state => {
    return state.completedRoutes
  },
  [gettersTypes.COMPLETED_ROUTES_TOTAL]: state => {
    return state.completedRoutesTotal
  },
}

export default {
  namespaced: true,
  state: initialState,
  getters,
  mutations,
  actions,
}
