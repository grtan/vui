import { VuiComponent } from '@/types/module'
import Component from './component.vue'

const Marquee = Component as typeof Component & VuiComponent

Marquee.install = function (Vue) {
  Vue.component('VuiMarquee', Component)
}

export default Marquee
