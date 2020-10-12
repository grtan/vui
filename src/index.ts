import Vue from 'vue'
import Button from './component/button'
import Test from './component/test'

function install(vue: typeof Vue) {
  ;[Button].forEach(function (item) {
    if (item.install) {
      vue.use(item)
    }
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export { install, Button, Test }
export default {
  install
}
