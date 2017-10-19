import Vue from 'vue'
import Vuex from 'vuex'
import { initialiseApp } from './utils/safeApp'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    appHandle: undefined
  },
  mutations: {
    increment: state => state.count++,
    decrement: state => state.count--,
    initiaze: (state, payload) => state.appHandle === payload.appHandle
  },
  actions: {
    startInitialize ({ commit }) {
      initialiseApp('wallet.moinhodigital.0.1', 'Wallet', 'luandro')
      .then(appHandle => commit('initialize', { appHandle }))
    }
  }
})
