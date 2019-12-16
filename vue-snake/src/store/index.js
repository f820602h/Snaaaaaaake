import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    gameState: 'Start',
  },
  mutations: {
    SET_GAME_STATE(state, payload) {
      state.gameState = payload;
    },
  },
  actions: {
  },
  modules: {
  },
});
