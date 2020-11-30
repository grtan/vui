import { VuiComponent } from '@/types/module'
import Component from './component.vue'

const Link = Component as typeof Component & typeof VuiComponent

Link.install = function (Vue) {
  Vue.component('VuiLink', Component)
}

export default Link
