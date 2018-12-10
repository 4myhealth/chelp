import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isMenuActive: false,
  },
  getters: {
    isMenuActive: state => state.isMenuActive,
  },
  mutations: {
    setMenuActive(state, status) {
      state.isMenuActive = status;
    },
  },
  actions: {
    setMenuActive({ commit }, status) {
      commit('setMenuActive', status);
    },
  },
});
