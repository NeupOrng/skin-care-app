import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { InjectionKey } from 'vue'
import { IProduct, Product, ProductInCart } from '@/model/product'
import { arrowMiddleware } from 'element-plus'

interface IState {
  cartItem: Array<ProductInCart>,
  products: Array<IProduct>,
  isAuthenticated: boolean
}

export const key: InjectionKey<Store<IState>> = Symbol('Copy From Vuex Doc')

const store = createStore<IState>({
  state: {
    cartItem: [],
    products: [],
    isAuthenticated: false
  },
  getters: {
    getCountCartItem (state): number {
      let itemCount = 0
      state.cartItem.forEach((item) => {
        itemCount += item.Amount
      })
      return itemCount
    },
    getAllProduct (state): Array<IProduct> {
      return state.products
    },
    checkIsAuthenticated (state): boolean {
      return state.isAuthenticated
    }
  },
  mutations: {
    addProducts (state, products: Array<IProduct>): void {
      state.products = products.map((item) => new Product(item))
    },
    addCartItem (state, payload: { product: IProduct, amount: number }): void {
      const productObj = new ProductInCart(payload.product, payload.amount)
      if (!(state.cartItem.some((item) => item.Id === productObj.Id))) {
        state.cartItem.push(productObj)
      } else {
        state.cartItem.find((item) => item.Id === productObj.Id)?.addAmount(payload.amount)
      }
    },
    removeCartItem (state, payload: { productId: number, amount: number }): void {
      const productObj = state.cartItem.find((item) => item.Id === payload.productId)
      if (Number(productObj?.Amount) > 1) {
        productObj?.substractAmount(payload.amount)
        if (Number(productObj?.Amount) <= 0) {
          state.cartItem = state.cartItem.filter((item) => item.Id !== payload.productId)
        }
      } else {
        state.cartItem = state.cartItem.filter((item) => item.Id !== payload.productId)
      }
    }
  },
  actions: {
  },
  modules: {
  }
})

export default store

export function useStore (): Store<IState> {
  console.log(key)
  return baseUseStore(key)
}
