import { ScrollVNodeDirective } from './interface'

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

export const bottom = {
  inserted,
  unbind
}
