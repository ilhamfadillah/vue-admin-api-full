// beforeEnter: (to, from, next) => {
//   if (store.getters['isAuthenticated']) {
//     next()
//   } else { 
//     next('/login')
//   }
// }

import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Coindesk from '@/components/admin/content/coindesk/Coindesk'
import Cryptocurrency from '@/components/admin/content/cryptocurrency/Cryptocurrency'
import IndexPrice from '@/components/admin/content/index_price/IndexPrice'
import YahooFinance from '@/components/admin/content/yahoo_finance/YahooFinance'
import Home from '@/components/Home'
import BootstrapVue from 'bootstrap-vue'
import DateRangePicker from '@gravitano/vue-date-range-picker'
import Login from '@/components/Login/Login'
import { TokenService } from '@/services/storage.service'

Vue.use(
  Router,
  VueAxios,
  Vuex,
  axios,
  BootstrapVue,
  DateRangePicker
)

Vue.prototype.$http = axios


const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/admin/coindesk',
      name: 'Coindesk',
      component: Coindesk,
    },
    {
      path: '/admin/cryptocurrency',
      name: 'Cryptocurrency',
      component: Cryptocurrency,
    },
    {
      path: '/admin/index_price',
      name: 'IndexPrice',
      component: IndexPrice,
    },
    {
      path: '/admin/yahoo_finance',
      name: 'YahooFinance',
      component: YahooFinance,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        public: true,  // Allow access to even if not logged in
        onlyWhenLoggedOut: true
      }
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        public: true, 
        onlyWhenLoggedOut: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isPublic = to.matched.some(record => record.meta.public)
  const onlyWhenLoggedOut = to.matched.some(record => record.meta.onlyWhenLoggedOut)
  const loggedIn = !!TokenService.getToken();
  
  if (!isPublic && !loggedIn) {
    next({
      path:'/login',
      query: {redirect: to.fullPath}  // Store the full path to redirect the user to after login
    });
  } 
  
  if (loggedIn && onlyWhenLoggedOut) {
    next({ path: '/admin/coindesk' })
  } 
  
  next();
})


export default router