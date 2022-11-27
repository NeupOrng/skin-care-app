import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import store from '@/store'

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
  },
  {
    path: '/routine/:id',
    name: 'routine',
    component: () => import(/* webpackChunkName: "Routine" */ '../views/Routine.vue')
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
    component: () => import(/* webpackChunkName: "Profile" */ '../views/Profile.vue'),
    meta: {
      isAuth: true
    }
  },
  {
    path: '/blog/:blogId',
    name: 'blog',
    component: () => import(/* webpackChunkName: "Blog" */ '../views/Blog.vue')
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

router.beforeEach((to, from) => {
  try {
    console.log(store.state)
    // if (!(to.meta.isAuth && store.state.isAuthenticated)) {
    //   router.push('/login')
    // }
  } catch (e) {
    console.error(e)
  }
})

export default router
