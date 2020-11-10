import { VuiComponent } from '@/types/module'
import Component from './component.vue'

const Transition = Component as typeof Component & typeof VuiComponent

Transition.install = function (Vue) {
  Vue.component('VuiTransition', Component)
}

export default Transition
