import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import '@/styles/index.scss' // global css
import 'element-ui/lib/theme-chalk/index.css'
import '@/plugins/element-ui'
import '@/plugins/execute-mock-xhr'

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import Pagination from '@/components/Pagination'

// 全局引入
Vue.component('Pagination', Pagination)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
