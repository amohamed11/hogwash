import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    wordList: []
  },
  mutations: {
    setWordList(state, list) {
      state.wordList = list
    }
  },
  actions: {
    getWords({ commit }) {
      axios.get('http://localhost:5000/')
        .then(response => {
          commit('setWordList', response.data)
        })
        .catch(error => {
          console.error(error);
        });
    },
  },
  modules: {}
});
