import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import '@/styles/index.scss' // global css
import '@/plugins/element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/plugins/execute-mock-xhr'

import App from './App'
import store from '@/store'
import router from '@/router'

import '@/icons' // icon
import '@/permission' // permission control

import Pagination from '@/components/Pagination'
import permission from '@/directive/permission/index'
import fastClick from '@/directive/fast-click/index'
// 单页面 meta info 管理
import MetaInfo from 'vue-meta-info'

// 全局引入
Vue.component('Pagination', Pagination)
Vue.use(permission)
Vue.use(fastClick)

Vue.use(MetaInfo)
Vue.config.productionTip = false

// 尽在生产环境演示使用，再正式上线前需要可移除
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

new Vue({
  el: '#app',
  router,
  store,
  mounted() {
    // You'll need this for renderAfterDocumentEvent.
    document.dispatchEvent(new Event('render-event'))
  },
  render: h => h(App)
})
