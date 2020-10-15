const defaultTime = 500
/**
 * @description 防止短时间内快速点击, 默认值 500ms
 */
const fastClick = (el, binding) => {
  el.addEventListener('click', () => {
    let delayTime = parseInt(binding.value)
    delayTime = isNaN(delayTime) ? defaultTime : delayTime

    console.log('123')
    el.setAttribute('disabled', 'disabled')
    el.disabled = true
    let t = setTimeout(() => {
      clearTimeout(t)
      t = null
      el.disabled = false
      el.removeAttribute('disabled')
    }, delayTime) // 时间可以根据实际情况定
  })
}

export default {
  inserted(el, binding) {
    fastClick(el, binding)
  },
  updated(el, binding) {
    fastClick(el, binding)
  }
}
