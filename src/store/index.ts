import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { InjectionKey } from 'vue'
import { IProduct, Product, ProductInCart } from '@/model/product'
import cookieHelper from '@/libraries/cookieHelper'
import { addAccountingFormat } from '@/libraries/helpers/numberHelper'

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
    isAuthenticated: true
  },
  getters: {
    getCountCartItem (state): number {
      let itemCount = 0
      state.cartItem.forEach((item) => {
        itemCount += item.amount
      })
      return itemCount
    },
    getAllProduct (state): Array<IProduct> {
      return state.products
    },
    checkIsAuthenticated (state): boolean {
      return state.isAuthenticated
    },
    getAllCartItems (state): Array<ProductInCart> {
      return state.cartItem
    },
    getTotalPrice (state): string {
      let totalPrice = 0
      state.cartItem.forEach((item) => {
        totalPrice += Number(item.TotalPrice)
      })
      return addAccountingFormat(totalPrice)
    }
  },
  mutations: {
    addProducts (state, products: Array<IProduct>): void {
      state.products = products.map((item) => new Product(item))
    },
    addCartItem (state, payload: { product: IProduct, amount: number }): void {
      const productObj = new ProductInCart(payload.product, payload.amount)
      if (!(state.cartItem.some((item) => item.id === productObj.id))) {
        state.cartItem.push(productObj)
      } else {
        state.cartItem.find((item) => item.id === productObj.id)?.addAmount(payload.amount)
      }
    },
    removeCartItem (state, productId: number): void {
      state.cartItem = state.cartItem.filter((item) => item.id !== productId)
    },
    setToken (state, token: string): void {
      cookieHelper.setCookie('access-token', token, 3600)
      state.isAuthenticated = true
    },
    setIsAuthenticated (state, isAuth: boolean): void {
      state.isAuthenticated = isAuth
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
