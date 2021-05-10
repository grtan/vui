import { VuiComponent } from '@/types/module'
import Component from './component.vue'

const Popover = Component as typeof Component & VuiComponent

Popover.install = function (Vue) {
  Vue.component('VuiPopover', Component)
}

export default Popover
