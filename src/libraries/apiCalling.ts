import { IApiResponse, IAxiosPromise } from '@/model/api/apiResponse'
import { IBlog } from '@/model/blog'
import { IProduct } from '@/model/product'
import axios from 'axios'

const apiUrl = process.env.VUE_APP_ENDPOINT

const axiosInstance = axios.create({
  baseURL: `${apiUrl}/api`
})

export default {
  getAllProducts (): IAxiosPromise<Array<IProduct>> {
    return axiosInstance.get('/v1/product/rrp_product')
  },
  getAllBlogs (): IAxiosPromise<Array<IBlog>> {
    return axiosInstance.get('/v1/blog/rrp_blog')
  }
}
