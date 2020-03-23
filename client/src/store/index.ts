import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { Word } from "@/models/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    wordList: [] as Word[]
  },
  mutations: {
    setWordList(state, list: Word[]) {
      state.wordList = list;
    }
  },
  actions: {
    async getWords({ commit }) {
      await axios
        .get("http://localhost:5000/api/getWords")
        .then(response => {
          const mappedResponse: Word[] = response.data.map(
            (w: any) =>
              ({
                text: Object.keys(w)[0],
                definition: w[Object.keys(w)[0]]
              } as Word)
          );
          commit("setWordList", mappedResponse);
        })
        .catch(error => {
          console.error(error);
        });
    },
    submitAnswer({ commit }, answer) {
      axios
      .post("http://localhost:5000/api/submitAnswer", {
        answer: answer
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error(error);
      });
    }
  },
  modules: {}
});
