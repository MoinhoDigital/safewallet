import Vue from 'vue'
import Vuex from 'vuex'
import { init, get, mintCoin, sendTxNotif, loadWalletData, readTxInboxData, createWallet, createTxInbox, transferCoin } from './websafe'
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
    ids: null,
    walletSerialized: null,
    pk: null,
    inbox: [],
    inboxData: [],
    input: 'Satoshi Nakamoto',
    assetForm: { asset: 'BTC', quantity: 3 },
    transferForm: 3
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
    assetForm: (state, payload) => {
      state.assetForm = payload
    },
    transferForm: (state, payload) => {
      state.assetForm = payload
    },
    setWallet: (state, payload) => {
      state.walletSerialized = payload
    },
    setPk: (state, payload) => {
      state.pk = payload
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
      const data = await get(state.appHandle, walletInfo.name, walletInfo.tagType)
      console.log(data)
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
      const { asset, quantity } = formData
      assetInfo.name = asset
      const { appHandle, pk, inbox } = state
      let mintedCoins = []
      async function mintCoins (privateKey, amount) {
        if (amount < 1 || privateKey.length < 1) {
          return mintedCoins
        }
        const coinId = await mintCoin(appHandle, privateKey, assetInfo)
        mintedCoins.push(coinId)
        return mintCoins(privateKey, amount - 1)
      }
      console.log(`Minting ${quantity} coins for '${pk}'`)
      const coinIds = await mintCoins(pk, quantity)
      console.log('Notifying coins transfer to recipient\'s wallet inbox...')
      const txId = await sendTxNotif(appHandle, pk, coinIds, assetInfo)
      console.log(`Asset coins minted!`, txId)
      inboxInfo.encPk = inbox.pk
      inboxInfo.encSk = inbox.sk
      const inboxData = await readTxInboxData(appHandle, pk, inboxInfo)
      await commit('inboxData', inboxData)
    },
    async transferAssets ({ commit, state }) {
      const { appHandle, pk, inbox, inboxData } = state
      inboxData[0].coinIds.map(async (coinId) => {
        const coinInfo = {
          id: coinId,
          key: walletInfo.key,
          tagType: walletInfo.tagType
        }
        const transfer = await transferCoin(appHandle, pk, inbox.sk, coinInfo, 'Satoshi Nakamoto')
        console.log('TX', transfer)
      })
    }
  }
})
