import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import ElementPlus from 'element-plus'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import './assets/index.css'
import 'element-plus/dist/index.css'
import {
  faMagnifyingGlass,
  faUser,
  faCartShopping
} from '@fortawesome/free-solid-svg-icons'
import {
  faFacebook
} from '@fortawesome/free-brands-svg-icons'

library.add(faMagnifyingGlass, faUser, faCartShopping, faFacebook)

createApp(App)
  .use(store)
  .use(router)
  .use(ElementPlus)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')
