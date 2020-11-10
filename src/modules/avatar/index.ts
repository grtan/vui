import { VuiComponent } from '@/types/module'
import Component from './component.vue'

const Avatar = Component as typeof Component & typeof VuiComponent

Avatar.install = function (vue) {
  vue.component('VuiAvatar', Component)
}

export default Avatar
