<template>
  <div id="app">
    <md-toolbar>
      <md-button class="md-icon-button">
        <!-- <md-icon>#</md-icon> -->
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
    this.$nextTick(function () {
      const { dispatch, state: { appHandle, authUri } } = this.$store
      if (!appHandle || !authUri) {
        dispatch('init')
      }
    })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
}
</style>
