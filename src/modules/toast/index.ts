import { PluginFunction } from 'vue'
import Component from './component.vue'
import { extendVue } from '@/utils/extend'

let vm: InstanceType<typeof Component>

function Toast(
  content: string,
  options?: { duration?: number; allowHtml?: boolean; className?: string; target?: string | Element }
) {
  let target = options?.target ?? 'body'

  if (typeof target === 'string') {
    target = document.querySelector(target)!
  }

  if (!target) {
    throw new Error('target指定的元素不存在')
  }

  // 全局共用一个toast组件实例
  if (!vm) {
    vm = new Component()
    vm.$mount()
  }

  // 将组件根节点挂载到target下
  if (vm.$el.parentElement !== target) {
    target.appendChild(vm.$el)
  }

  ;(vm as any).show(content, options)
}

Toast.install = function (Vue) {
  extendVue(Vue, 'toast', Toast)
} as PluginFunction<any>

export default Toast
