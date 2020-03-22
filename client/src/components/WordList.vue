<template>
  <div>
    <p>{{ words }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'WordList',
  data() {
    return {
      words: 'Hello!',
    };
  },
  created() {
    this.$store.dispatch('getWords')
    .then(() => {
      this.words = this.$store.state.wordList
    })
  }
})
</script>
<style>

</style>