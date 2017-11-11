import Vue from 'vue'
import Vuex from 'vuex'
import { init, get } from '../../websafe'
// import { setupAccount } from './utils/safeApp'
import fetchWalletIds from './utils/fetchWalletIds'
import { mintCoin, sendTxNotif } from './utils/faucet'
import safeCoinsWallet from 'safe-coins-wallet'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appHandle: null,
    authUri: null,
    publicNames: null,
    walletSerialized: null,
    pk: null,
    coins: null,
    inbox: null,
    inboxData: null,
    // newAccount: null,
    input: 'Satoshi Nakamoto',
    assetForm: { asset: 'BTC', quantity: 15 },
    walletIds: []
  },
  mutations: {
    init: (state, payload) => {
      const { appHandle, authUri } = payload
      state.authUri = authUri
      state.appHandle = appHandle
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
    // newAccount: (state, payload) => {
    //   state.newAccount = payload
    // },
    updateWalletIds: (state, payload) => {
      payload.map(wallet => state.walletIds.push(wallet))
    }
  },
  actions: {
    async init ({ commit }) {
      const { appHandle, authUri } = await init(
        { id: 'wallet.moinhodigital.0.1', name: 'Wallet', vendor: 'luandro' },
        {
          _public: ['Read', 'Insert', 'Update', 'Delete'],
          _publicNames: ['Read', 'Insert', 'Update', 'Delete']
        },
        true
      )
      commit('init', { appHandle, authUri })
    },
    async getWallet ({ commit, state }) {
      await get(state.appHandle, 'wallet', 19882018)
    },
    async createWallet ({ commit, state }, input) {
      console.log('createWallet: ', input)
      try {
        const wallet = await safeCoinsWallet.createWallet(state.appHandle, input)
        const inbox = await safeCoinsWallet.createTxInbox(state.appHandle, input)
        const walletCoins = await safeCoinsWallet.loadWalletData(state.appHandle, wallet)
        console.log('Current Wallet: ', wallet)
        console.log('created inbox: ', inbox)
        console.log('Wallet coins: ', walletCoins)
        commit('setPk', input)
        commit('setWallet', wallet)
        commit('inbox', inbox)
      } catch (err) {
        console.log('Error creating wallet: ', err)
      }
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
      const coinIds = await mintCoins(pk, formData.quantity)
      console.log('Notifying coins transfer to recipient\'s wallet inbox...')
      await sendTxNotif(state.appHandle, pk, coinIds)
      console.log(`Asset coins minted!`)
      console.log(state)
      const inboxData = await safeCoinsWallet.readTxInboxData(state.appHandle, state.pk, state.inbox.pk, state.inbox.sk)
      console.log('inboxData: ', inboxData)
      commit('inboxData', inboxData)
    },
    // async setupAccount ({ commit, state }, input) {
    //   console.log('INPUT', input)
    //   const newAccount = await setupAccount(state.appHandle, input)
    //   commit('newAccount', newAccount)
    // },
    async fetchWalletIds ({commit, state}) {
      console.log('WalletIDs', state)
      const walletIds = await fetchWalletIds(state.appHandle)
      commit('updateWalletIds', walletIds)
    }
  }
})
