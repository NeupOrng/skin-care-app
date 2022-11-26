import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { InjectionKey } from 'vue'

interface IState {
  cartItem: Array<string>
}

export const key: InjectionKey<Store<IState>> = Symbol('Copy From Vuex Doc')

export default createStore<IState>({
  state: {
    cartItem: []
  },
  getters: {
    getCountCartItem (state): number {
      return state.cartItem.length
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})

export function useStore (): Store<IState> {
  return baseUseStore(key)
}
