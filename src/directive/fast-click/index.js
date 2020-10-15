import fastClick from './directive'

const install = function(Vue) {
  Vue.directive('fastClick', fastClick)
}

if (window.Vue) {
  Vue.use(install) // eslint-disable-line
}

fastClick.install = install
export default fastClick
