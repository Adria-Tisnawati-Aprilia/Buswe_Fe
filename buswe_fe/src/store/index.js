import Vue from 'vue'
import Vuex from 'vuex'

import bus from './bus.store'
import bus from './supir.store'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    bus,
    supir
  }
})
