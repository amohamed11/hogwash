<template>
  <div>
    <p v-if="isConnected">We're connected to the server!</p>
    <p>Message from server: "{{socketMessage}}"</p>
    <button @click="createRoom()">Ping Server</button>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      isConnected: false,
      socketMessage: ''
    }
  },

  sockets: {
    connect() {
      // Fired when the socket connects.
      this.$store.commit("SOCKET_CONNECTED")
    },

    disconnect() {
      this.$store.commit("SOCKET_DISCONNECTED")
    },

    // Fired when the server sends something on the "messageChannel" channel.
    messageChannel(data) {
      this.$store.commit("SOCKET_MESSAGECHANNEL", data)
    }
  },

  methods: {
    createRoom(room) {
      this.$socket.emit('createRoom', room)
    }
  }
})
</script>