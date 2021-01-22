import { VuiComponent } from '@/types/module'
import Component from './component.vue'

const ImagePreviewer = Component as typeof Component & VuiComponent

ImagePreviewer.install = function (Vue) {
  Vue.component('VuiImagePreviewer', Component)
}

export default ImagePreviewer
