<template>
  <div class="container">
    <p v-if="isConnected">We're connected to the server!</p>
    <p>Message from server: "{{ socketMessage }}"</p>
    <section>
      <div class="container">
        <b-field class="room-code-field">
          <b-input title="Enter room code" maxlength="5" v-model="roomCode"></b-input>
          <p class="control">
            <b-button type="is-primary" @click="createRoom()">
              Create Room
            </b-button>
          </p>
        </b-field>
      </div>
    </section>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      isConnected: this.$store.state.isConnected,
      socketMessage: this.$store.state.socketMessage,
      roomCode: "",
    };
  },

  sockets: {
    connect() {
      // Fired when the socket connects.
      this.$store.commit("SOCKET_CONNECTED");
    },

    disconnect() {
      this.$store.commit("SOCKET_DISCONNECTED");
    },

    // Fired when the server sends something on the "messageChannel" channel.
    createRoom(data) {
      this.$store.commit("SOCKET_CREATEROOM", data);
    }
  },

  methods: {
    createRoom() {
      this.$socket.emit("createRoom", this.roomCode);
      this.$buefy.notification.open("Room created!!");
    }
  }
});
</script>

<style lang="scss">
.room-code-field {
  padding-left: 30%;
}
</style>
