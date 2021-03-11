import { VuiComponent } from '@/types/module'
import Component from './component.vue'

const Video = Component as typeof Component & VuiComponent

Video.install = function (Vue) {
  Vue.component('VuiVideo', Component)
}

export default Video
