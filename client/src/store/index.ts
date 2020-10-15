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
    SOCKET_CREATEROOM(state, message) {
      state.socketMessage = message;
    }
  },
  actions: {},
  modules: {}
});
