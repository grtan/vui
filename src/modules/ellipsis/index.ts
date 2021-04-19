import { VuiComponent } from '@/types/module'
import Component from './component.vue'

const Ellipsis = Component as typeof Component & VuiComponent

Ellipsis.install = function (Vue) {
  Vue.component('VuiEllipsis', Component)
}

export default Ellipsis
