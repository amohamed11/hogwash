<template>
  <v-container class="home">
    <v-row>
      <v-col cols="12" md="12">
        <v-card
          id="word-card"
          class="my-10 mx-auto"
          max-width="400"
          height="100"
          shaped
        >
          <h1 class="text-center">Word</h1>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="12">
        <v-form @submit="onSumbit">
          <v-textarea 
            name="input-7-4" 
            label="Solo textarea"
            v-model="answer"
            solo 
          ></v-textarea>
          <v-btn type="submit" >Submit</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import WordList from "@/components/WordList.vue";

export default {
  name: "Home",
  data() {
    return {
      answer: ''
    }
  },
  methods: {
    onSumbit(evt) {
      evt.preventDefault();
      this.$store.dispatch("submitAnswer", this.answer);
    }
  }
};
</script>

<style lang="scss"></style>
