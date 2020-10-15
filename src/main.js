import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import '@/styles/index.scss' // global css
import '@/plugins/element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/plugins/execute-mock-xhr'

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import Pagination from '@/components/Pagination'
import permission from '@/directive/permission/index';
import fastClick from '@/directive/fast-click/index';

// 全局引入
Vue.component('Pagination', Pagination)
Vue.use(permission)
Vue.use(fastClick)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
