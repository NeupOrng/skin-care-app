import { IApiResponse, IAxiosPromise } from '@/model/api/apiResponse'
import { ILoginRequest, ILoginResponse, ISignUpRequest, ISignUpResponse } from '@/model/auth'
import { Blog, IBlog } from '@/model/blog'
import { IPoster, Poster } from '@/model/poster'
import { IProduct, IProductCartFromApi, Product } from '@/model/product'
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
  },
  postLogin (payload: ILoginRequest): Promise<IApiResponse<ILoginResponse>> {
    return getResponse(apiCalling.postLogin(payload))
  },
  getAllPoster (): Promise<Array<Poster>> {
    const responsePoster = getResponse(apiCalling.getAllPoster())
    const poster = responsePoster.then((res) => res.data.map((item: IPoster) => new Poster(item)))
    return poster
  },
  postSignUp (payload: ISignUpRequest): Promise<IApiResponse<ISignUpResponse>> {
    return getResponse(apiCalling.postSignUp(payload))
  },
  getAllProductsInCart (): Promise<Array<IProductCartFromApi>> {
    const response = getResponse(apiCalling.getAllProductsInCart())
    const cartProducts = response.then((res) => res.data)
    return cartProducts
  }
}
