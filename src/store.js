import Vue from 'vue'
import Vuex from 'vuex'
import { initialiseApp, connectAndAuthorizeApp, setupAccount } from './utils/safeApp'
import fetchWalletIds from './utils/fetchWalletIds'
const safeCoinsWallet = require('safe-coins-wallet')

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
      state.input = payload
    },
    wallet: (state, payload) => {
      state.wallet = payload
    },
    newAccount: (state, payload) => {
      state.newAccount = payload
    },
    updateWalletIds: (state, payload) => {
      payload.map(wallet => state.walletIds.push(wallet))
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
    async createWallet ({ commit, state }, input) {
      console.log('createWallet: ', input)
      const wallet = await safeCoinsWallet.createWallet(state.appHandle, input)
      const txInbox = await safeCoinsWallet.createTxInbox(state.appHandle, input)
      const walletCoins = await safeCoinsWallet.loadWalletData(state.appHandle, wallet)

      console.log('created Wallet: ', wallet)
      console.log('created txInbox: ', txInbox)
      console.log('Wallet coins: ', walletCoins)
      commit('wallet', wallet)
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
