<template>
  <div class="wallet">
      <div v-if="!walletSerialized">
        <md-input-container >
          <label>Your ID</label>
          <md-input v-model="input"></md-input>
        </md-input-container>
        <md-button @click="createWallet(input)">Create Wallet</md-button>
      </div>
      <div v-if="walletSerialized">
        <h4>Current wallet ID: {{ pk }}</h4>
        <md-input-container >
          <label>Asset Name:</label>
          <md-input v-model="assetForm.asset"></md-input>
          <md-input v-model="assetForm.quantity"></md-input>
        </md-input-container>
        <md-button @click="createAsset(assetForm)">Create Asset</md-button>
      </div>
      <h2>Coins: {{ coins }}</h2>
  </div>
</template>

<script>
export default {
  name: 'Wallet',
  computed: {
    walletSerialized () {
      return this.$store.state.walletSerialized
    },
    pk () {
      return this.$store.state.walletSerialized
    },
    coins () {
      return this.$store.state.inboxData
    },
    input: {
      get () {
        return this.$store.state.input
      },
      set (value) {
        this.$store.commit('updateInput', value)
      }
    },
    assetForm: {
      get () {
        return this.$store.state.assetForm
      },
      set (value) {
        this.$store.commit('assetForm', value)
      }
    }
  },
  methods: {
    createWallet (input) {
      this.$store.dispatch('createWallet', input)
    },
    createAsset (assetForm) {
      console.log('assetFOrm: ', assetForm)
      this.$store.dispatch('createAsset', assetForm)
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
</style>
