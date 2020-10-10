import { ScrollVNodeDirective } from './interface'

function unbind(el: HTMLElement) {
  if (!el._top) return

  const { handler } = el._top

  el.removeEventListener('scroll', handler)
  delete el._top
}

function inserted(el: HTMLElement, binding: ScrollVNodeDirective) {
  const { once = false } = binding.modifiers ?? {}
  const value = binding.value

  if (!value) return

  const handler = () => {
    if (el.scrollTop <= 0) {
      value()
      once && unbind(el)
    }
  }

  el.addEventListener('scroll', handler, { passive: true })

  el._top = {
    handler
  }
}

export const top = {
  inserted,
  unbind
}
