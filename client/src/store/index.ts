import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isConnected: false,
    socketMessage: ''
  },
  mutations:{
    SOCKET_CONNECTED(state) {
      state.isConnected = true;
    },
    SOCKET_DISCONNECTED(state) {
      state.isConnected = false;
    },
    SOCKET_MESSAGECHANNEL(state, message) {
      state.socketMessage = message;
    }
  },
  actions: {
    SOCKET_CONNECT({ commit }) {
      commit("SOCKET_CONNECTED");
    },
    SOCKET_DISCONNECT({ commit }) {
      commit("SOCKET_DISCONNECTED");
    }
  },
  modules: {}
});
