/* eslint-disable */
import Vue from 'vue'
import { update } from '@/utils/store'
import Appear from './appear'
import Button from './button'
import Dialog from './dialog'
import Disappear from './disappear'
import Intersect from './intersect'
import Overlayer from './overlayer'
import Scroll from './scroll'
import ScrollBottom from './scroll-bottom'
import ScrollTop from './scroll-top'

function install(
  vue: typeof Vue,
  options?: {
    // 全局配置
    config?: Parameters<typeof update>[0]
    // 插件参数
    plugins?: Record<string, any>
  }
) {
  const names: string[] = ['Appear', 'Button', 'Dialog', 'Disappear', 'Intersect', 'Overlayer', 'Scroll', 'ScrollBottom', 'ScrollTop']

  if (options?.config) {
    update(options.config)
  }

  ;[Appear, Button, Dialog, Disappear, Intersect, Overlayer, Scroll, ScrollBottom, ScrollTop].forEach(
    function (item, index) {
      vue.use(item, options?.plugins?.[names[index]])
    }
  )
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export { install, Appear, Button, Dialog, Disappear, Intersect, Overlayer, Scroll, ScrollBottom, ScrollTop }
export default {
  install
}
