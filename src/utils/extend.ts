import { Vue } from 'vue-property-decorator'

// 扩展vue
export function extendVue(prop: string, value: any) {
  Vue.$vui = Vue.prototype.$vui = Vue.prototype.$vui ?? {}
  Vue.prototype.$vui[prop] = value
}
