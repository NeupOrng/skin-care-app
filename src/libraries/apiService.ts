import { IAxiosPromise } from '@/model/api/apiResponse'
import { Blog, IBlog } from '@/model/blog'
import { IProduct, Product } from '@/model/product'
import { IProductType } from '@/model/productType'
import apiCalling from './apiCalling'

const getResponse = (response: IAxiosPromise) => response.then((value) => value.data)

export default {
  getAllProducts (): Promise<Array<Product>> {
    const responseProducts = getResponse(apiCalling.getAllProducts())
    const products = responseProducts.then((res) => res.data.map((item: IProduct) => new Product(item)))
    return products
  },
  getProductById (id: string): Promise<Product> {
    const responseProduct = getResponse(apiCalling.getProductById(id))
    return responseProduct.then((res) => new Product(res.data))
  },
  getProductByFilter (key: string): Promise<Array<Product>> {
    const response = getResponse(apiCalling.getProductByFilter(key))
    return response.then((res) => res.data.map((item: IProduct) => new Product(item)))
  },
  getProductByProductType (typeId: string): Promise<Array<Product>> {
    const response = getResponse(apiCalling.getProductByProductType(typeId))
    return response.then((res) => res.data.map((item: IProduct) => new Product(item)))
  },
  getAllProductType (): Promise<Array<IProductType>> {
    const response = getResponse(apiCalling.getAllProductType())
    return response.then((res) => res.data)
  },
  getAllBlogs (): Promise<Array<Blog>> {
    const responseBlogs = getResponse(apiCalling.getAllBlogs())
    const blogs = responseBlogs.then((res) => res.data.map((item: IBlog) => new Blog(item)))
    return blogs
  },
  getBlogById (id: string): Promise<Blog> {
    const responseBlog = getResponse(apiCalling.getBlogById(id))
    const blog = responseBlog.then((res) => {
      console.log(res.data)
      return new Blog(res.data)
    })
    return blog
  }
}
