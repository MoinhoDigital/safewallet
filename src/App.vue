<template>
  <div id="app">
    <md-toolbar>
      <md-button class="md-icon-button md-list-action">
        <md-icon>code</md-icon>
      </md-button>
      <h2 class="md-title" style="flex: 1">Safe Wallet</h2>
    </md-toolbar>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted: function () {
    this.$nextTick(async function () {
      const { dispatch, state: { appHandle, authUri } } = this.$store
      if (!appHandle || !authUri) {
        await dispatch('init')
        const wallet = await dispatch('getWallet')
        console.log('W', wallet)
      }
    })
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
}
</style>
