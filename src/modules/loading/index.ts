import { VuiComponent } from '@/types/module'
import Component from './component.vue'

const Loading = Component as typeof Component & typeof VuiComponent

Loading.install = function (Vue) {
  Vue.component('VuiLoading', Component)
}

export default Loading
