import { VuiComponent } from '@/types/module'
import Component from './component.vue'

const Icon = Component as typeof Component & VuiComponent

Icon.install = function (Vue) {
  Vue.component('VuiIcon', Component)
}

export default Icon
