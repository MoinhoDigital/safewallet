import Vue from 'vue'
import Vuex from 'vuex'
import { init, get, mintCoin, sendTxNotif, loadWalletData, readTxInboxData, createWallet, createTxInbox } from './websafe'
// import safeCoins from 'safe-coins-wallet'

const inboxTagType = 20082018
let appInfo = {
  id: 'wallet.moinhodigital.0.1',
  name: 'Wallet',
  vendor: 'luandro'
}
const perms = {
  _public: ['Read', 'Insert', 'Update', 'Delete'],
  _publicNames: ['Read', 'Insert', 'Update', 'Delete']
}
let walletInfo = {
  name: 'Wallet',
  description: 'Container to receive notifications for wallet transactions',
  key: '__coins',
  tagType: 1012017
}
let inboxInfo = {
  key: '__tx_enc_pk',
  metadataKey: '_metadata',
  name: 'ThanksCoins TX Inbox',
  description: 'Container to receive notifications of ThanksCoins transactions',
  tagType: inboxTagType
}
let assetInfo = {
  key: '__tx_enc_pk',
  tagType: inboxTagType
}

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appHandle: null,
    authUri: null,
    walletSerialized: null,
    pk: null,
    inbox: [],
    inboxData: [],
    input: 'Satoshi Nakamoto',
    assetForm: { asset: 'BTC', quantity: 3 }
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
    setInbox: (state, payload) => {
      state.inbox = payload
    },
    inboxData: (state, payload) => {
      state.inboxData = payload
    },
    updateWalletIds: (state, payload) => {
      payload.map(wallet => state.walletIds.push(wallet))
    }
  },
  actions: {
    async init ({ commit }) {
      const { appHandle, authUri } = await init(appInfo, perms, true)
      commit('init', { appHandle, authUri })
    },
    async getWallet ({ commit, state }) {
      await get(state.appHandle, 'wallet', 19882018)
    },
    async createWallet ({ commit, state }, input) {
      try {
        const wallet = await createWallet(state.appHandle, input, walletInfo)
        console.log('Current Wallet: ', wallet)
        const inbox = await createTxInbox(state.appHandle, input, inboxInfo)
        console.log('created inbox: ', inbox)
        const walletCoins = await loadWalletData(state.appHandle, wallet, walletInfo.key)
        console.log('Wallet coins: ', walletCoins)
        commit('setPk', input)
        commit('setWallet', wallet)
        commit('setInbox', inbox)
      } catch (err) {
        console.log('Error creating wallet: ', err)
      }
    },
    async createAsset ({ commit, state }, formData) {
      assetInfo.name = formData.asset
      const { appHandle, pk, inbox } = state
      async function mintCoins (privateKey, amount) {
        if (amount < 1 || privateKey.length < 1) {
          return
        }
        let coinIds = []
        const coinId = await mintCoin(appHandle, privateKey, assetInfo)
        console.log('Coin minted width id: ', coinId)
        coinIds.push(coinId)
        return coinIds
      }
      console.log(`Minting coins for '${pk}'`)
      const coinIds = await mintCoins(pk, formData.quantity)
      console.log('Notifying coins transfer to recipient\'s wallet inbox...')
      const txId = await sendTxNotif(appHandle, pk, coinIds, assetInfo)
      console.log(`Asset coins minted!`, txId)
      inboxInfo.encPk = inbox.pk
      inboxInfo.encSk = inbox.sk
      const inboxData = await readTxInboxData(appHandle, pk, inboxInfo)
      await commit('inboxData', inboxData)
    }
  }
})
