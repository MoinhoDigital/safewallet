<template>
  <md-dialog
    :md-close-on-esc="close"
    :md-click-outside-to-close="close"
    :md-active.sync="showDialog">
    <md-dialog-title>Create Wallet</md-dialog-title>
      <md-field>
        <label>Wallet ID</label>
        <md-input v-model="input" required></md-input>
        <span class="md-error">Validation message</span>
      </md-field>
    <md-dialog-actions>
      <md-button class="md-primary" @click="createWallet(input)">Create</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
export default {
  name: 'create-wallet',
  computed: {
    close () {
      const { walletList } = this.$store.state
      if (!walletList || walletList.length < 1) {
        return false
      }
      return true
    },
    showDialog: {
      get () {
        const { walletList, modals } = this.$store.state
        if (!walletList || walletList.length < 1) {
          return true
        } else if (modals.createWallet) {
          return true
        }
        return false
      },
      set () {
        this.$store.dispatch('newWallet')
      }
    },
    input: {
      get () {
        return this.$store.state.input.walletInput
      },
      set (value) {
        this.$store.commit('updateWalletInput', value)
      }
    }
  },
  methods: {
    createWallet (input) {
      this.$store.dispatch('newWallet')
      this.$store.dispatch('createWallet', input)
    }
  }
}
</script>

<style scoped>
  .box {
    width: 300px;
  }
</style>