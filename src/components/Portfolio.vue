<template>
  <div>
    <h1>Portoflio </h1>
    <div class="box" v-for="inbox in inboxes" :key="inbox.id">
      <div class="item">
        {{inbox.name}}
      </div>
      <div class="item">
        {{inbox.coinIds.length}}
      </div>
      <div class="item">
        {{inbox.name}}
      </div>
      <div class="item line">
        <md-input-container>
          <md-input v-model="transferForm"></md-input>
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
    inboxes () {
      return this.$store.state.inboxData
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

<style>
  .box {
    width: 100%;
    display: flex;
  }
  .item {
    width: 30%;
  }
</style>