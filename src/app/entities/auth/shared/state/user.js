import { reflectKeys } from '@/app/shared/services'
import ApiClient from '@/app/shared/services/api-client'

/** Initial state */
const initialState = {
  loading: false,
  data: null,
  error: null,
}

/** Prefix for mutation types and actiontypes */
const namespacedPrefix = '[USERS]'

const mutationTypes = reflectKeys([
    'USERS_DATA_SUCCESS',
    'USERS_DATA_REQUEST',
    'USERS_DATA_ERROR',
    'USERS_DATA_RESET',
  ], namespacedPrefix)

const {
  USERS_DATA_ERROR,
  USERS_DATA_REQUEST,
  USERS_DATA_RESET,
  USERS_DATA_SUCCESS,
} = mutationTypes

const mutations = {
  /** user data request */
  [USERS_DATA_REQUEST] (state) {
    Object.assign(state, { loading: true, error: null })
  },

  /** user data success */
  [USERS_DATA_SUCCESS] (state, payload) {
    Object.assign(state, { loading: false, data: payload })
  },

  /** user data error */
  [USERS_DATA_ERROR] (state, payload) {
    Object.assign(state, {
      loading: false,
      data: null,
      error: payload || true,
    })
  },

  /** reset user data */
  [USERS_DATA_RESET] (state) {
    Object.assign(state, ...initialState)
  },
}

export const actionsTypes = reflectKeys([
  'FETCH_USER_DATA',
  'CREATE_USER',
  'UPDATE_USER',
  'DELETE_USER',
], namespacedPrefix)

const actions = {
  /** fetch user data */
  async [actionsTypes.FETCH_USER_DATA] ({ commit }, authCred) {
    commit(USERS_DATA_REQUEST)

    const result = await ApiClient(authCred).catch(e => {
      commit(USERS_DATA_ERROR, e)
    })

    if (result) {
      commit(USERS_DATA_SUCCESS, result)
    }

    return result
  },
}

export default {
  state: initialState,
  mutations,
  actions,
}
