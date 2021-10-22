import axios from 'axios'
import router from '@/app/app-routes'
import { appBaseUrl } from '@/environment'
import config from '@/app/shared/config'

const VueMain = router.app
const ACCESS_TOKEN_KEY = process.env.ACCESS_TOKEN_KEY || 'Authorization'
const NEW_LINE = '<br/>'

/**
 * Axios basic configuration
 * Some general configuration can be added like timeout, headers, params etc. More details can be found on https://github.com/axios/axios
 * */
const axiosConfig = {
  baseURL: appBaseUrl,
  headers: {
    Build: config.app.build,
  },
}

/**
 * Creating the instance of Axios
 * It is because, in large scale application we may need to consume APIs from more than single server,
 * So, may need to create multiple http client with different config
 * Only this client will be used rather than axios in the application
 **/
const httpClient = axios.create(axiosConfig)
httpClient.defaults.withCredentials = true

/**
 * Auth interceptors
 * @description Configuration related to AUTH token can be done in interceptors.
 * Currenlty it is just doing nothing but idea to to show the capability of axios and its interceptors
 * In future, interceptors can be created into separate files and consumed into multiple http clients
 * @param {*} config
 */
const authInterceptor = (config) => {
  /** add auth token */
  const accessToken = VueMain.$session.get('access_token')

  if (accessToken) {
    config.headers[ACCESS_TOKEN_KEY] = 'Bearer ' + accessToken
  }

  VueMain.$Progress.start()
  return config
}

const loggerInterceptor = (config) => {
  /** Add logging here */
  return config
}

/** Adding the request interceptors */
httpClient.interceptors.request.use(authInterceptor)
httpClient.interceptors.request.use(loggerInterceptor)

/** Adding the response interceptors */
httpClient.interceptors.response.use(
  (response) => {
    VueMain.$Progress.finish()
    const resData = response.data
    return resData.data ? resData.data : resData
  },
  (error) => {
    /** Do something with response error */
    VueMain.$Progress.fail()

    const response = error.response
    const data = error.response.data

    if (response &&
      error.config &&
        (!Object.prototype.hasOwnProperty.call(error.config, 'errorHandle') ||
        error.config.errorHandle === true)
    ) {
      let errorMessage = 'Не известная серверная ошибка'

      if (response && data && data.message) {
        errorMessage = data.message
        if (Object.keys(data.errors).length) {
          errorMessage = ''
          errorMessage += ParseValidationError(data.errors)
        } else if (data.error === 'Illuminate\\Validation\\ValidationException' && data.validation) {
          errorMessage += ':' + NEW_LINE + ParseValidationError(data.validation)
        }
      }

      VueMain.$notify({
        type: 'error',
        group: 'api',
        title: 'Серверная ошибка',
        text: errorMessage,
      })
    } else {
      VueMain.$notify({
        type: 'error',
        group: 'api',
        title: 'Ошибка',
        text: 'Сервер недоступен',
      })
    }

    return Promise.reject(error)
  },
)

function ParseValidationError (validation) {
  let resStr = '<ul style="margin-left: 2em;">'
  for (const fieldName in validation) {
    if (Object.prototype.hasOwnProperty.call(validation, fieldName)) {
      const fieldErrors = validation[fieldName]
      fieldErrors.forEach(element => {
        resStr += `<li>${element}</li>`
      })
    }
  }
  resStr += '</ul>'
  return resStr
}

export default httpClient
