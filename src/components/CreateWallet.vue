<template>
  <md-card class="box">
    <md-card-header>
      <div class="md-title">Create Wallet</div>
    </md-card-header>
    <md-card-content>
      <md-input-container >
        <label>Wallet ID</label>
        <md-input v-model="input" required></md-input>
        <span class="md-error">Validation message</span>
      </md-input-container>
    </md-card-content>
    <md-card-actions>
      <md-button @click="createWallet(input)">Create Wallet</md-button>
    </md-card-actions>
  </md-card>
</template>

<script>
export default {
  name: 'create-wallet',
  computed: {
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