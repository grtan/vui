import { VuiComponent } from '@/types/module'
import Component from './component.vue'

const Overlayer = Component as typeof Component & VuiComponent

Overlayer.install = function (Vue) {
  Vue.component('VuiOverlayer', Component)
}

export default Overlayer
