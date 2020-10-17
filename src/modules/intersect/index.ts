import { VuiDirective } from '@/types/module'
import ObserveVNodeDirective from '../appear/interface'

function unbind(el: HTMLElement) {
  if (!el._intersect) return

  el._intersect.observer.unobserve(el)
  delete el._intersect
}

function inserted(el: HTMLElement, binding: ObserveVNodeDirective) {
  const modifiers = binding.modifiers ?? {}
  const value = binding.value
  const { handler, options } = typeof value === 'object' ? value : { handler: value, options: {} }
  const observer = new IntersectionObserver((entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    if (!el._intersect) return

    const isIntersecting = Boolean(entries.find(entry => entry.isIntersecting))

    // bind 会触发一次回调，所以使用init参数控制，不调用外部的处理函数，只有初始化后，可见性再发生变化时才调用外部处理函数
    if (handler && el._intersect.init) handler(entries, observer, isIntersecting)

    if (el._intersect.init && modifiers.once) unbind(el)
    // 如果检测到once参数，在初始化后执行一次后取消监听
    else el._intersect.init = true
  }, options)

  el._intersect = { init: false, observer }

  observer.observe(el)
}

const directive: VuiDirective = {
  inserted,
  unbind,
  install(Vue) {
    Vue.directive('vui-intersect', directive)
  }
}

export default directive
