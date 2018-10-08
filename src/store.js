import Vue from 'vue'
import Vuex from 'vuex'

import user from '@/store/user'
import quiz from '@/store/quiz'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    awesome: false
  },
  modules: {
    user,
    quiz
  }
})
