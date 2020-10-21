import { Vue } from 'vue-property-decorator'
import Component from './component.vue'

Component.install = function (vue: typeof Vue) {
  vue.component('VuiAvatar', Component)
}

export default Component
