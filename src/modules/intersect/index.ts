import 'intersection-observer'
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

    if (handler) handler(entries, observer, isIntersecting)

    if (modifiers.once) unbind(el)
  }, options)

  el._intersect = { observer }

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
