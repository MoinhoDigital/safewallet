<template>
  <div class="wallet">
      <h1>{{ appHandle || '...' }}</h1>
      <md-button @click="initialise">Initialise</md-button>
      <h1>{{ authUri || '...' }}</h1>
      <md-button @click="authorise">Authorise</md-button>
      <md-input-container>
        <label>Your ID</label>
        <md-input v-model="input"></md-input>
      </md-input-container>
      <md-button @click="createWallet(input)">Setup Account</md-button>
  </div>
</template>

<script>
export default {
  name: 'Wallet',
  mounted: () => {
    console.log('Mounted@@@Wallet')
  },
  computed: {
    appHandle () {
      return this.$store.state.appHandle
    },
    authUri () {
      return this.$store.state.authUri
    },
    input: {
      get () {
        return this.$store.state.input
      },
      set (value) {
        this.$store.commit('updateInput', value)
      }
    }
  },
  methods: {
    initialise () {
      this.$store.dispatch('startInitialise')
    },
    authorise () {
      this.$store.dispatch('startAuthorise')
    },
    createWallet (input) {
      this.$store.dispatch('createWallet', input)
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
