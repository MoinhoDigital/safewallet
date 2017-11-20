<template>
  <md-field>
    <md-select v-model="input" name="wallets" placeholder="Wallets">
      <md-option v-for="(wallet, index) in wallets"
        :key="index"
        :value="index">
        {{wallet.id}}
      </md-option>
    </md-select>
  </md-field>
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
    },
    input: {
      get () {
        return this.$store.state.walletList
      },
      set (value) {
        this.$store.dispatch('selectWallet', value)
      }
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