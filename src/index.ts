/* eslint-disable */
import Vue from 'vue'
import Button from './component/button'
import Appear from './directive/appear'
import Disappear from './directive/disappear'
import Intersect from './directive/intersect'
import Scroll from './directive/scroll'
import ScrollBottom from './directive/scroll-bottom'
import ScrollTop from './directive/scroll-top'

function install(vue: typeof Vue) {
  [Button, Appear, Disappear, Intersect, Scroll, ScrollBottom, ScrollTop].forEach(function (item) {
    vue.use(item)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export { install, Button, Appear, Disappear, Intersect, Scroll, ScrollBottom, ScrollTop }
export default {
  install
}
