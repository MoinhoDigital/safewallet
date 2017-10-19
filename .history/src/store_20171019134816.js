import Vue from 'vue'
import Vuex from 'vuex'
import { initialiseApp, connectAndAuthorizeApp, setupAccount } from './utils/safeApp'
import fetchWalletIds from './utils/fetchWalletIds'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    appHandle: null,
    authUri: null,
    newAccount: null,
    input: 'Janus Correl',
    walletIds: []
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
      const { input } = payload
      state.input = input
    },
    newAccount: (state, payload) => {
      const { newAccount } = payload
      console.log('commiting', payload)
      state.newAccount = newAccount
    },
    updateWalletIds: (state, payload) => {
      const { walletIds } = payload
      state.walletIds = walletIds
    }
  },
  actions: {
    async startInitialise ({ commit }) {
      const appHandle = await initialiseApp('wallet.moinhodigital.0.1', 'Wallet', 'luandro')
      commit('initialise', { appHandle })
    },
    async startAuthorise ({ commit, state }) {
      const authUri = await connectAndAuthorizeApp(state.appHandle)
      commit('authorise', { authUri })
    },
    async setupAccount ({ commit, state }, input) {
      console.log('INPUT', input)
      const newAccount = await setupAccount(state.appHandle, input)
      commit('newAccount', newAccount)
    },
    async fetchWalletIds ({commit, state}) {
      console.log('WalletIDs', state)
      const walletIds = await fetchWalletIds(state.appHandle)
      commit('updateWalletIds', walletIds)
    }
  }
})
