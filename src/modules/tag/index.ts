import { VuiComponent } from '@/types/module'
import Component from './component.vue'

const Tag = Component as typeof Component & typeof VuiComponent

Tag.install = function (Vue) {
  Vue.component('VuiTag', Component)
}

export default Tag
