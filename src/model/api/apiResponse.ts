
export interface IApiResponse<T = any> {
  data: T,
  status: string,
  error?: string
}

export interface IAxiosResponse<T = any> {
  data: IApiResponse<T>
}

export type IAxiosPromise<T = any> = Promise<IAxiosResponse<T>>
