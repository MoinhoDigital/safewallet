import Vue from 'vue'
import Vuex from 'vuex'
import { initialiseApp, connectAndAuthorizeApp, setupAccount } from './utils/safeApp'
import fetchWalletIds from './utils/fetchWalletIds'
import { mintCoin, sendTxNotif } from './utils/faucet'
const safeCoinsWallet = require('safe-coins-wallet')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    appHandle: null,
    authUri: null,
    walletSerialized: null,
    pk: null,
    coins: null,
    inbox: null,
    inboxData: null,
    newAccount: null,
    input: 'Janus Correl',
    assetForm: {asset: 'TST', quantity: 3},
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
    setWallet: (state, payload) => {
      state.walletSerialized = payload
    },
    setPk: (state, payload) => {
      state.pk = payload
    },
    assetForm: (state, payload) => {
      state.assetForm = payload
    },
    coins: (state, payload) => {
      state.coins = payload
    },
    inbox: (state, payload) => {
      state.inbox = payload
    },
    inboxData: (state, payload) => {
      state.inboxData = payload
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
      const inbox = await safeCoinsWallet.createTxInbox(state.appHandle, input)
      const walletCoins = await safeCoinsWallet.loadWalletData(state.appHandle, wallet)

      console.log('Current Wallet: ', wallet)
      console.log('created inbox: ', inbox)
      console.log('Wallet coins: ', walletCoins)
      commit('setPk', input)
      commit('setWallet', wallet)
      commit('inbox', inbox)
    },
    async createAsset ({ commit, state }, formData) {
      function mintCoins (pk, amount) {
        if (amount < 1) {
          return Promise.resolve([])
        }
        let id
        return mintCoin(state.appHandle, pk)
          .then((_id) => {
            id = _id
            console.log('Coin minted at: ', id)
            return mintCoins(pk, amount - 1)
          })
          .then((ids) => {
            ids.push(id)
            return ids
          })
      }
      console.log(formData)
      let pk = state.pk
      if (pk.length < 1) {
        return
      }
      console.log(`Minting coins for '${pk}'`)
      await mintCoins(pk, formData.quantity)
        .then((coinIds) => {
          console.log('Notifying coins transfer to recipient\'s wallet inbox...')
          return sendTxNotif(state.appHandle, pk, coinIds)
        })
        .then(async () => {
          console.log(`Asset coins minted!`)
          // const coins = await safeCoinsWallet.loadWalletData(state.appHandle, state.walletSerialized)
          console.log(state)
          const inboxData = await safeCoinsWallet.readTxInboxData(state.appHandle, state.pk, state.inbox.pk, state.inbox.sk)

          // console.log('coins: ', coins)
          console.log('inboxData: ', inboxData)

          // commit('coins', coins)
          commit('inboxData', inboxData)
        })
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
