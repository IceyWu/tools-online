import { http } from '../utils/http'

interface Result {
  code: number
  data: Array<any>
}

export const getAsyncRoutes = (params?: object) => {
  return http.request<Result>('get', '/api/get', { params }, {
    isNeedToken: true,
    showLoading: true,
  })
}
