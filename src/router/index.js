import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Wallet from '@/components/Wallet'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Wallet',
      component: Wallet
    },
    {
      path: '/hello',
      name: 'Hello',
      component: HelloWorld
    }
  ]
})
