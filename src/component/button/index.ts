import { Vue } from 'vue-property-decorator'
import Component from './component.vue'

// Component.name = 'VuiButton'
Component.install = function (vue: typeof Vue) {
  vue.component('VuiButton', Component)
}

export default Component
