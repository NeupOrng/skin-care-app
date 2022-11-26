import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { InjectionKey } from 'vue'
import { IProduct, Product, ProductInCart } from '@/model/product'

interface IState {
  cartItem: Array<ProductInCart>,
  products: Array<IProduct>,
}

export const key: InjectionKey<Store<IState>> = Symbol('Copy From Vuex Doc')

export default createStore<IState>({
  state: {
    cartItem: [],
    products: []
  },
  getters: {
    getCountCartItem (state): number {
      return state.cartItem.length
    },
    getAllProduct (state): Array<IProduct> {
      return state.products
    }
  },
  mutations: {
    addProducts (state, products: Array<IProduct>): void {
      state.products = products.map((item) => new Product(item))
    },
    addCartItem (state, product: IProduct): void {
      const productObj = new ProductInCart(product)
      if (!(state.cartItem.some((item) => item.Id === productObj.Id))) {
        state.cartItem.push(productObj)
      } else {
        state.cartItem.find((item) => item.Id === productObj.Id)?.addAmount(1)
      }
    },
    removeCartItem (state, productId: number): void {
      const productObj = state.cartItem.find((item) => item.Id === productId)
      if (Number(productObj?.Amount) > 1) {
        productObj?.substractAmount(1)
      } else {
        state.cartItem = state.cartItem.filter((item) => item.Id !== productId)
      }
    }
  },
  actions: {
  },
  modules: {
  }
})

export function useStore (): Store<IState> {
  console.log(key)
  return baseUseStore(key)
}
