import { IAxiosPromise } from '@/model/api/apiResponse'
import { Blog, IBlog } from '@/model/blog'
import { IProduct, Product } from '@/model/product'
import apiCalling from './apiCalling'

const getResponse = (response: IAxiosPromise) => response.then((value) => value.data)

export default {
  getAllProducts (): Promise<Array<Product>> {
    const responseProducts = getResponse(apiCalling.getAllProducts())
    const products = responseProducts.then((res) => res.data.map((item: IProduct) => new Product(item)))
    return products
  },
  getAllBlogs (): Promise<Array<Blog>> {
    const responseBlogs = getResponse(apiCalling.getAllBlogs())
    const blogs = responseBlogs.then((res) => res.data.map((item: IBlog) => new Blog(item)))
    return blogs
  }
}
