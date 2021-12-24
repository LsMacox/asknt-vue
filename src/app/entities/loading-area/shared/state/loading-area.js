import { reflectKeys, objToUrlParam } from '@/app/shared/services'
import ApiClient from '@/app/shared/services/api-client'
import VueMain from '@/main'

/** Initial state */
const initialState = {
  loadingarea: [],
  loadingareaTotal: 0,
}

/** Prefix for mutation types and actiontypes */
const namespacedPrefix = '[LOADINGAREA]'

export const mutationTypes = reflectKeys([
  'SET_LOADINGAREA',
  'SET_LOADINGAREA_TOTAL',
  'ADD_LOADINGAREA',
  'UPDATE_LOADINGAREA',
  'REMOVE_LOADINGAREA_BY_ID',
], namespacedPrefix)

const {
  SET_LOADINGAREA,
  SET_LOADINGAREA_TOTAL,
  ADD_LOADINGAREA,
  UPDATE_LOADINGAREA,
  REMOVE_LOADINGAREA_BY_ID,
} = mutationTypes

const mutations = {
  [SET_LOADINGAREA] (state, payload) {
    state.loadingarea = payload
  },
  [SET_LOADINGAREA_TOTAL] (state, payload) {
    state.loadingareaTotal = payload
  },
  [ADD_LOADINGAREA] (state, payload) {
    state.loadingarea.push(payload)
  },
  [UPDATE_LOADINGAREA] (state, { id, payload }) {
    const idx = state.loadingarea.findIndex(el => el.id === id)
    state.loadingarea[idx] = payload
    state.loadingarea = Object.assign([], state.loadingarea)
  },
  [REMOVE_LOADINGAREA_BY_ID] (state, id) {
    state.loadingarea = state.loadingarea.filter(el => {
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
    const res = await ApiClient.get('/api/loading-zones/list?' + objToUrlParam(params))

    commit(SET_LOADINGAREA, res.items)
    commit(SET_LOADINGAREA_TOTAL, res.total)
  },
  async [actionsTypes.CREATE] ({ commit, state }, data) {
    const res = await ApiClient.post('/api/loading-zones/create', data)

    if (res) {
      // commit(SET_LOADINGAREA, res)
      // commit(SET_LOADINGAREA_TOTAL, state.loadingareaTotal + 1)
      VueMain.$notify({
        type: 'success',
        title: 'Зона загрузки',
        text: 'Зона загрузки создана!',
      })
    }
  },
  async [actionsTypes.UPDATE] ({ commit }, data) {
    const res = await ApiClient.patch('/api/loading-zones/update/' + data.id, data)

    if (res) {
      commit(UPDATE_LOADINGAREA, { id: res.id, payload: res })
      VueMain.$notify({
        type: 'success',
        title: 'Зона загрузки',
        text: 'Зона загрузки обновлена!',
      })
    }
  },
  async [actionsTypes.DELETE] ({ commit, state }, id) {
    try {
      await ApiClient.delete('/api/loading-zones/delete/' + id)

      // commit(REMOVE_LOADINGAREA_BY_ID, id)
      // commit(SET_LOADINGAREA_TOTAL, state.loadingareaTotal - 1)
      VueMain.$notify({
        type: 'success',
        title: 'Зона загрузки',
        text: 'Зона загрузки удалена!',
      })
    } catch (err) {
      VueMain.$notify({
        type: 'error',
        title: 'Зона загрузки',
        text: 'Ошибка при удалении!',
      })
    }
  },
}

export const gettersTypes = reflectKeys([
  'LOADINGAREA',
  'LOADINGAREA_TOTAL',
], namespacedPrefix)

const getters = {
  [gettersTypes.LOADINGAREA]: state => {
    return state.loadingarea
  },
  [gettersTypes.LOADINGAREA_TOTAL]: state => {
    return state.loadingareaTotal
  },
}

export default {
  namespaced: true,
  state: initialState,
  getters,
  mutations,
  actions,
}
