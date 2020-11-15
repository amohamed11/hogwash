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
    console.log(data);
  },
  
  joinGame(player_name, room_code) {
    this.perform("joinGame", {"player_name": player_name, "room_code": room_code});
  },

  createGame(player_name, word_count) {
    this.perform("createGame", {"player_name": player_name, "word_count": word_count});
  },

  onAnswer(data)  {
    let score = this.perform("onAnswer", data);
    console.log(score);
  },

  onVote(data) {
    this.perform("onVote", data);
  },

  onGameEnd() {
    this.perform("onGameEnd", data);
  }

});
