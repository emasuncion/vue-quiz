import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Create from '@/views/Create'
import Quiz from '@/views/Quiz'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/create',
      name: 'Create',
      component: Create
    },
    {
      path: '/quiz/:id',
      name: 'Quiz',
      component: Quiz
    }
  ]
})
