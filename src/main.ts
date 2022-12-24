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
// import VueGeolocation from 'vue3-geolocation';
// import GMaps from 'vuejs3-google-maps';
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
  faFacebook,
  faSquareFacebook,
  faTwitter
} from '@fortawesome/free-brands-svg-icons'

library.add(
  faMagnifyingGlass,
  faUser,
  faCartShopping,
  faFacebook,
  faBars,
  faXmark,
  faChevronRight,
  faChevronLeft,
  faSquareFacebook,
  faTwitter
)
createApp(App)
  .use(store)
  .use(router)
  .use(ElementPlus)
  .use(i18n)
  // .use(VueGeolocation)
  // .use(GMaps, {
  //   load: {
  //     apiKey: 'AIzaSyCb-Cr081cGsWBbI8agi4iNQPJK0qcnCI8&libraries=places,geometry&callback=mapApiInitialized',
  //     libraries: ["places"],
  //   },
  // })
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')
