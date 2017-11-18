<template>
  <div id="app">
    <md-toolbar>
      <md-button class="md-icon-button md-list-action">
        <md-icon></md-icon>
      </md-button>
      <h2 class="md-title" style="flex: 1">Safe Wallet</h2>
    </md-toolbar>
    <md-layout md-gutter>
      <router-view/>
    </md-layout>
    <fab
      @cache="cache"
      @alertMe="alert"
    ></fab>
  </div>
</template>

<script>
import fab from 'vue-fab'
export default {
  name: 'app',
  components: {
    fab
  },
  mounted: function () {
    this.$nextTick(async function () {
      const { dispatch, state: { appHandle, authUri, wallets } } = this.$store
      if (!appHandle || !authUri) {
        await dispatch('init')
      }
      if (!wallets) {
        await dispatch('getWallets')
      }
    })
  },
  data () {
    return {
      bgColor: '#778899',
      position: 'top-right',
      fabActions: [
        {
          name: 'cache',
          icon: 'cached'
        },
        {
          name: 'alertMe',
          icon: 'add_alert'
        }
      ]
    }
  },
  methods: {
    cache () {
      console.log('Cache Cleared')
    },
    alert () {
      alert('Clicked on alert icon')
    }
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
