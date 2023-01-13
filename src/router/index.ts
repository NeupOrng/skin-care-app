import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import store from '@/store'
import cookieHelper from '@/libraries/helpers/cookieHelper'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Home" */ '../views/Home.vue')
  },
  {
    path: '/products/:filter',
    name: 'Products',
    component: () => import(/* webpackChunkName: "Products" */ '../views/product/Products.vue'),
    props: (route) => ({ filterKey: route.params.filter })
  },
  {
    path: '/product-detail/:id',
    name: 'ProductDetail',
    component: () => import(/* webpackChunkName: "ProductDetail" */ '../views/product/ProductDetail.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/auth/Login.vue')
  },
  {
    path: '/forget-password',
    name: 'ForgetPassword',
    component: () => import(/* webpackChunkName: "ForgetPassword" */ '../views/auth/ForgetPassword.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "Register" */ '../views/auth/Register.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import(/* webpackChunkName: "Profile" */ '../views/auth/Profile.vue'),
    meta: {
      isAuth: true
    }
  },
  {
    path: '/history',
    name: 'History',
    component: () => import(/* webpackChunkName: "Profile" */ '../views/auth/History.vue'),
    meta: {
      isAuth: true
    }
  },
  {
    path: '/meeting',
    name: 'Meeting',
    component: () => import(/* webpackChunkName: "Profile" */ '../views/auth/Meeting.vue'),
    meta: {
      isAuth: true
    }
  },
  {
    path: '/blogs',
    name: 'Blogs',
    component: () => import(/* webpackChunkName: "Blogs" */ '../views/blog/Blogs.vue')
  },
  {
    path: '/blog-detail/:id',
    name: 'BlogDetail',
    component: () => import(/* webpackChunkName: "BlogDetail" */ '../views/blog/BlogDetail.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
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

router.beforeEach((to, from) => {
  try {
    if (to.meta.isAuth) {
      const token = cookieHelper.getCookie('access-token')
      if (!token) {
        store.commit('setIsAuthenticated', false)
        router.push('/login')
      }
    }
  } catch (e) {
    console.error(e)
  }
})

export default router
