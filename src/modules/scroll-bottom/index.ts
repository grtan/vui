import { VuiDirective } from '@/types/module'
import { ScrollVNodeDirective } from '../scroll/interface'

function unbind(el: HTMLElement) {
  if (!el._bottom) return

  const { handler } = el._bottom

  el.removeEventListener('scroll', handler)
  delete el._bottom
}

function inserted(el: HTMLElement, binding: ScrollVNodeDirective) {
  const { once = false } = binding.modifiers ?? {}
  const value = binding.value

  if (!value) return

  const handler = () => {
    if (el.scrollTop + el.clientHeight >= el.scrollHeight) {
      value()
      once && unbind(el)
    }
  }

  el.addEventListener('scroll', handler, { passive: true })

  el._bottom = {
    handler
  }
}

const directive: VuiDirective = {
  inserted,
  unbind,
  install(Vue) {
    Vue.directive('vui-scroll-bottom', directive)
  }
}

export default directive
