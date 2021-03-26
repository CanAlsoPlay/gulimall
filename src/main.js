import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './mock/mockServer' // 加载mockServer即可
import {Button} from 'mint-ui'
import VueLazyload from 'vue-lazyload'
import loading from './common/imgs/1.gif'
import FastClick from 'fastclick'
import format from 'date-fns/format'

Vue.config.productionTip = false
Vue.component(Button.name, Button) // <mt-button>
// 引入fastclick并绑定到body 解决移动端点击响应延迟0.3s的问题
FastClick.attach(document.body)

Vue.use(VueLazyload, { // 内部自定义一个指令lazy
  loading
})

// 自定义过滤器
Vue.filter('datefmt', function (value, formatStr = 'YYYY-MM-DD HH:mm:ss') {
  // return moment(value).format(formatStr)
  return format(value, formatStr)
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
