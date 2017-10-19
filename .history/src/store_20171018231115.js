import Vue from 'vue'
import Vuex from 'vuex'
import { initialiseApp, authorizeApp } from './utils/safeApp';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment: state => state.count++,
    decrement: state => state.count--
  },
  actions: {
    startInitializeApp ({ commit }) {
      const 
    }
  }
})
