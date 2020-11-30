import Vue from 'vue'

// 扩展vue
export function extendVue(vue: typeof Vue, prop: string, value: any) {
  vue.$vui = vue.prototype.$vui = vue.prototype.$vui ?? {}
  vue.prototype.$vui[prop] = value
}
