<template>
  <div>
    <h1>Portoflio </h1>
    <div class="box" v-for="coin in coins" :key="coin">
      <div class="item">
        {{coin}}
      </div>
      <div class="item line">
        <md-input-container>
          <md-input v-model="transferForm.receiver"></md-input>
          <md-input v-model="transferForm.quantity"></md-input>
        </md-input-container>
        <md-button @click="transferAssets(transferForm)">send</md-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'portfolio',
  computed: {
    coins () {
      console.log('Coins', this.$store.state.coins)
      return this.$store.state.coins
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
    transferAssets (transferForm) {
      this.$store.dispatch('transferAssets', transferForm)
    }
  }
}
</script>

<style scoped>
  .box {
    width: 100%;
    display: flex;
  }
  .item {
    width: 30%;
  }
</style>