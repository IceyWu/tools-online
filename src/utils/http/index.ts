import type {
  AxiosInstance,
  AxiosRequestConfig,
  CustomParamsSerializer,
} from 'axios'
import Axios from 'axios'
import { stringify } from 'qs'
import NProgress from '../progress'
import type {
  HttpError,
  HttpRequestConfig,
  HttpResponse,
  RequestMethods,
} from './types.d'

const { VITE_APP_USE_MOCK, VITE_APP_API_URL } = import.meta.env

const defaultConfig: AxiosRequestConfig = {
  baseURL: VITE_APP_USE_MOCK === 'true' ? '' : VITE_APP_API_URL,
  timeout: 10000,
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  // 数组格式参数序列化（https://github.com/axios/axios/issues/5142）
  paramsSerializer: {
    serialize: stringify as unknown as CustomParamsSerializer,
  },
}

class Http {
  constructor() {
    this.httpInterceptorsRequest()
    this.httpInterceptorsResponse()
  }

  /** 初始化配置对象 */
  private static initConfig: HttpRequestConfig = {}

  /** 保存当前Axios实例对象 */
  private static axiosInstance: AxiosInstance = Axios.create(defaultConfig)

  /** 请求拦截 */
  private httpInterceptorsRequest(): void {
    Http.axiosInstance.interceptors.request.use(
      async (config: HttpRequestConfig) => {
        const $config = config
        // 开启进度条动画
        NProgress.start()
        // 优先判断post/get等方法是否传入回掉，否则执行初始化设置等回掉
        if (typeof config.beforeRequestCallback === 'function') {
          config.beforeRequestCallback($config)
          return $config
        }
        if (Http.initConfig.beforeRequestCallback) {
          Http.initConfig.beforeRequestCallback($config)
          return $config
        }
        return $config
      },
      (error) => {
        return Promise.reject(error)
      },
    )
  }

  /** 响应拦截 */
  private httpInterceptorsResponse(): void {
    const instance = Http.axiosInstance
    instance.interceptors.response.use(
      (response: HttpResponse) => {
        const $config = response.config
        // 关闭进度条动画
        NProgress.done()
        // 优先判断post/get等方法是否传入回掉，否则执行初始化设置等回掉
        if (typeof $config.beforeResponseCallback === 'function') {
          $config.beforeResponseCallback(response)
          return response.data
        }
        if (Http.initConfig.beforeResponseCallback) {
          Http.initConfig.beforeResponseCallback(response)
          return response.data
        }
        return response.data
      },
      (error: HttpError) => {
        const $error = error
        $error.isCancelRequest = Axios.isCancel($error)
        // 关闭进度条动画
        NProgress.done()
        // 所有的响应异常 区分来源为取消请求/非取消请求
        return Promise.reject($error)
      },
    )
  }

  /** 通用请求工具函数 */
  public request<T>(
    method: RequestMethods,
    url: string,
    param?: AxiosRequestConfig,
    axiosConfig?: HttpRequestConfig,
  ): Promise<T> {
    const config = {
      method,
      url,
      ...param,
      ...axiosConfig,
    } as HttpRequestConfig

    // 单独处理自定义请求/响应回掉
    return new Promise((resolve, reject) => {
      Http.axiosInstance
        .request(config)
        .then((response: any) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  /** 单独抽离的post工具函数 */
  public post<T, P>(
    url: string,
    params?: T,
    config?: HttpRequestConfig,
  ): Promise<P> {
    // return this.request<P>('post', url, params, config)
    return this.request<P>('post', url, { data: params }, config)
  }

  /** 单独抽离的get工具函数 */
  public get<T, P>(
    url: string,
    params?: T,
    config?: HttpRequestConfig,
  ): Promise<P> {
    return this.request<P>('get', url, { params }, config)
  }
}

export const http = new Http()
