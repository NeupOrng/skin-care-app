import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "Home" */ '../views/Home.vue')
  },
  {
    path: '/products/:filter',
    name: 'products',
    component: () => import(/* webpackChunkName: "Products" */ '../views/Products.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
