import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './mock/mockServer' // 加载mockServer即可
import {Button} from 'mint-ui'
import VueLazyload from 'vue-lazyload'
import loading from './common/imgs/1.gif'

Vue.config.productionTip = false
Vue.component(Button.name, Button) // <mt-button>
Vue.use(VueLazyload, { // 内部自定义一个指令lazy
  loading
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
