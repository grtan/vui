import Component from './component.vue'
import { extendVue } from '@/utils/extend'

let vm: InstanceType<typeof Component>

function Toast(content: string, options?: { duration?: number; allowHtml?: boolean; className?: string }) {
  if (!vm) {
    vm = new Component()
    vm.$mount(document.body.appendChild(document.createElement('div')))
  }

  ;(vm as any).show(content, options)
}

Toast.install = function () {
  extendVue('toast', Toast)
}

export default Toast
