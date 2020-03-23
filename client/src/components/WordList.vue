<template>
  <div>
    <p v-for="word in wordList" :key="word.text">
      {{ word.text + ": "  + word.definition}}
    </p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Word } from "../models/index";

export default Vue.extend({
  name: "WordList",
  data() {
    return {
      wordList: [] as Word[]
    };
  },
  mounted() {
    this.$store.dispatch("getWords").then(() => {
      this.wordList = this.$store.state.wordList;
    });
  }
});
</script>
<style></style>
