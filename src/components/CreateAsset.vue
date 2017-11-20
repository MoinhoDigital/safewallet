<template>
  <div>
    <div>
      <md-card class="card hero">
        <md-card-header>
          <div class="md-title">Create a new asset</div>
        </md-card-header>
        <md-card-content>
          <div>
            <h4>Current wallet ID: {{ pk }}</h4>
            <md-field>
              <label>Asset Name:</label>
              <md-input v-model="assetForm.asset"></md-input>
              <md-input v-model="assetForm.quantity"></md-input>
            </md-field>
          </div>
        </md-card-content>
        <md-card-actions>
          <md-button @click="createAsset(assetForm)">Create Asset</md-button>
        </md-card-actions>
      </md-card>
    </div>
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