<template>
  <div class="wrapper">
    <h1>Wallet <span class="credit">by <a>Moinho Digital</a></span></h1>
  </div>
</template>

<script>
export default {
  name: 'toolBar',
  computed: {
    wallet () {
      return this.$store.state.wallet
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
  .wrapper {
    width: 100%;
    display: flex;
    min-height: 64px;
    background: green;
    color: #fff;
    padding: 8px 0;
  }
</style>