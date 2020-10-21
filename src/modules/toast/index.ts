import Component from './component.vue'
import { extendVue } from '@/utils/extend'

let vm: InstanceType<typeof Component>

function toast(content: string, options?: { duration?: number; allowHtml?: boolean; className?: string }) {
  if (!vm) {
    vm = new Component()
    vm.$mount(document.body.appendChild(document.createElement('div')))
  }

  ;(vm as any).show(content, options)
}

toast.install = function () {
  extendVue('toast', toast)
}

export default toast
