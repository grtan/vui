/* eslint-disable */
import Vue from 'vue'
import { update } from '@/utils/store'
import Appear from '@/modules/appear'
import Button from '@/modules/button'
import Dialog from '@/modules/dialog'
import Disappear from '@/modules/disappear'
import Intersect from '@/modules/intersect'
import Overlayer from '@/modules/overlayer'
import Scroll from '@/modules/scroll'
import ScrollBottom from '@/modules/scroll-bottom'
import ScrollTop from '@/modules/scroll-top'

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
