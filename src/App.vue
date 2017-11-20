<template>
  <div id="app">
    <md-toolbar>
      <div class="md-toolbar-section-start">
        <h3 class="md-title" style="flex: 1">Wallet</h3>
      </div>
      <md-button class="md-primary"><select-wallet /></md-button>
      <md-menu md-direction="bottom-start">
        <md-menu-content v-for="(wallet, index) in walletList" :key="index">
          <md-menu-item>{{wallet.id}}</md-menu-item>
        </md-menu-content>
      </md-menu>
      <md-button @click="newWallet">New Wallet</md-button>
      <md-button class="md-icon-button">
        <md-icon>more_vert</md-icon>
      </md-button>
    </md-toolbar>
    <div>
      <router-view/>
    </div>
    <create-wallet />
  </div>
</template>
<script>
import SelectWallet from '@/components/SelectWallet'
import CreateWallet from '@/components/CreateWallet'
export default {
  name: 'app',
  components: {
    'select-wallet': SelectWallet,
    'create-wallet': CreateWallet
  },
  mounted: function () {
    this.$nextTick(async function () {
      const { dispatch, state: { appHandle, authUri, walletList } } = this.$store
      if (!appHandle || !authUri) {
        await dispatch('init')
      }
      if (!walletList) {
        await dispatch('getWallets')
      }
    })
  },
  updated: function () {
    const { dispatch, state: { walletList, wallet } } = this.$store
    if (walletList && walletList.length > 0 && !wallet) {
      console.log('Selecting')
      dispatch('selectWallet', 0)
    }
  },
  computed: {
    wallet () {
      return this.$store.state.wallet
    },
    walletList () {
      console.log('State', this.$store.state)
      return this.$store.state.walletList
    }
  },
  methods: {
    newWallet () {
      this.$store.dispatch('newWallet')
    }
  }
}
</script>

<style>
#app {
}
</style>
