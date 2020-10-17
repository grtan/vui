import { VuiDirective } from '@/types/module'
import { ScrollVNodeDirective } from './interface'

function unbind(el: HTMLElement) {
  if (!el._scroll) return

  const { handler } = el._scroll

  el.removeEventListener('scroll', handler)
  delete el._scroll
}

function inserted(el: HTMLElement, binding: ScrollVNodeDirective) {
  const { once = false } = binding.modifiers ?? {}
  const value = binding.value

  if (!value) return

  const scrollSection = el.scrollHeight - el.clientHeight
  // eslint-disable-next-line
  const handler = (e: any) => {
    value(e, e.target.scrollTop / scrollSection)
    once && unbind(el)
  }

  el.addEventListener('scroll', handler, { passive: true })

  el._scroll = {
    handler
  }
}

const directive: VuiDirective = {
  inserted,
  unbind,
  install(Vue) {
    Vue.directive('vui-scroll', directive)
  }
}

export default directive
