import Vue from 'vue'
import Vuex from 'vuex'
import { initialiseApp, authorizeApp, setupAccount } from './utils/safeApp'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    appHandle: null,
    authUri: null,
    newAccount: null,
    input: 'your id'
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
    },
    updateInput: (state, payload) => {

    }
    newAccount: (state, payload) => {
      const { newAccount } = payload
      state.newAccount = newAccount
    }
  },
  actions: {
    async startInitialise ({ commit }) {
      const appHandle = await initialiseApp('wallet.moinhodigital.0.1', 'Wallet', 'luandro')
      commit('initialise', { appHandle })
    },
    async startAuthorise ({ commit, state }) {
      const authUri = await authorizeApp(state.appHandle)
      commit('authorise', { authUri })
    },
    async setupAccount ({ commit, state }, input) {
      console.log('INPUT', input)
      const newAccount = await setupAccount(state.appHandle, input)
      commit('newAccount', newAccount)
    }
  }
})
