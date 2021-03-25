import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './mock/mockServer' // 加载mockServer即可
import {Button} from 'mint-ui'

Vue.config.productionTip = false
Vue.component(Button.name, Button) // <mt-button>
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
