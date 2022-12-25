import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { InjectionKey } from 'vue'
import { IProduct, Product, ProductInCart } from '@/model/product'
import cookieHelper from '@/libraries/helpers/cookieHelper'
import { addAccountingFormat } from '@/libraries/helpers/numberHelper'
import { IProductType } from '@/model/productType'
import apiService from '@/libraries/apiService'
import { IToken, IUser } from '@/model/auth'

interface IState {
  cartItem: Array<ProductInCart>,
  products: Array<IProduct>,
  productTypes: Array<IProductType>,
  isAuthenticated: boolean,
  user: IUser,
}

export const key: InjectionKey<Store<IState>> = Symbol('Copy From Vuex Doc')

const store = createStore<IState>({
  state: {
    cartItem: [],
    products: [],
    productTypes: [],
    isAuthenticated: true,
    user: {
      id: 0,
      email: '',
      fullname: '',
      phone_number: '',
      facebook: '',
      location: '',
      lat: '',
      lng: '',
      updated_at: '',
      status_id: 0,
      user_type_id: 0,
      userType: {
        id: 0,
        name: '',
        status_id: 0,
        created_at: '',
        updated_at: ''
      }
    }
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
      const token = cookieHelper.getCookie('access-token')
      if (!token) {
        state.isAuthenticated = false
      }
      return state.isAuthenticated
    },
    getAllCartItems (state): Array<ProductInCart> {
      return state.cartItem
    },
    getTotalPrice (state): string {
      let totalPrice = 0
      state.cartItem.forEach((item) => {
        totalPrice += Number(item.total_price)
      })
      return addAccountingFormat(totalPrice)
    },
    getAllProductTypes (state): Array<IProductType> {
      return state.productTypes
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
    setToken (state, token: IToken): void {
      cookieHelper.setCookie('access-token', token.token, 3600)
      cookieHelper.setCookie('refresh-token', token.refreshToken, 3600 * 24 * 30)
      state.isAuthenticated = true
    },
    setIsAuthenticated (state, isAuth: boolean): void {
      state.isAuthenticated = isAuth
    },
    setProductTypes (state, productTypes: Array<IProductType>): void {
      state.productTypes = productTypes
    },
    setUser (state, user: IUser): void {
      state.user = user
    },
    removeToken (): void {
      cookieHelper.removeCookie('access-token')
      cookieHelper.removeCookie('refresh-token')
    }
  },
  actions: {
    async getAllProductTypes () {
      const productType = await apiService.getAllProductType()
      this.commit('setProductTypes', productType)
    }
  },
  modules: {
  }
})

export default store

export function useStore (): Store<IState> {
  console.log(key)
  return baseUseStore(key)
}
