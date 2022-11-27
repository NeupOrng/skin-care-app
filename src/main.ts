import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import ElementPlus from 'element-plus'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import i18n from '@/libraries/vue-i18n'
import './assets/index.css'
import 'element-plus/dist/index.css'
import {
  faMagnifyingGlass,
  faUser,
  faCartShopping,
  faBars,
  faXmark,
  faChevronRight,
  faChevronLeft
} from '@fortawesome/free-solid-svg-icons'
import {
  faFacebook
} from '@fortawesome/free-brands-svg-icons'

library.add(
  faMagnifyingGlass,
  faUser,
  faCartShopping,
  faFacebook,
  faBars,
  faXmark,
  faChevronRight,
  faChevronLeft
)

createApp(App)
  .use(store)
  .use(router)
  .use(ElementPlus)
  .use(i18n)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')
