<template>
  <div class="hello">
      <h1>{{ appHandle || '...' }}</h1>
      <md-button @click="initialise">Initialise</md-button>
      <h1>{{ authUri || '...' }}</h1>
      <md-button @click="authorise">Authorise</md-button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  mounted: () => {
    console.log('Mounted@@@')
  },
  computed: {
    count () {
      return this.$store.state.count
    },
    appHandle () {
      return this.$store.state.appHandle
    },
    authUri () {
      return this.$store.state.authUri
    }
  },
  methods: {
    increment () {
      this.$store.commit('increment')
    },
    decrement () {
      this.$store.commit('decrement')
    },
    initialise () {
      this.$store.dispatch('startInitialise')
    },
    authorise () {
      this.$store.dispatch('startAuthorise')
    },
    setup () {
      this.$store.dispatch('setupAccount', input)
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
