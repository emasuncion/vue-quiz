<template>
  <v-container>
    <v-layout wrap>
      <v-flex xs12>
        <v-text-field
          label="Title"
          :value="quiz.title"
          @input="updateTitle"
        ></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-textarea
          label="Description"
          :value="quiz.description"
          @input="updateDescription"
        ></v-textarea>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex'
  import { UPDATE_INFORMATION } from '@/store/quiz/mutations'

  export default {
    name: "quiz-information",
    computed: {
      ...mapGetters('quiz', {
        quiz: 'newQuiz'
      })
    },
    methods: {
      ...mapMutations('quiz', {
        updateInformation: UPDATE_INFORMATION
      }),
      updateTitle(value) {
        this.updateInformation({
          title: value,
          description: this.quiz.description
        })
      },
      updateDescription(value) {
        this.updateInformation({
          description: value,
          title: this.quiz.title
        })
      }
    }
  }
</script>
