
export interface IApiResponse<T = any> {
  Data: T,
  Message: string,
  ErrorCode: number
}

export interface IAxiosResponse<T = any> {
  data: IApiResponse<T>
}

export type IAxiosPromise<T = any> = Promise<IAxiosResponse<T>>
