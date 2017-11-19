<template>
  <div class="wrapper">
      <div class="container">
        <div class="auth" v-if="!wallet">
          <selectWallet></selectWallet>
          <createWallet></createWallet>
        </div>
        <div class="wallet" v-else>
          <createAsset></createAsset>
          <portfolio />
          <transactions />
        </div>
      </div>
  </div>
</template>

<script>
import SelectWallet from './SelectWallet.vue'
import CreateWallet from './CreateWallet.vue'
import Portfolio from './Portfolio.vue'
import Transactions from './Transactions.vue'
import CreateAsset from './CreateAsset.vue'
export default {
  name: 'wallet',
  components: {
    'selectWallet': SelectWallet,
    'createWallet': CreateWallet,
    'portfolio': Portfolio,
    'transactions': Transactions,
    'createAsset': CreateAsset
  },
  computed: {
    wallet () {
      console.log('State', this.$store.state)
      return this.$store.state.wallet
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.wrapper {
  width: 100%;
}
</style>
