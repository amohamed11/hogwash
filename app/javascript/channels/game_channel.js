import consumer from "./consumer"

consumer.subscriptions.create("GameChannel", {
  // connected() {
  //   // Called when the subscription is ready for use on the server
  // },

  // disconnected() {
  //   // Called when the subscription has been terminated by the server
  // },

  // received(data) {
  //   // Called when there's incoming data on the websocket for this channel
  // },
  joinGame(data) {
    this.perform("joinGame", data);
  },

  createGame(data) {
    this.perform("createGame", data);
  },

  onAnswer(data) {
    this.perform("onAnswer", data);
  },

  onVote(data) {
    this.perform("onVote", data);
  },

  onGameEnd() {
    this.perform("onGameEnd", data);
  }

});
