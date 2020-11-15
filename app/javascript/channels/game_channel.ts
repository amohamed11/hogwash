import consumer from "./consumer"
import { CREATE_GAME } from "../store/actions/actionTypes";
import { gameCreated } from "../store/actions/game";
import store from "../store/index";

consumer.subscriptions.create("GameChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
    console.log("Connection succeeded.");
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
    console.log("Disconnected from server.");
  },

  received(data) {
    // Called when there's incoming data on the websocket for this channel
    store.dispatch({type: CREATE_GAME, payload: data});
  },
  
  joinGame(player_name, room_code) {
    this.perform("joinGame", {"player_name": player_name, "room_code": room_code});
  },

  createGame(player_name, word_count) {
    this.perform("createGame", {"player_name": player_name, "word_count": word_count});
  },

  onAnswer(data)  {
    this.perform("onAnswer", data);
  },

  onVote(data) {
    this.perform("onVote", data);
  },

  onGameEnd(data) {
    this.perform("onGameEnd", data);
  }

});
