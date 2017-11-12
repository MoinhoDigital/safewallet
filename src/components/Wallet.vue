<template>
  <div class="wallet">
      <md-layout md-gutter md-align="center">
        <md-layout md-align="center" md-gutter>
          <md-card>
            <md-card-header>
              <div class="md-title" v-if="!walletSerialized">Create new private key</div>
              <div class="md-title" v-else>Create a new asset</div>
            </md-card-header>
            <md-card-content>
              <div v-if="!walletSerialized">
                <md-input-container >
                  <label>Your ID</label>
                  <md-input v-model="input"></md-input>
                </md-input-container>
              </div>
              <div v-if="walletSerialized">
                <h4>Current wallet ID: {{ pk }}</h4>
                <md-input-container >
                  <label>Asset Name:</label>
                  <md-input v-model="assetForm.asset"></md-input>
                  <md-input v-model="assetForm.quantity"></md-input>
                </md-input-container>
              </div>
            </md-card-content>
            <md-card-actions>
              <md-button v-if="!walletSerialized" @click="createWallet(input)">Create Wallet</md-button>
              <md-button v-if="walletSerialized" @click="createAsset(assetForm)">Create Asset</md-button>
            </md-card-actions>
          </md-card>
        </md-layout>

        <md-layout md-align="center" md-gutter>
          <md-card>
            <md-card-header>
              <div class="md-title">Portfolio</div>
            </md-card-header>
            <md-card-content>
              <md-table>
                <md-table-header>
                  <md-table-row>
                    <md-table-head>Assets</md-table-head>
                    <md-table-head md-numeric>Quantity</md-table-head>
                  </md-table-row>
                </md-table-header>

                <md-table-body>
                    <md-table-row v-for="inbox in inboxes" :key="inbox.id">
                      <md-table-cell>{{inbox.name}}</md-table-cell>
                      <md-table-cell md-numeric>{{inbox.coinIds.length}}</md-table-cell>
                    </md-table-row>
                </md-table-body>
              </md-table>
            </md-card-content>
          </md-card>
        </md-layout>

        <md-layout md-align="center" md-gutter>
          <md-card>
            <md-card-header>
              <div class="md-title">Transactions</div>
            </md-card-header>
            <md-card-content>
              <md-table>
                <md-table-header>
                  <md-table-row>
                    <md-table-head>Asset</md-table-head>
                    <md-table-head md-numeric>Type</md-table-head>
                    <md-table-head md-numeric>Quantity</md-table-head>
                  </md-table-row>
                </md-table-header>

                <md-table-body>
                    <md-table-row v-for="inbox in inboxes" :key="inbox.id">
                      <md-table-cell>{{inbox.name}}</md-table-cell>
                      <md-table-cell class="green">received</md-table-cell>
                      <md-table-cell md-numeric>{{inbox.coinIds.length}}</md-table-cell>
                    </md-table-row>
                </md-table-body>
              </md-table>
            </md-card-content>
          </md-card>
        </md-layout>
      </md-layout>
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
      return this.$store.state.pk
    },
    inboxes () {
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
.green {
  color: green;
}
.wallet {
  padding-top: 60px;
  width: 100%;
}
</style>
