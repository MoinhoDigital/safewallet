import Vue from 'vue'
import Vuex from 'vuex'
import { initialiseApp, authorizeApp } from './utils/safeApp'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    appHandle: null,
    authUri: null
  },
  mutations: {
    increment: state => state.count++,
    decrement: state => state.count--,
    initialise: (state, payload) => {
      const { appHandle } = payload
      state.appHandle = appHandle
    },
    authorise: (state, payload) => {
      const { authUri } = payload
      state.authUri = authUri
    }
  },
  actions: {
    async startInitialise ({ commit }) {
      const appHandle = await initialiseApp('wallet.moinhodigital.0.1', 'Wallet', 'luandro')
      commit('initialise', { appHandle })
    },
    async startAuthorise ({ commit }) {
      const authUri = await initialiseApp('wallet.moinhodigital.0.1', 'Wallet', 'luandro')
      commit('authorise', { authUri })
    }
  }
})
