import Vue from 'vue'
import Vuex from 'vuex'

import bus from './bus.store'
import bus from './supir.store'
import bus from './terminal.store'

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
    supir,
    terminal
  }
})
