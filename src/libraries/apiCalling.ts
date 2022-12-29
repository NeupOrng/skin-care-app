import { IApiResponse, IAxiosPromise } from '@/model/api/apiResponse'
import { ILoginRequest, ILoginResponse, ISignUpRequest, ISignUpResponse } from '@/model/auth'
import { IBlog } from '@/model/blog'
import { ICreateProductRequest, IProduct, IProductCartFromApi, ProductInCart } from '@/model/product'
import { IProductType } from '@/model/productType'
import { IPoster } from '@/model/poster'
import axios from 'axios'
import cookieHelper from './helpers/cookieHelper'
import { pa } from 'element-plus/es/locale'

const apiUrl = process.env.VUE_APP_ENDPOINT

const axiosInstance = axios.create({
  baseURL: `${apiUrl}/api`
})
const afterLoginAxiosInstance = (token: string) => {
  return axios.create({
    baseURL: `${apiUrl}/api`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

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
  },
  getAllProductsInCart (): IAxiosPromise<Array<IProductCartFromApi>> {
    const token = cookieHelper.getCookie('access-token') ?? ''
    return afterLoginAxiosInstance(token).get('/v1/cart')
  },
  addProductToCart (payload: ICreateProductRequest): IAxiosPromise<string> {
    const token = cookieHelper.getCookie('access-token') ?? ''
    return afterLoginAxiosInstance(token).post('/v1/cart', payload)
  },
  removeProductFromCart (cartId: number): IAxiosPromise<string> {
    const token = cookieHelper.getCookie('access-token') ?? ''
    return afterLoginAxiosInstance(token).delete(`/v1/cart/${cartId}`)
  },
  updateProductInCart (param: ProductInCart): IAxiosPromise<string> {
    const token = cookieHelper.getCookie('access-token') ?? ''
    const request = {
      product_id: param.id,
      quantity: param.amount
    }
    return afterLoginAxiosInstance(token).put(`/v1/cart/${param.cart_id}`, request)
  }
}
