import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import store from '@/store'
import cookieHelper from '@/libraries/cookieHelper'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Home" */ '../views/Home.vue')
  },
  {
    path: '/products/:filter',
    name: 'Products',
    component: () => import(/* webpackChunkName: "Products" */ '../views/product/Products.vue')
  },
  {
    path: '/product-detail/:id',
    name: 'ProductDetail',
    component: () => import(/* webpackChunkName: "ProductDetail" */ '../views/product/ProductDetail.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/auth/Login.vue')
  },
  {
    path: '/forget-password',
    name: 'forgetPassword',
    component: () => import(/* webpackChunkName: "ForgetPassword" */ '../views/auth/ForgetPassword.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "Register" */ '../views/auth/Register.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import(/* webpackChunkName: "Profile" */ '../views/auth/Profile.vue'),
    meta: {
      isAuth: true
    }
  },
  {
    path: '/blog/:blogId',
    name: 'blog',
    component: () => import(/* webpackChunkName: "Blog" */ '../views/blog/Blogs.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import(/* webpackChunkName: "Cart" */ '../views/Cart.vue'),
    meta: {
      isAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// router.beforeEach((to, from) => {
//   try {
//     if (to.meta.isAuth) {
//       const token = cookieHelper.getCookie('access-token')
//       if (!token) {
//         store.commit('setIsAuthenticated', false)
//         router.push('/login')
//       }
//     }
//   } catch (e) {
//     console.error(e)
//   }
// })

export default router
