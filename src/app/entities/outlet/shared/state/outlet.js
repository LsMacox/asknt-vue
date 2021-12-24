import { reflectKeys, objToUrlParam } from '@/app/shared/services'
import ApiClient from '@/app/shared/services/api-client'
import VueMain from '@/main'

/** Initial state */
const initialState = {
  outlets: [],
  outletsTotal: 0,
}

/** Prefix for mutation types and actiontypes */
const namespacedPrefix = '[OUTLET]'

export const mutationTypes = reflectKeys([
  'SET_OUTLETS',
  'SET_OUTLETS_TOTAL',
  'ADD_OUTLET',
  'UPDATE_OUTLET',
  'REMOVE_OUTLET_BY_ID',
], namespacedPrefix)

const {
  SET_OUTLETS,
  SET_OUTLETS_TOTAL,
  ADD_OUTLET,
  UPDATE_OUTLET,
  REMOVE_OUTLET_BY_ID,
} = mutationTypes

const mutations = {
  [SET_OUTLETS] (state, payload) {
    state.outlets = payload
  },
  [SET_OUTLETS_TOTAL] (state, payload) {
    state.outletsTotal = payload
  },
  [ADD_OUTLET] (state, payload) {
    state.outlets.push(payload)
  },
  [UPDATE_OUTLET] (state, { id, payload }) {
    const idx = state.outlets.findIndex(el => el.id === id)
    state.outlets[idx] = payload
    state.outlets = Object.assign([], state.outlets)
  },
  [REMOVE_OUTLET_BY_ID] (state, id) {
    state.outlets = state.outlets.filter(el => {
      return el.id !== id
    })
  },
}

export const actionsTypes = reflectKeys([
  'LIST',
  'CREATE',
  'UPDATE',
  'DELETE',
], namespacedPrefix)

const actions = {
  async [actionsTypes.LIST] ({ commit }, params) {
    const res = await ApiClient.get('/api/retail-outlets/list?' + objToUrlParam(params))

    commit(SET_OUTLETS, res.items)
    commit(SET_OUTLETS_TOTAL, res.total)
  },
  async [actionsTypes.CREATE] ({ commit, state }, data) {
    const res = await ApiClient.post('/api/retail-outlets/create', data)

    if (res) {
      // commit(ADD_OUTLET, res)
      // commit(SET_OUTLETS_TOTAL, state.outletsTotal + 1)
      VueMain.$notify({
        type: 'success',
        title: 'Торговая точка',
        text: 'Торговая точка создана!',
      })
    }
  },
  async [actionsTypes.UPDATE] ({ commit }, data) {
    const res = await ApiClient.patch('/api/retail-outlets/update/' + data.id, data)

    if (res) {
      commit(UPDATE_OUTLET, { id: res.id, payload: res })
      VueMain.$notify({
        type: 'success',
        title: 'Торговая точка',
        text: 'Торговая точка обновлена!',
      })
    }
  },
  async [actionsTypes.DELETE] ({ commit, state }, id) {
    try {
      await ApiClient.delete('/api/retail-outlets/delete/' + id)

      // commit(REMOVE_OUTLET_BY_ID, id)
      // commit(SET_OUTLETS_TOTAL, state.outletsTotal - 1)
      VueMain.$notify({
        type: 'success',
        title: 'Торговая точка',
        text: 'Торговая точка удалена!',
      })
    } catch (err) {
      VueMain.$notify({
        type: 'error',
        title: 'Торговая точка',
        text: 'Ошибка при удалении!',
      })
    }
  },
}

export const gettersTypes = reflectKeys([
  'OUTLETS',
  'OUTLETS_TOTAL',
], namespacedPrefix)

const getters = {
  [gettersTypes.OUTLETS]: state => {
    return state.outlets
  },
  [gettersTypes.OUTLETS_TOTAL]: state => {
    return state.outletsTotal
  },
}

export default {
  namespaced: true,
  state: initialState,
  getters,
  mutations,
  actions,
}
