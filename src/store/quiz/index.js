import db from '@/database'
import firebase from '@/firebase'

import {
  UPDATE_INFORMATION,
  ADD_QUESTION,
  UPDATE_QUESTION,
  REMOVE_QUESTION,
  ADD_ANSWER,
  REMOVE_ANSWER,
  UPDATE_ANSWER,
  RESET_QUIZ,
  PUSH_QUIZ,
  RESET_QUIZ_LIST,
  SET_QUIZ
} from './mutations'

const state = {
  newQuiz: {
    title: "",
    description: "",
    questions: [
      {
        question: "Question",
        points: 0,
        answers: [
          {
            isRight: false,
            answer: "Answer"
          }
        ]
      }
    ]
  },
  list: [],
  quiz: null
}

const getters = {
  newQuiz: ({newQuiz}) => newQuiz,
  list: ({list}) => list,
  quiz: ({quiz}) => quiz
}

const mutations = {
  [RESET_QUIZ](state) {
    state.newQuiz = {
      title: "",
      description: "",
      questions: []
    }
  },
  [UPDATE_INFORMATION](state, info) {
    state.newQuiz.title = info.title,
    state.newQuiz.description = info.description
  },
  [ADD_QUESTION](state) {
    state.newQuiz.questions.push({
      question: "Question",
      points: 0,
      answers: []
    })
  },
  [UPDATE_QUESTION](state, payload) {
    const question = state.newQuiz.questions[payload.questionIndex]

    question.question = payload.question
    question.points = payload.points
  },
  [REMOVE_QUESTION](state, questionIndex) {
    if (state.newQuiz.questions.length > 1) {
      state.newQuiz
        .questions
        .splice(questionIndex, 1)
    }
  },
  [ADD_ANSWER](state, questionIndex) {
    const answers = state.newQuiz.questions[questionIndex].answers
    if (answers.length < 5) {
      answers.push({
        answer: "Anotha one!",
        isRight: false
      })
    }
  },
  [REMOVE_ANSWER](state, payload) {
    const questionIndex = payload.questionIndex
    const answerIndex = payload.answerIndex

    const question = state.newQuiz.questions[questionIndex]

    if (question.answers.length > 1) {
      question.answers.splice(answerIndex, 1)
    }
  },
  [UPDATE_ANSWER](state, payload) {
    const questionIndex = payload.questionIndex
    const answerIndex = payload.answerIndex
    const answerText = payload.answer
    const isRight = payload.isRight

    const answer = state.newQuiz
      .questions[questionIndex]
      .answers[answerIndex]

    answer.isRight = isRight
    answer.answer = answerText
  },
  [PUSH_QUIZ](state, quiz) {
    state.list.push(quiz)
  },
  [RESET_QUIZ_LIST](state) {
    state.list = []
  },
  [SET_QUIZ](state, quiz) {
    state.quiz = quiz
  }
}

const actions = {
  async create({state}) {
    const user = firebase.auth().currentUser
    if (user) {
      const quiz = state.newQuiz

      if (!quiz.title || !quiz.description) {
        throw new Error('Quiz information is required!')
      }

      if (quiz.questions.length === 0) {
        throw new Error('Quiz is empty!')
      }

      quiz.questions.map(question => {
        if (question.answers.length === 0) {
          throw new Error(`Question ${question.question} doesn't have answers!`)
        }

        let hasRightAnswer = false

        question.answers.map(answer => {
          if (answer.isRight) {
            hasRightAnswer = true
          }
        })

        if (!hasRightAnswer) {
          throw new Error(`Question: '${question.question}' doesn't have a right answer selected!`)
        }
      })

      // save to database
      await db.collection('quizes').add({
        ...state.newQuiz,
        userId: user.uid
      })
      alert('Quiz created')
    } else {
      alert('Unauthorized')
    }
  },
  list({commit}) {
    commit(RESET_QUIZ_LIST)

    db.collection('quizes').onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === "added") {
          commit(PUSH_QUIZ, {
            id: change.doc.id,
            ...change.doc.data()
          })
        }
      })
    })
  },
  async get({commit}, id) {
    const quiz = await db.collection('quizes').doc(id).get()

    if (quiz.exists) {
      commit(SET_QUIZ, {
        id: quiz.id,
      ...quiz.data()
      })
    } else {
      console.log('No quiz')
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
