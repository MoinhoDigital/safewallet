<template>
  <div class="auth">
    <div class="create">
        <h5>Create Wallet ID</h5>
        <md-input-container >
          <label>Wallet ID</label>
          <md-input v-model="input"></md-input>
        </md-input-container>
        <md-button @click="createWallet(input)">Create Wallet</md-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'auth',
  computed: {
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
    createWallet (input) {
      this.$store.dispatch('createWallet', input)
    }
  }
}
</script>

<style>
</style>
