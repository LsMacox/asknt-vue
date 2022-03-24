import { reflectKeys } from '@/app/shared/services'
import ApiClient from '@/app/shared/services/api-client'

/** Initial state */
const initialState = {
  report: {},
}

/** Prefix for mutation types and actiontypes */
const namespacedPrefix = '[REPORT]'

export const mutationTypes = reflectKeys([
  'SET_REPORT',
], namespacedPrefix)

const {
  SET_REPORT,
} = mutationTypes

const mutations = {
  [SET_REPORT] (state, payload) {
    state.report = payload
  },
}

export const actionsTypes = reflectKeys([
  'LIST',
  'DOWNLOAD',
], namespacedPrefix)

const actions = {
  async [actionsTypes.LIST] ({ commit }, payload) {
    const res = await ApiClient.post('/api/report/list', payload)
    commit(SET_REPORT, res || {})
  },
  async [actionsTypes.DOWNLOAD] ({ getters }, payload) {
    if (Object.keys(payload.filter).length === 0) payload = {}
    await ApiClient.downloadFile('/api/report/download', payload, 'get', 'asknt-report_' +
      this._vm.$moment(getters['[REPORT] REPORT'].start_date).utc().format('DD.MM.YYYY') + '-' +
      this._vm.$moment(getters['[REPORT] REPORT'].end_date).utc().format('DD.MM.YYYY') + '.xls')
  },
}

export const gettersTypes = reflectKeys([
  'REPORT',
], namespacedPrefix)

const getters = {
  [gettersTypes.REPORT]: state => {
    return state.report
  },
}

export default {
  namespaced: true,
  state: initialState,
  getters,
  mutations,
  actions,
}
