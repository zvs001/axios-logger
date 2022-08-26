import {AxiosError, AxiosInstance, AxiosResponse} from 'axios'
import _ from 'lodash'

interface Config {
  prefix: string
}

export function applyAxiosLogger(axiosInstance: AxiosInstance, config?: {
  logVariant?: 'all' | 'errors'
  prefix?: string
}) {
  const { logVariant = 'all', prefix = 'API' } = config || {}

  axiosInstance.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data

      if(logVariant === 'all') {
        logSuccess(response, { prefix })
      }

      return response
    },
    function (e) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      logError(e, { prefix })

      return Promise.reject(e)
    },
  )
}


function logError(error: AxiosError, config: Config) {
  let logArgs = getLogFromResponse(error.response as any)
  if (_.isEmpty(logArgs)) {
    logArgs.push(error.message)
  }

  console.error(`${config.prefix} [ERROR]`, ...logArgs)
}

function logSuccess(response: AxiosResponse, config: Config) {
  let logArgs = getLogFromResponse(response as any)
  console.log(`${config.prefix} [OK]`, ...logArgs)
}

function getLogFromResponse(response: AxiosResponse): any[] {
  if (!response) return []
  const { status, data } = response || {}

  const logArgs: any[] = [status]
  logArgs.push(data)
  logArgs.push(response)

  return logArgs
}

export default applyAxiosLogger
