import { IAxiosPromise } from '@/model/api/apiResponse'
import { IProduct, Product } from '@/model/product'
import apiCalling from './apiCalling'

const getResponse = (response: IAxiosPromise) => response.then((value) => value.data)

export default {
  getAllProduct (): Promise<Array<Product>> {
    const responseProducts = getResponse(apiCalling.getAllProduct())
    const products = responseProducts.then((res) => res.data.map((item: IProduct) => new Product(item)))
    return products
  }
}
