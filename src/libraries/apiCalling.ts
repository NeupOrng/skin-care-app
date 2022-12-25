import { IApiResponse, IAxiosPromise } from '@/model/api/apiResponse'
import { ILoginRequest, ILoginResponse, ISignUpRequest, ISignUpResponse } from '@/model/auth'
import { IBlog } from '@/model/blog'
import { IProduct } from '@/model/product'
import { IProductType } from '@/model/productType'
import { IPoster } from '@/model/poster'
import axios from 'axios'

const apiUrl = process.env.VUE_APP_ENDPOINT

const axiosInstance = axios.create({
  baseURL: `${apiUrl}/api`
})

export default {
  getAllProducts (): IAxiosPromise<Array<IProduct>> {
    return axiosInstance.get('/v1/product/rrp_product')
  },
  getProductById (id: string): IAxiosPromise<IProduct> {
    return axiosInstance.get(`/v1/product/rrp_product/${id}`)
  },
  getProductByFilter (filterKey: string): IAxiosPromise<Array<IProduct>> {
    return axiosInstance.get(`/v1/product/rrp_product?filter=${filterKey}`)
  },
  getProductByProductType (typeId: string): IAxiosPromise<Array<IProduct>> {
    return axiosInstance.get(`/v1/product/rrp_product?productType=${typeId}`)
  },
  getAllProductType (): IAxiosPromise<Array<IProductType>> {
    return axiosInstance.get('/v1/product_type/rrp_product_type')
  },
  getAllBlogs (): IAxiosPromise<Array<IBlog>> {
    return axiosInstance.get('/v1/blog/rrp_blog')
  },
  getBlogById (id: string): IAxiosPromise<IBlog> {
    return axiosInstance.get(`/v1/blog/rrp_blog/${id}`)
  },
  postLogin (payload: ILoginRequest): IAxiosPromise<ILoginResponse> {
    return axiosInstance.post('/v1/login', payload)
  },
  getAllPoster (): IAxiosPromise<Array<IPoster>> {
    return axiosInstance.get('/v1/poster/rrp_poster')
  },
  postSignUp (payload: ISignUpRequest): IAxiosPromise<ISignUpResponse> {
    return axiosInstance.post('/v1/register', payload)
  }
}
