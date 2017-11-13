<template>
  <div class="wallet">
      <!-- Quebrar em vários componentes -->
      <!-- Painel -->
      <md-layout md-gutter md-align="center">
        <select-wallet></select-wallet>
        <create-wallet></create-wallet>
        <md-layout md-align="center" md-gutter md-row-large>
          <!-- Inputs -->
          <md-card class="card hero">
            <md-card-header>
              <div class="md-title">Create a new asset</div>
            </md-card-header>
            <md-card-content>
              <div>
                <h4>Current wallet ID: {{ pk }}</h4>
                <md-input-container >
                  <label>Asset Name:</label>
                  <md-input v-model="assetForm.asset"></md-input>
                  <md-input v-model="assetForm.quantity"></md-input>
                </md-input-container>
              </div>
            </md-card-content>
            <md-card-actions>
              <md-button @click="createAsset(assetForm)">Create Asset</md-button>
            </md-card-actions>
          </md-card>
        </md-layout>
        <md-layout md-align="center" md-gutter md-flex="90">
          <md-layout md-align="center" md-gutter md-flex="45" class="layout">
            <md-table-card class="card">
              <md-card-header>
                <div class="md-title">Portfolio</div>
              </md-card-header>
              <md-card-content>
                <md-table>
                  <md-table-header>
                    <md-table-row>
                      <md-table-head>Assets</md-table-head>
                      <md-table-head>Quantity</md-table-head>
                    </md-table-row>
                  </md-table-header>

                  <md-table-body>
                      <md-table-row v-for="inbox in inboxes" :key="inbox.id">
                        <md-table-cell>{{inbox.name}}</md-table-cell>
                        <md-table-cell md-numeric>{{inbox.coinIds.length}}</md-table-cell>
                        <md-table-cell>
                          <md-input-container>
                            <md-input v-model="transferForm"></md-input>
                          </md-input-container>
                        </md-table-cell>
                        <md-table-cell>
                          <md-button @click="transferAssets(transferForm)">send</md-button>
                        </md-table-cell>
                      </md-table-row>
                  </md-table-body>
                </md-table>
              </md-card-content>
            </md-table-card>
          </md-layout>

          <md-layout md-align="center" md-gutter md-flex="45" class="layout">
            <md-table-card class="card">
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
            </md-table-card>
          </md-layout>
        </md-layout>
      </md-layout>
  </div>
</template>

<script>
import SelectWallet from './SelectWallet.vue'
import CreateWallet from './CreateWallet.vue'
export default {
  name: 'wallet',
  components: {
    'select-wallet': SelectWallet,
    'create-wallet': CreateWallet
  },
  computed: {
    walletList () {
      return this.$store.state.walletList
    },
    pk () {
      return this.$store.state.pk
    },
    inboxes () {
      return this.$store.state.inboxData
    },
    assetForm: {
      get () {
        return this.$store.state.assetForm
      },
      set (value) {
        this.$store.commit('assetForm', value)
      }
    },
    transferForm: {
      get () {
        return this.$store.state.transferForm
      },
      set (value) {
        this.$store.commit('transferForm', value)
      }
    }
  },
  methods: {
    createAsset (assetForm) {
      this.$store.dispatch('createAsset', assetForm)
    },
    transferAssets (transferForm) {
      this.$store.dispatch('transferAssets', transferForm)
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
  width: 100%;
}
.layout {
  padding: 35px 0;
}
.card {
  width: 100%;
  padding: 10%;
}
.hero {
  /* width: 95%; */
}
</style>
