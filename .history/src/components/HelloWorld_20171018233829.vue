<template>
  <div class="hello">
      <md-button @click="initialise">Initialise</md-button>
      <h1>{{ initialised || 'NOT INITIAliseD' }}</h1>
      <h3>{{ count }}</h3>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
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
    initialised () {
      return this.$store.state.initialized
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
      console.log('hi')
      this.$store.dispatch('startInitialise')
    }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
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
