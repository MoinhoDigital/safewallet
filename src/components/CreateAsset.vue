<template>
  <div>
    <md-layout md-align="center" md-gutter md-row-large>
      <md-card class="card hero">
        <md-card-header>
          <div class="md-title">Create a new asset</div>
        </md-card-header>
        <md-card-content>
          <div>
            <h4>Current wallet ID: {{ pk }}</h4>
            <md-input-container >
              <label>Asset Name:</label>
              <md-input v-model="assetForm.asset"></md-input>
              <md-input v-model="assetForm.quantity"></md-input>
            </md-input-container>
          </div>
        </md-card-content>
        <md-card-actions>
          <md-button @click="createAsset(assetForm)">Create Asset</md-button>
        </md-card-actions>
      </md-card>
    </md-layout>
  </div>
</template>

<script>
export default {
  name: 'create-asset',
  computed: {
    pk () {
      return this.$store.state.pk
    },
    assetForm: {
      get () {
        return this.$store.state.input.assetForm
      },
      set (value) {
        this.$store.commit('assetForm', value)
      }
    }
  },
  methods: {
    createAsset (assetForm) {
      this.$store.dispatch('createAsset', assetForm)
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