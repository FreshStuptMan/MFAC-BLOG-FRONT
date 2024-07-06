import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Manager_Tab: '',
  },
  getters: {
  },
  mutations: {
    setManagerTab(state, tab) {
      state.Manager_Tab = tab;
    }
  },
  actions: {
    updateManagerTab({ commit }, tab) {
      commit('setManagerTab', tab);
    }
  },
  modules: {
    user
  }
})
