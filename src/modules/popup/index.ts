import { VuiComponent } from '@/types/module'
import Component from './component.vue'

const Popup = Component as typeof Component & typeof VuiComponent

Popup.install = function (Vue) {
  Vue.component('VuiPopup', Component)
}

export default Popup
