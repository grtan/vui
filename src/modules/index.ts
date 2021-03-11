import Vue from 'vue'
import Appear from './appear'
import Avatar from './avatar'
import Button from './button'
import Config from './config'
import Dialog from './dialog'
import Disappear from './disappear'
import HistoryAction from './history-action'
import Icon from './icon'
import ImagePreviewer from './image-previewer'
import Intersect from './intersect'
import Link from './link'
import Overlayer from './overlayer'
import Popup from './popup'
import Scroll from './scroll'
import ScrollBottom from './scroll-bottom'
import ScrollTop from './scroll-top'
import Tag from './tag'
import Toast from './toast'
import Transition from './transition'
import Video from './video'

function install(
  vue: typeof Vue,
  // 插件参数
  options?: Record<string, any>
) {
  const names: string[] = [
    'Appear',
    'Avatar',
    'Button',
    'Config',
    'Dialog',
    'Disappear',
    'HistoryAction',
    'Icon',
    'ImagePreviewer',
    'Intersect',
    'Link',
    'Overlayer',
    'Popup',
    'Scroll',
    'ScrollBottom',
    'ScrollTop',
    'Tag',
    'Toast',
    'Transition',
    'Video'
  ]

  ;[
    Appear,
    Avatar,
    Button,
    Config,
    Dialog,
    Disappear,
    HistoryAction,
    Icon,
    ImagePreviewer,
    Intersect,
    Link,
    Overlayer,
    Popup,
    Scroll,
    ScrollBottom,
    ScrollTop,
    Tag,
    Toast,
    Transition,
    Video
  ].forEach(function (item, index) {
    if (typeof (item as any).install !== 'function') {
      return
    }

    vue.use(item as any, options?.[names[index]])
  })
}

export {
  Appear,
  Avatar,
  Button,
  Config,
  Dialog,
  Disappear,
  HistoryAction,
  Icon,
  ImagePreviewer,
  Intersect,
  Link,
  Overlayer,
  Popup,
  Scroll,
  ScrollBottom,
  ScrollTop,
  Tag,
  Toast,
  Transition,
  Video
}
export default {
  version: '2.3.0',
  install,
  config: Config
}
