/* eslint-disable */
import Vue from 'vue'
import { update } from '@/utils/store'
import Appear from './appear'
import Avatar from './avatar'
import Button from './button'
import Dialog from './dialog'
import Disappear from './disappear'
import HistoryAction from './history-action'
import Intersect from './intersect'
import Loading from './loading'
import Overlayer from './overlayer'
import Scroll from './scroll'
import ScrollBottom from './scroll-bottom'
import ScrollTop from './scroll-top'
import Tag from './tag'
import Toast from './toast'
import Transition from './transition'

function install(
  vue: typeof Vue,
  options?: {
    // 全局配置
    config?: Parameters<typeof update>[0]
    // 插件参数
    plugins?: Record<string, any>
  }
) {
  const names: string[] = ['Appear', 'Avatar', 'Button', 'Dialog', 'Disappear', 'HistoryAction', 'Intersect', 'Loading', 'Overlayer', 'Scroll', 'ScrollBottom', 'ScrollTop', 'Tag', 'Toast', 'Transition']

  if (options?.config) {
    update(options.config)
  }

  ;[Appear, Avatar, Button, Dialog, Disappear, HistoryAction, Intersect, Loading, Overlayer, Scroll, ScrollBottom, ScrollTop, Tag, Toast, Transition].forEach(
    function (item, index) {
      vue.use(item, options?.plugins?.[names[index]])
    }
  )
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export { Appear, Avatar, Button, Dialog, Disappear, HistoryAction, Intersect, Loading, Overlayer, Scroll, ScrollBottom, ScrollTop, Tag, Toast, Transition }
export default {
  install
}
