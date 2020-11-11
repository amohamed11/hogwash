import consumer from "./consumer"

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
  },
  
  joinGame(data) {
    this.perform("joinGame", data);
    console.log("Sent joinGame request.");
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
