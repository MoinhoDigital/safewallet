<template>
  <md-card class="box">
    <md-card-header>
      <div class="md-title">Existing Wallets</div>
    </md-card-header>
    <md-card-content>
      <md-input-container>
        <label for="wallets">Wallets</label>
        <md-select v-model="select" name="wallets">
          <md-option v-for="(wallet, index) in wallets"
            :key="index"
            :value="index">
            {{wallet.id}}
          </md-option>
        </md-select>
      </md-input-container>
    </md-card-content>
    <md-card-actions>
      <md-button @click="selectWallet(select)">Enter</md-button>
    </md-card-actions>
  </md-card>
</template>

<script>
export default {
  data: () => ({
    select: null
  }),
  name: 'select-wallet',
  computed: {
    wallets () {
      return this.$store.state.walletList
    }
  },
  methods: {
    selectWallet () {
      this.$store.dispatch('selectWallet', this.select)
    }
  }
}
</script>

<style scoped>
</style>