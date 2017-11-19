<template>
  <div>
    <h1>Transactions</h1>
    <div class="box" v-for="inbox in inboxes" :key="inbox.id">
      <div class="item">
        {{inbox.name}}
      </div>
      <div class="item">
        {{inbox.coinIds.length}}
      </div>
      <div class="item">
        <span :class="inbox.type">{{inbox.type}}</span>
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
  name: 'transactions',
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
  }
  .sent {
    color: red;
  }
  .received {
    color: green;
  }
  .minted {
    color: gold;
  }
</style>