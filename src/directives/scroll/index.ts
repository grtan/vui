import { ScrollVNodeDirective } from './interface'

export { top } from './top'
export { bottom } from './bottom'

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

export const scroll = {
  inserted,
  unbind
}
