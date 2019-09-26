// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入axios，并加到原型链中
import axios from 'axios'
import QS from 'qs'
// 引入公共js
import commonMethod from './common/commonMethod.js'
// 接口
import api from '../src/request/api/index'
Vue.prototype.commonMethod = commonMethod

Vue.prototype.$api = api

Vue.prototype.$axios = axios
Vue.prototype.qs = QS

Vue.config.productionTip = false
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // components: { App },
  // template: '<App/>'
  render: h => h(App)
})
