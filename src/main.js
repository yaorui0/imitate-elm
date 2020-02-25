import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {fetch} from './axios/api.js'
import '@/common/stylus/css/reset.css'

require("./mock.js")


Vue.config.productionTip = false
Vue.prototype.$post = fetch

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
