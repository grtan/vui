import { VuiComponent } from '@/types/module'
import Component from './component.vue'

const Button = Component as typeof Component & VuiComponent

Button.install = function (Vue) {
  Vue.component('VuiButton', Component)
}

export default Button
