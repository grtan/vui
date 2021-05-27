import { VuiComponent } from '@/types/module'
import Component from './component'

const Image = Component as typeof Component & VuiComponent

Image.install = function (Vue) {
  Vue.component('VuiImage', Component)
}

export default Image
