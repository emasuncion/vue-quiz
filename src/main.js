import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store.js'
import './auth'
import './registerServiceWorker'
import dotenv from 'dotenv'

Vue.config.productionTip = false

dotenv.config()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
