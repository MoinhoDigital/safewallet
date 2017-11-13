import Vue from 'vue'
import Vuex from 'vuex'
import {
  init, get, put, getPublicNames,
  mintCoin, sendTxNotif, loadWalletData, readTxInboxData, createWallet, createTxInbox, transferCoin
} from './websafe'
// import safeCoins from 'safe-coins-wallet'

const inboxTagType = 20082018
const walletTagType = 1012017
let appInfo = {
  id: 'wallet.moinhodigital.0.1',
  name: 'Wallet',
  vendor: 'luandro'
}
const perms = {
  _public: ['Read', 'Insert', 'Update', 'Delete'],
  _publicNames: ['Read', 'Insert', 'Update', 'Delete']
}
const idsInfo = {
  key: 'ownContainer',
  tagType: walletTagType,
  name: 'Wallet Ids',
  description: 'Container to store user wallet ids'
}
let walletInfo = {
  name: 'Wallet',
  description: 'Container to receive notifications for wallet transactions',
  key: '__coins',
  tagType: walletTagType
}
let inboxInfo = {
  key: '__tx_enc_pk',
  metadataKey: '_metadata',
  name: 'Transaction Inbox',
  description: 'Container to receive notifications of transactions',
  tagType: inboxTagType
}
let assetInfo = {
  key: inboxInfo.key,
  tagType: inboxTagType
}

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appHandle: null,
    authUri: null,
    walletList: null,
    pk: null,
    wallet: null,
    inboxData: [],
    walletInput: 'Satoshi Nakamoto',
    assetForm: { asset: 'BTC', quantity: 3 },
    transferForm: 3
  },
  mutations: {
    init: (state, payload) => {
      const { appHandle, authUri } = payload
      state.authUri = authUri
      state.appHandle = appHandle
    },
    updateWalletInput: (state, payload) => {
      state.walletInput = payload
    },
    assetForm: (state, payload) => {
      state.assetForm = payload
    },
    transferForm: (state, payload) => {
      state.assetForm = payload
    },
    setWalletList: (state, payload) => {
      let walletList = []
      payload.map((item) => {
        let parsed = JSON.parse(Object.values(item)[0])
        parsed.id = Object.keys(item)[0]
        walletList.push(parsed)
      })
      state.walletList = walletList
    },
    setWallet: (state, payload) => {
      state.wallet = payload
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
    async getWallets ({ commit, state }) {
      const pubK = await getPublicNames(state.appHandle)
      console.log('pubNames', pubK)
      const walletList = await get(state.appHandle, idsInfo.key, idsInfo.tagType)
      console.log(walletList)
      commit('setWalletList', walletList)
    },
    async selectWallet ({commit, state}, index) {
      try {
        const serialisedWallet = state.walletList[index].wallet
        const pk = state.walletList[index].id
        inboxInfo.encPk = state.walletList[index].pk
        inboxInfo.encSk = state.walletList[index].sk
        console.log(inboxInfo)
        console.log(serialisedWallet, pk)
        const coinIds = await loadWalletData(state.appHandle, serialisedWallet, walletInfo.key)
        const inboxData = await readTxInboxData(state.appHandle, pk, inboxInfo)
        console.log('coinIds', coinIds)
        commit('inboxData', inboxData)
        commit('setWallet', state.walletList[index])
        console.log(state)
      } catch (err) {
        console.log('Error selecting wallet', err)
      }
    },
    async createWallet ({ commit, state }, input) {
      try {
        const wallet = await createWallet(state.appHandle, input, walletInfo)
        const inbox = await createTxInbox(state.appHandle, input, inboxInfo)
        let rawData = {
          wallet,
          pk: inbox.pk,
          sk: inbox.sk
        }
        const serialisedData = JSON.stringify(rawData)
        const saveWallet = await put(state.appHandle, idsInfo, { [input]: serialisedData })
        if (saveWallet) {
          const walletList = await get(state.appHandle, idsInfo.key, idsInfo.tagType)
          const coinIds = await loadWalletData(state.appHandle, wallet, walletInfo.key)
          console.log('coinIds', coinIds)
          rawData.id = input
          commit('setWallet', rawData)
          commit('setWalletList', walletList)
        }
      } catch (err) {
        console.log('Error creating wallet: ', err)
      }
    },
    async createAsset ({ commit, state }, formData) {
      const { asset, quantity } = formData
      assetInfo.name = asset
      const { appHandle, wallet } = state
      let mintedCoins = []
      async function mintCoins (privateKey, amount) {
        if (amount < 1 || privateKey.length < 1) {
          return mintedCoins
        }
        const coinId = await mintCoin(appHandle, privateKey, assetInfo)
        mintedCoins.push(coinId)
        return mintCoins(privateKey, amount - 1)
      }
      console.log(`Minting ${quantity} coins for '${wallet.id}'`)
      const coinIds = await mintCoins(wallet.id, quantity)
      console.log('Notifying coins transfer to recipient\'s wallet inbox...')
      const txId = await sendTxNotif(appHandle, wallet.id, coinIds, assetInfo)
      console.log(`Asset coins minted!`, txId)
      inboxInfo.encPk = wallet.pk
      inboxInfo.encSk = wallet.sk
      const inboxData = await readTxInboxData(appHandle, wallet.id, inboxInfo)
      await commit('inboxData', inboxData)
    },
    async transferAssets ({ commit, state }) {
      const { appHandle, wallet, inboxData } = state
      inboxData[0].coinIds.map(async (coinId) => {
        const coinInfo = {
          id: coinId,
          key: walletInfo.key,
          tagType: walletInfo.tagType
        }
        const transfer = await transferCoin(appHandle, wallet.id, wallet.sk, coinInfo, 'Satoshi Nakamoto')
        console.log('TX', transfer)
      })
    }
  }
})
