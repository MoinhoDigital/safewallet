import Vue from 'vue'
import Router from 'vue-router'
import Wallet from '@/components/Wallet'
import Auth from '@/components/Auth'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/auth',
      name: 'Auth',
      component: Auth
    },
    {
      path: '/',
      name: 'Wallet',
      component: Wallet
    }
  ]
})
